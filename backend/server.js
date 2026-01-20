const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDb } = require("./config/db");

const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workouts");
const chatRoutes = require("./routes/chat");
const sessionRoutes = require("./routes/sessions");
const WorkoutLog = require("./models/WorkoutLog");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Backwards compatible endpoints (old UI uses /api/logs)
app.use("/api/workouts", workoutRoutes);
app.post("/api/logs", async (req, res) => {
  const log = new WorkoutLog(req.body);
  await log.save();
  res.json(log);
});
app.get("/api/logs", async (req, res) => {
  const logs = await WorkoutLog.find().sort({ date: 1 }).limit(7).lean();
  res.json(logs);
});


app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend Live on ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });