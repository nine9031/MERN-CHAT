const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

dotenv.config();

const userRouter = require("./routers/user.router");
const app = express();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const MONGODB = process.env.MONGODB;

app.get("/", (req, res) => {
  res.send("Welcome to MERN CHAT SERVER 110");
});
app.use(
  cors({
    origin: [BASE_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

if (!MONGODB) {
  console.error("NO MONGODB URL FOUND IN .env");
} else {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
