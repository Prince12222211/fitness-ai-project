const express = require("express");
const UserProfile = require("../models/UserProfile");

const router = express.Router();

// GET /api/profile/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const profile = await UserProfile.findOne({ userId }).lean();
  res.json(profile || { userId });
});

// PUT /api/profile/:userId
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const update = req.body || {};

  const profile = await UserProfile.findOneAndUpdate(
    { userId },
    { $set: { ...update, userId } },
    { new: true, upsert: true }
  );

  res.json(profile);
});

module.exports = router;

