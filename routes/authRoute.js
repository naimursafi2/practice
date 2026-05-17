const express = require("express");
const { registration, verifyOtp, resendOtp, login } = require("../controller/authController");
const router = express.Router();


router.post("/registration", registration);
router.post("/verify-email", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);

module.exports = router;
