const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const getUserProfile = require('../services/getUserProfile');
const verifyToken = require('../middleware/verifyToken'); // à créer si pas encore

router.get('/profile/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const profileData = await getUserProfile(userId);

    if (profileData) {
      res.json({
        profile: profileData.user,
        completionPercentage: profileData.completionPercentage,
        missingFields: profileData.missingFields || [],
      });
    } else {
      res.status(404).json({ message: 'User profile not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
