const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: "" },
    age: { type: Number, min: 0 },
    sex: { type: String, enum: ["male", "female", "other", ""], default: "" },
    heightCm: { type: Number, min: 0 },
    weightKg: { type: Number, min: 0 },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "athlete", ""],
      default: "",
    },
    goals: {
      primary: {
        type: String,
        enum: ["fat_loss", "muscle_gain", "recomposition", "endurance", "strength", ""],
        default: "",
      },
      targetWeightKg: { type: Number, min: 0 },
      weeklyWorkouts: { type: Number, min: 0, max: 14 },
      notes: { type: String, default: "" },
    },
    preferences: {
      equipment: { type: [String], default: [] },
      dietary: { type: [String], default: [] },
      injuries: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);

