const express = require("express");
const {
  registration,
  verifyOtp,
  resendOtp,
  login,
  getProfile,
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/registration", registration);
router.post("/verify-email", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.get("/getprofile", authMiddleware, getProfile);

module.exports = router;
