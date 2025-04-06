const express = require("express");
const router = express.Router();
const Research = require("../models/Research");
const User = require("../models/User");
const Follow = require("../models/Follow");

// Function to check badge eligibility
const checkBadgeEligibility = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const [followers, following, researchCount] = await Promise.all([
    Follow.countDocuments({ following: userId }),
    Follow.countDocuments({ follower: userId }),
    Research.countDocuments({ userId }),
  ]);

  const isCompleteProfile =
    user.Prenom &&
    user.Nom &&
    user.headline &&
    user.profilePicture &&
    user.coverPicture &&
    user.Departement &&
    user.linkedIn &&
    user.researchGate;

  const badgeEligible =
    followers >= 10 && following >= 10 && isCompleteProfile && researchCount >= 10;

  if (user.badged !== badgeEligible) {
    user.badged = badgeEligible;
    await user.save();
  }
};

// Create a research entry
router.post("/", async (req, res) => {
  try {
    const research = new Research(req.body);
    const saved = await research.save();

    // Check badge after creating research
    if (saved.userId) {
      await checkBadgeEligibility(saved.userId);
    }

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving research:", error);
    res.status(500).json({ message: "Failed to save research", error });
  }
});

// Get all research for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const research = await Research.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(research);
  } catch (err) {
    console.error("Failed to fetch research:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
