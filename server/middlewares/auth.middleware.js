const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectedRoute = async (req, res, next) => {
  try {
    // take token from cookie
    const token = req.cookies.jwt;

    // user can't login
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token provide" });
    }

    // ตรวจ token ว่าเราเป็นคนออกให้ไหม
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // คนคนนั้นมีตัวตนอยู่ใน database ไหม อยู่เก่าเราไม่ให้ใช้
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      // 404 หาไม่เจอ
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while checking token" });
  }
};

module.exports = { protectedRoute };
