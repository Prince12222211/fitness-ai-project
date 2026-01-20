const express = require("express");
const ChatSession = require("../models/ChatSession");

const router = express.Router();

// GET /api/sessions/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const session = await ChatSession.findOne({ userId }).lean();
  res.json(session || { userId, messages: [] });
});

// DELETE /api/sessions/:userId
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  await ChatSession.deleteOne({ userId });
  res.json({ ok: true });
});

module.exports = router;

