const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const e = require("express");
require("dotenv").config();
const secret = process.env.SECRET;
const node_mode = process.env.node_mode;
const cloudinary = require("../configs/cloudinary");

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).send({
      message: "Please Provide All Required!",
    });
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      message: "This Email is already existed!",
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    //Auto login after registration
    jwt.sign(
      { email, id: user._id },
      secret,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Internal Server Error: Authentication failed!" });
        }
        res.cookie("jwt", token, {
          maxAge: 24 * 60 * 60 * 1000, //MS
          httpOnly: true, //XSS Attacks
          sameSite: "strict", //CSRF attacks
          secure: node_mode !== "development",
        });
        res.status(201).send({
          message: "User registered and logged in successfully!",
          id: user._id,
          email,
          accessToken: token,
        });
      },
    );
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while registering a new user!",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please Provide Email and Password!",
    });
  }
  try {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
      return res.status(404).send({ message: "User not found!" });
    }
    const isPasswordMatched = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid Credentails" });
    }
    //Login Successfully
    jwt.sign(
      { email, id: userDoc._id },
      secret,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Internal Server Error: Authentication failed!" });
        }
        res.cookie("jwt", token, {
          maxAge: 24 * 60 * 60 * 1000, //MS
          httpOnly: true,
          sameSite: "strict", //CSRF attacks
          secure: node_mode !== "development",
        });
        //token generation
        res.send({
          message: "User logged in Successfully!",
          id: userDoc._id,
          email,
          accessToken: token,
        });
      },
    );
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while logging in user!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // ลบ cookie
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "Logged Out Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while logging out" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, profilePic } = req.body;
    console.log(fullname, profilePic);
    // ใช้ req.user._id (ที่ได้มาจาก protectedRoute)
    const userId = req.user._id;

    // 1. สร้าง Object สำหรับเก็บข้อมูลที่ต้องการจะอัปเดต
    const updateData = {};

    // 2. ถ้ามีการส่งชื่อ (fullname) มา ให้เพิ่มลงใน Object
    if (fullname) {
      updateData.fullname = fullname;
    }

    // 3. ถ้ามีการส่งรูป (profilePic) มา ให้อัปโหลดขึ้น Cloudinary ก่อน
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);

      if (!uploadResponse) {
        // ต้องมี return เพื่อหยุดการทำงานทันที หากเกิด Error
        return res
          .status(500)
          .json({ message: "Error while uploading profile picture" });
      }

      // เอา URL ของรูปที่อัปโหลดเสร็จแล้ว ใส่ลงใน Object
      updateData.profilePic = uploadResponse.secure_url;
    }

    // 4. เช็คว่ามีข้อมูลอะไรให้บันทึกไหม (ถ้า Object ว่างเปล่าแสดงว่าไม่ได้ส่งอะไรมาเลย)
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ message: "Nothing is updated" });
    }

    // 5. บันทึกข้อมูลลง Database ในคำสั่งเดียว!
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }, // ให้ return ข้อมูลใหม่ที่อัปเดตแล้วกลับมา
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ message: "Error while updating user profile" });
    }

    // 6. ส่ง Response กลับไปพร้อมข้อมูลใหม่ เผื่อ Frontend เอาไปใช้อัปเดตหน้าจอทันที
    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error: ", error); // พิมพ์ Error ออกมาดูด้วยเผื่อแก้บั๊ก
    return res
      .status(500)
      .json({ message: "Internal Server Error while updating user profile" });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while updating user profile" });
  }
};
