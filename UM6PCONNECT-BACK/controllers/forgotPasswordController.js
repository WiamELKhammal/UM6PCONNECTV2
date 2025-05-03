const crypto = require("crypto");
const User = require("../models/User");
const sendResetEmail = require("../utils/sendResetEmail");

const isValidUM6PEmail = (email) => {
  const um6pRegex = /^[a-zA-Z0-9._%+-]+@um6p\.ma$/i;
  return um6pRegex.test(email);
};

exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !isValidUM6PEmail(email)) {
      return res.status(400).json({ error: "Invalid UM6P email address" });
    }

    const user = await User.findOne({ Email: email });

    // Avoid leaking user existence
    if (!user) {
      return res.json({ message: "If an account exists, a reset link was sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendResetEmail(user.Email, user.Prenom || user.Nom, resetLink);

    res.json({ message: "If an account exists, a reset link was sent." });
  } catch (err) {
    console.error("Reset link error:", err);
    res.status(500).json({ error: "Server error sending reset link" });
  }
};
