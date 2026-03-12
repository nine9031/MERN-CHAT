require("dotenv").config();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const userSocketMap = {};

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // แก้ตรงนี้
    methods: ["GET", "POST"],
    credentials: true,
  },
});

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
