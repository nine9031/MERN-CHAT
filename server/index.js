const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");

const { app, server } = require("./lib/socket");

dotenv.config();

const userRouter = require("./routers/user.router");
const messageRouter = require("./routers/message.router");

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB);

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
