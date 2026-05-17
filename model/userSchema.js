const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "moderator"],
    },
  },
  { timestamps: true },
);


userSchema.pre('save', async function() {
  // Only hash if the password has been modified or is new
  if (!this.isModified('password')) return ;

  try {
    // Standard cost factor is 10-12 rounds
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
  } catch (err) {
  console.log(err)
  res.status(500).send({message:"Server Error"})
  }
});

userSchema.methods.comparePassword = async function(plainpass) {
  console.log(plainpass, this.password);
  
  return  bcrypt.compare(plainpass, this.password);
};

module.exports = mongoose.model("user", userSchema)