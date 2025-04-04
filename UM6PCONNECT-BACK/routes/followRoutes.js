const express = require("express");
const Follow = require("../models/Follow"); 
const Notification = require("../models/Notification"); 
const User = require("../models/User"); // <== To update counts
const router = express.Router();

// Follow user
router.post("/follow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Prevent self-follow
    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following" });
    }

    const newFollow = new Follow({ follower: followerId, following: followingId });
    await newFollow.save();

    const notification = new Notification({
      recipientId: followingId,
      senderId: followerId,
      type: "follow",
      message: `${followerId} followed you`,
    });

    await notification.save();

    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: 1 } });
    await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });

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


// Unfollow user
router.post("/unfollow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
      return res.status(400).json({ message: "Missing followerId or followingId" });
    }

    const deletedFollow = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
    if (!deletedFollow) {
      return res.status(404).json({ message: "Follow entry not found" });
    }

    await Notification.findOneAndDelete({
      recipientId: followingId,
      senderId: followerId,
      type: "follow",
    });

    // Decrement counts
    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: -1 } });
    await User.findByIdAndUpdate(followerId, { $inc: { followingCount: -1 } });

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});

// Get users followed by a specific user
router.get("/following/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await Follow.find({ follower: userId }).populate(
      "following",
      "Prenom Nom email profilePicture headline tags bio Departement tags followersCount"
    );
    res.json(following);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving followed users", error });
  }
});

// Get users who follow a specific user
router.get("/followers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await Follow.find({ following: userId }).populate(
      "follower",
      "Prenom Nom email profilePicture headline tags bio Departement tags followersCount"
    );
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving followers", error });
  }
});

// Optional: Get follow count for a user
router.get("/follow-count/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("followersCount followingCount");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user._id,
      followersCount: user.followersCount,
      followingCount: user.followingCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving follow count", error });
  }
});

module.exports = router;
