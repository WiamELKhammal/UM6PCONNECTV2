const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { otpToken, otpInput } = req.body;

  try {
    const decoded = jwt.verify(otpToken, JWT_SECRET);
    if (decoded.otp !== otpInput) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = await User.findOne({ Email: decoded.email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.verified = true;
    await user.save();

    res.json({
      message: "Email verified successfully",
      user,
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(400).json({ error: "OTP expired or invalid" });
  }
});

module.exports = router;
