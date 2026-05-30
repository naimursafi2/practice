const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinaryConfig");

function generateOTP() {
  // Generates a random integer between 100,000 and 999,999
  return crypto.randomInt(1000, 10000).toString();
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

function generateAccessTokens(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWT_SEC,
    {
      expiresIn: "1h",
    },
  );
}
function generateRefreshTokens(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWT_SEC,
    {
      expiresIn: "15d",
    },
  );
}

const uploadToCloudinary = async ({ mimetype, imgBuffer }) => {
  console.log(mimetype);
  console.log(imgBuffer);

  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUrl);
  return res.secure_url;
};

module.exports = {
  generateOTP,
  generateRefreshTokens,
  generateAccessTokens,
  isValidEmail,
  uploadToCloudinary,
};
