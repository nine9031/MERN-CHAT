const MessageModel = require("../models/Message");
const User = require("../models/User");
const cloudinary = require("../configs/cloudinary");

const { getReceiverSocketId, io } = require("../lib/socket");

exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while getting users info" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;
    const messages = await MessageModel.find({
      $or: [
        {
          senderId: myId,
          recipientId: userToChat,
        },
        {
          senderId: userToChat,
          recipientId: myId,
        },
      ],
    });
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while getting message" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { id: recipientId } = req.params;
    if (!recipientId) {
      return res.status(400).jsn({ message: "Reciient Id is missing" });
    }
    const senderId = req.user._id;
    const { text, file } = req.body;
    let fileUrl = "";
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }
    const newMessage = await new MessageModel({
      senderId,
      recipientId,
      text,
      file: fileUrl,
    });

    await newMessage.save();
    res.json({ message: newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while sending message" });
  }
};
