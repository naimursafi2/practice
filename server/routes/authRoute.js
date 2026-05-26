const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  registration,
  verifyOtp,
  resendOtp,
  login,
  getProfile,
  updateProfile,
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/registration", registration);
router.post("/verify-email", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.get("/getprofile", authMiddleware, getProfile);
router.put(
  "/updateprofile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile,
);

module.exports = router;
