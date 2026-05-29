const bcrypt = require("bcrypt");

const otpEmailTemplate = require("../helpers/emailTemplets");
const { mailsender } = require("../helpers/mailSender");
const {
  generateOTP,
  generateAccessTokens,
  generateRefreshTokens,
  uploadToCloudinary,
} = require("../helpers/utils");
const userSchema = require("../model/userSchema");

const registration = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName)
      return res.status(400).send({ message: "fullName is required" });
    if (!email) return res.status(400).send({ message: "email is required" });
    if (!password)
      return res.status(400).send({ message: "password is required" });
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Your Email already exist" });
    const otp = generateOTP();
    const userData = await userSchema.create({
      fullName,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    mailsender({
      email,
      subject: "Verify your otp",
      template: otpEmailTemplate(otp, fullName),
    });
    res.status(200).send({ message: "Registration Successfull." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!otp) return res.status(400).send({ message: "otp did not match" });
    if (!email)
      return res.status(400).send({ message: "email does not match" });
    const userData = await userSchema.findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
        isVerified: false,
      },
      { $set: { isVerified: true, otp: null, otpExpiry: null } },
      { returnDocument: "after" },
    );
    if (!userData)
      return res.status(400).send({ message: "userData not found" });

    res.status(200).send({ message: "otp successfully verified" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await userSchema.findOne({
      email,
      isVerified: false,
    });
    if (!userData) return res.status(400).send({ message: "invalid requist" });
    const otp = generateOTP();
    userData.otp = otp;
    userData.otpExpiry = Date.now() + 5 * 60 * 1000;
    await userData.save();
    mailsender({
      email,
      subject: "verify your otp",
      template: otpEmailTemplate(otp),
    });
    res.status(200).send({ message: "new otp sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const cookie_config = {
  httpOnly: false,
  secure: false,
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).send({ message: "email is required" });
    if (!password)
      return res.status(400).send({ message: "password is required" });
    const userData = await userSchema.findOne({ email }).select("+password");
    if (!userData)
      return res.status(400).send({ message: "userData not found" });
    if (userData.isVerified == false)
      return res.status(400).send({ message: "Email is not verified" });

    const matchPassword = await userData.comparePassword(password);
    if (!matchPassword)
      return res.status(400).send({ message: "password does not match" });

    const accToken = generateAccessTokens(userData);
    const refToken = generateRefreshTokens(userData);
    res
      .status(200)
      .cookie("acc_tkn", accToken, cookie_config)
      .cookie("ref_tkn", refToken, cookie_config)
      .send({ message: "Login Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profileData = await userSchema.findOne(
      { _id: req.user._id },
      { fullName: 1, email: 1, role: 1, avatar: 1, address: 1 },
    );
    if (!profileData)
      return res.status(400).send({ message: "profileData not found" });
    res.status(200).send(profileData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Internal server Error" });
  }
};

const updateProfile = async (req, res) => {
  const { fullName, address } = req.body;
  const avatar = req.file;
  try {
    const userData = await userSchema.findOne({ _id: user.req._id });
    if (!userData)
      return res.status(400).send({ message: "userData is not found" });
    if (fullName && fullName.trim()) userData.fullName = fullName;
    if (address && address.trim()) userData.address = address;
    if (avatar) {
      try {
        const avatarUrl = await uploadToCloudinary;
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: "INternal Server Error" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  registration,
  verifyOtp,
  resendOtp,
  login,
  getProfile,
  updateProfile,
};
