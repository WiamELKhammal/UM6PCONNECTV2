const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update profile picture
router.post("/update-profile-picture/:userId", async (req, res) => {
  const { profilePicture } = req.body;
  const { userId } = req.params; // Get userId from URL parameters

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the profile picture
    user.profilePicture = profilePicture;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Profile picture updated successfully", profilePicture: user.profilePicture });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update-cover-picture/:userId", async (req, res) => {
    const { coverPicture } = req.body;
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.coverPicture = coverPicture;
      await user.save();
  
      res.status(200).json({ message: "Cover picture updated successfully", coverPicture: user.coverPicture });
    } catch (error) {
      console.error("Error updating cover picture:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
