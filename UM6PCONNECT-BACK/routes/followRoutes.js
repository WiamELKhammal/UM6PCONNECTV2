// routes/followRoutes.js
const express = require("express");
const Follow = require("../models/Follow"); 
const router = express.Router();
const Notification = require("../models/Notification"); 

// Follow user route
router.post("/follow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Check if already following
    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following" });
    }

    // Create new follow entry
    const newFollow = new Follow({ follower: followerId, following: followingId });
    await newFollow.save();

    // Create a notification for the followed user
    const notification = new Notification({
      recipientId: followingId,
      senderId: followerId,
      type: "follow",
      message: `${followerId} followed you`, // Optional message
    });

    console.log("Notification to be saved:", notification); // Log to check if the notification is created

    await notification.save(); // Save notification to the DB

    res.json({
      message: "User followed successfully",
      follow: newFollow,
      notification,
    });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Error following user", error });
  }
});


// Unfollow a user
// Unfollow a user
router.post("/unfollow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
      return res.status(400).json({ message: "Missing followerId or followingId" });
    }

    // Remove the follow entry
    const deletedFollow = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
    if (!deletedFollow) {
      return res.status(404).json({ message: "Follow entry not found" });
    }

    // Remove the notification for this follow (if it exists)
    const deletedNotification = await Notification.findOneAndDelete({
      recipientId: followingId,
      senderId: followerId,
      type: "follow",
    });

    if (!deletedNotification) {
      console.log("No notification found to delete");
    } else {
      console.log("Notification deleted:", deletedNotification);
    }

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});


// Get all users followed by a specific user
router.get("/following/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const following = await Follow.find({ follower: userId }).populate("following", "Prenom Nom email profilePicture headline tags bio Departement tags");
    res.json(following);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving followed users", error });
  }
});

// Get all users who are following a specific user
router.get("/followers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const followers = await Follow.find({ following: userId }).populate("follower", "Prenom Nom email profilePicture headline tags bio Departement tags");
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving followers", error });
  }
});

module.exports = router;