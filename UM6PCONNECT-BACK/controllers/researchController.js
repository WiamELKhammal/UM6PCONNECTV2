const Research = require("../models/Research");
const User = require("../models/User");
const Follow = require("../models/Follow");

const checkBadgeEligibility = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const [followers, following, researchCount] = await Promise.all([
    Follow.countDocuments({ following: userId }),
    Follow.countDocuments({ follower: userId }),
    Research.countDocuments({ userId }),
  ]);

  const isCompleteProfile = user.Prenom && user.Nom && user.headline && user.profilePicture && user.coverPicture && user.Departement && user.linkedIn && user.researchGate;

  const badgeEligible = followers >= 10 && following >= 10 && isCompleteProfile && researchCount >= 10;

  if (user.badged !== badgeEligible) {
    user.badged = badgeEligible;
    await user.save();
  }
};

exports.createResearch = async (req, res) => {
  try {
    const research = new Research({ ...req.body, userId: req.user.userId });
    const saved = await research.save();
    await checkBadgeEligibility(req.user.userId);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to save research" });
  }
};

exports.getUserResearch = async (req, res) => {
  try {
    const research = await Research.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateResearch = async (req, res) => {
  try {
    const updated = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResearch = async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ message: "Research deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
