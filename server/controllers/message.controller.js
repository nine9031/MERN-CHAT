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
    res.status(500).json({
      message: "Error while getting users",
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;

    const messages = await MessageModel.find({
      $or: [
        { senderId: myId, recipientId: userToChat },
        { senderId: userToChat, recipientId: myId },
      ],
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error while getting messages",
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { id: recipientId } = req.params;

    if (!recipientId) {
      return res.status(400).json({ message: "Recipient Id missing" });
    }

    const senderId = req.user._id;
    const { text, file } = req.body;

    let fileUrl = "";

    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }

    const newMessage = new MessageModel({
      senderId,
      recipientId,
      text,
      file: fileUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(recipientId.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: "Error while sending message",
    });
  }
};
