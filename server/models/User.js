const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// กำหนด attribute
const UserSchema = new Schema(
  {
    fullname: { type: String, required: true, minlength: 4 }, // แก้เป็น required และ minlength
    email: { type: String, required: true, unique: true }, // แก้เป็น required
    password: { type: String, required: true, minlength: 6 }, // แก้เป็น required และ minlength
    profilePic: { type: String, default: "" }, // แก้เป็น required
  },
  { timestamps: true },
);

// model
const UserModel = model("User", UserSchema);
module.exports = UserModel;
