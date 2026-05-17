const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

module.exports = { generateOTP,generateRefreshTokens,generateAccessTokens, isValidEmail };
