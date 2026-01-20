const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const UserProfile = require("../models/UserProfile");
const WorkoutLog = require("../models/WorkoutLog");
const ChatSession = require("../models/ChatSession");

const router = express.Router();

function buildSystemPrompt({ profile, recentWorkouts }) {
  const p = profile || {};
  const workouts = (recentWorkouts || []).slice(-10).map((w) => ({
    date: w.date,
    workoutType: w.workoutType,
    durationMin: w.durationMin || w.duration,
    caloriesBurned: w.caloriesBurned,
    weightKg: w.weightKg,
    notes: w.notes,
  }));

  return `
You are a professional personal trainer and nutrition coach.
Your job: give actionable, safe, personalized advice and plans.

User profile (may be partial):
${JSON.stringify(p, null, 2)}

Recent workout logs:
${JSON.stringify(workouts, null, 2)}

Rules:
- Ask 1-2 clarifying questions if needed.
- Provide concise, structured plans (Workout + Nutrition + Recovery).
- Include safety notes if injuries/medical concerns are possible.
- Avoid medical diagnosis; suggest consulting a professional when appropriate.
`.trim();
}

router.post("/", async (req, res) => {
  const { userId = "demo", prompt, message } = req.body || {};
  const text = (prompt || message || "").trim();
  if (!text) return res.status(400).json({ error: "prompt is required" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not set in environment variables",
      details: "Please add GEMINI_API_KEY to your .env file"
    });
  }

  // Check for placeholder values
  const placeholderPatterns = ["your_google_gem", "your_api_key", "replace_me", "api_key_here"];
  if (placeholderPatterns.some(pattern => apiKey.toLowerCase().includes(pattern))) {
    return res.status(500).json({
      error: "Invalid GEMINI_API_KEY detected",
      details: "The API key appears to be a placeholder. Please set a valid Google Gemini API key in your .env file. Get one at: https://makersuite.google.com/app/apikey"
    });
  }

  try {
    const [profile, recentWorkouts] = await Promise.all([
      UserProfile.findOne({ userId }).lean(),
      WorkoutLog.find({ userId }).sort({ date: -1 }).limit(10).lean(),
    ]);

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.0-flash which is available and fast
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const systemPrompt = buildSystemPrompt({ profile, recentWorkouts });
    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${text}`);
    const response = await result.response;
    const aiText = response.text();

    await ChatSession.findOneAndUpdate(
      { userId },
      { $push: { messages: { $each: [{ role: "user", text }, { role: "ai", text: aiText }] } } },
      { upsert: true, new: true }
    );

    res.json({ text: aiText });
  } catch (error) {
    const errorMessage = error.message || "Unknown error";
    const errorStatus = error.status || error.statusCode;

    // Log errors only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Gemini API Error:", errorMessage);
    }

    // Handle specific error types
    if (errorStatus === 429 || errorMessage.toLowerCase().includes("quota")) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "API quota limit reached. Please try again later."
      });
    }

    if (errorStatus === 401 || errorStatus === 403 || errorMessage.includes("API_KEY_INVALID")) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid API key. Please check your configuration."
      });
    }

    res.status(500).json({
      error: "Service unavailable",
      message: "Unable to process request. Please try again later."
    });
  }
});

module.exports = router;