const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");
const sendResetEmail = require("../utils/sendResetEmail");

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendResetEmail(user.Email, user.Prenom || user.Nom, resetLink);

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Reset link error:", err);
    res.status(500).json({ error: "Server error sending reset link" });
  }
});

module.exports = router;
