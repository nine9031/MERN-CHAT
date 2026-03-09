const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = Schema(
  {
    text: { type: String },
    file: { type: String },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// model
const MessageModel = model("Message", messageSchema);
module.exports = MessageModel;
