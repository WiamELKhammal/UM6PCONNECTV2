const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Assure-toi que le modèle User est bien importé

const router = express.Router();

// SignIn Route
router.post("/", async (req, res) => {
    console.log("Sign-in request received"); // Debug log
    const { email, password } = req.body;
  
    try {
      console.log(`Looking for user with email: ${email}`); // Debug log
  
      const user = await User.findOne({ Email: email }); // Use `Email` instead of `email` if the field name differs
  
      if (!user) {
        console.log("User not found in the database."); // Debug log
        return res.status(400).json({ error: "User not found" });
      }
  
      console.log("User found:", user._id); // Debug log
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log("Invalid credentials provided."); // Debug log
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      console.log("Credentials valid. Generating token."); // Debug log
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Sign-in successful", token, user });
    } catch (error) {
      console.error("Error during sign-in:", error); // Debug log
      res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;
