const e = require("express");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullname: { type: String, required: true, min: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true },
);
const UserModel = model("User", userSchema);
module.exports = UserModel;
