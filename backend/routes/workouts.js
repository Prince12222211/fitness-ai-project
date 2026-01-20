const express = require("express");
const WorkoutLog = require("../models/WorkoutLog");

const router = express.Router();

// POST /api/workouts
router.post("/", async (req, res) => {
  const log = new WorkoutLog(req.body);
  await log.save();
  res.json(log);
});

// GET /api/workouts?userId=...&limit=...
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const limit = Math.min(Number(req.query.limit || 30), 365);
  const filter = userId ? { userId } : {};

  const logs = await WorkoutLog.find(filter).sort({ date: 1 }).limit(limit).lean();
  res.json(logs);
});

// GET /api/workouts/weekly?userId=...
router.get("/weekly", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId is required" });

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const logs = await WorkoutLog.find({ userId, date: { $gte: since } })
    .sort({ date: 1 })
    .lean();

  res.json(logs);
});

module.exports = router;

