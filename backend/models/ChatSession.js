const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "ai"], required: true },
    text: { type: String, required: true },
    ts: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    messages: { type: [chatMessageSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSession", chatSessionSchema);

