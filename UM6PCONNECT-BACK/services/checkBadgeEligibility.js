const User = require("../models/User");
const Experience = require("../models/Experience");
const Research = require("../models/Research");
const getUserProfile = require("./getUserProfile");

const checkBadgeEligibility = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return false;

    // Check profile completion
    const { completionPercentage } = await getUserProfile(userId);
    const profileComplete = parseFloat(completionPercentage) >= 100;

    // Check follow stats
    const hasEnoughFollowers = user.followersCount >= 10;
    const hasEnoughFollowing = user.followingCount >= 10;

    // Check research count
    const researchCount = await Research.countDocuments({ userId });
    const hasEnoughResearch = researchCount >= 10;

    const shouldBadge = profileComplete && hasEnoughFollowers && hasEnoughFollowing && hasEnoughResearch;

    if (shouldBadge && !user.badged) {
      user.badged = true;
      await user.save();
    }

    return shouldBadge;
  } catch (err) {
    console.error("Error checking badge eligibility:", err);
    return false;
  }
};

module.exports = checkBadgeEligibility;
