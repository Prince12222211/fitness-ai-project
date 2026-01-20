const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  date: { type: Date, default: Date.now },
  caloriesBurned: { type: Number, required: true },
  workoutType: { type: String, default: 'General' },
  durationMin: { type: Number }, // minutes
  weightKg: { type: Number },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);