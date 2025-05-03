const User = require("../models/User");

exports.updateProfilePicture = async (req, res) => {
  const { profilePicture } = req.body;
  const userId = req.userId; // ✅ NOT req.user.userId

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = profilePicture;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCoverPicture = async (req, res) => {
  const { coverPicture } = req.body;
  const userId = req.userId; // ✅ NOT req.user.userId

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.coverPicture = coverPicture;
    await user.save();

    res.status(200).json({
      message: "Cover picture updated successfully",
      coverPicture: user.coverPicture,
    });
  } catch (error) {
    console.error("Error updating cover picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};
