const express = require("express");
const router = express.Router();

const { protectedRoute } = require("../middlewares/auth.middleware");

const {
  register,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, checkAuth);

module.exports = router;
