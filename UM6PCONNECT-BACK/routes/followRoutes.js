const express = require("express");
const Follow = require("../models/Follow");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Research = require("../models/Research");
const router = express.Router();

// Badge checker
const checkBadgeEligibility = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const [followers, following, researchCount] = await Promise.all([
    Follow.countDocuments({ following: userId }),
    Follow.countDocuments({ follower: userId }),
    Research.countDocuments({ userId }),
  ]);

  const isCompleteProfile =
    user.Prenom && user.Nom && user.headline && user.profilePicture && user.coverPicture && user.Departement && user.linkedIn && user.researchGate;

  const badgeEligible =
    followers >= 10 && following >= 10 && isCompleteProfile && researchCount >= 10;

  if (user.badged !== badgeEligible) {
    user.badged = badgeEligible;
    await user.save();
  }
};

// Follow
router.post("/follow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existing = await Follow.findOne({ follower: followerId, following: followingId });
    if (existing) {
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

    await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: 1 } });

    await checkBadgeEligibility(followerId);
    await checkBadgeEligibility(followingId);

    res.json({ message: "Followed", follow: newFollow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Follow error" });
  }
});

// Unfollow
router.post("/unfollow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const deleted = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
    if (!deleted) return res.status(404).json({ message: "Follow not found" });

    await Notification.findOneAndDelete({
      senderId: followerId,
      recipientId: followingId,
      type: "follow",
    });

    await User.findByIdAndUpdate(followerId, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: -1 } });

    await checkBadgeEligibility(followerId);
    await checkBadgeEligibility(followingId);

    res.json({ message: "Unfollowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unfollow error" });
  }
});

// Get following
router.get("/following/:userId", async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.userId }).populate(
      "following",
      "Prenom Nom email profilePicture headline tags bio Departement followersCount"
    );
    res.json(following);
  } catch (err) {
    res.status(500).json({ message: "Failed to get following" });
  }
});

// Get followers
router.get("/followers/:userId", async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.userId }).populate(
      "follower",
      "Prenom Nom email profilePicture headline tags bio Departement followersCount"
    );
    res.json(followers);
  } catch (err) {
    res.status(500).json({ message: "Failed to get followers" });
  }
});

// Count
router.get("/follow-count/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("followersCount followingCount");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user._id,
      followersCount: user.followersCount,
      followingCount: user.followingCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Count fetch failed" });
  }
});

module.exports = router;
