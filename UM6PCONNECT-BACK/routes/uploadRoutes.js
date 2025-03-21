const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { email, image } = req.body;
    if (!email || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = image;
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
