// controllers/signupController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dns = require("dns");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
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
  tls: { rejectUnauthorized: false },
});

const generateOtpToken = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: "10m" });
  return { otp, token };
};

exports.handleSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { Prenom, Nom, Email, password } = req.body;

  try {
    const domain = Email.split("@")[1];
    dns.resolveMx(domain, async (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return res.status(400).json({ error: "Le domaine de l'email est invalide ou injoignable." });
      }

      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ error: "Email déjà enregistré." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        Prenom,
        Nom,
        Email,
        password: hashedPassword,
        verified: false,
      });

      await newUser.save();

      const { otp, token } = generateOtpToken(Email);
      console.log(`OTP for ${Email}: ${otp}`);

      await transporter.sendMail({
        from: `"UM6P CONNECT" <${EMAIL_USER}>`,
        to: Email,
        subject: "Vérifiez votre email - UM6P CONNECT",
        html: `<p>Votre code de vérification est : <strong>${otp}</strong></p>`,
      });

      res.json({
        message: "Inscription réussie. Email de vérification envoyé.",
        user: {
          _id: newUser._id,
          Email: newUser.Email,
          Prenom: newUser.Prenom,
          Nom: newUser.Nom,
        },
        otpToken: token,
      });
    });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
