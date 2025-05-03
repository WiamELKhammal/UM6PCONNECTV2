// controllers/uploadController.js
const User = require("../models/User");

exports.updateProfilePicture = async (req, res) => {
  try {
    const { image } = req.body;
    const userId = req.user.userId; // JWT token should have userId

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const user = await User.findById(userId);
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
};
