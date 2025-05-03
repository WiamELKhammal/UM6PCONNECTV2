const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 🔐 Generate OTP Token
const generateOtpToken = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: "10m" });
  return { otp, token };
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const { otp, token } = generateOtpToken(email);

    console.log(`🔁 Resent OTP to ${email}: ${otp}`); // DEV ONLY

    await transporter.sendMail({
      from: `"UM6P CONNECT" <${EMAIL_USER}>`,
      to: email,
      subject: "Your new verification code - UM6P CONNECT",
      html: `<p>Your new verification code is: <strong>${otp}</strong></p>`,
    });

    res.json({ message: "New OTP sent", otpToken: token });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ error: "Server error while resending OTP." });
  }
};
