const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // must be false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // <- allows self-signed certs
    },
  });
// Generate OTP Token
const generateOtpToken = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: "10m" });
  return { otp, token };
};

// Signup Route
router.post("/", async (req, res) => {
  const { Prenom, Nom, Email, password } = req.body;

  try {
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      Prenom,
      Nom,
      Email,
      password: hashedPassword,
      verified: false, // for OTP verification
    });

    await newUser.save();

    // Generate OTP and token
    const { otp, token } = generateOtpToken(Email);
    console.log(`OTP for ${Email}: ${otp}`); // Only for dev

    // Send email
    await transporter.sendMail({
      from: `"UM6P CONNECT" <${EMAIL_USER}>`,
      to: Email,
      subject: "Verify your email - UM6P CONNECT",
      html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
    });

    res.json({
      message: "Signup successful. Verification email sent.",
      user: {
        _id: newUser._id,
        Email: newUser.Email,
        Prenom: newUser.Prenom,
        Nom: newUser.Nom,
      },
      otpToken: token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

module.exports = router;
