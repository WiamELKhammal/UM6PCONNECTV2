// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import the service to fetch the user profile
const getUserProfile = require('../services/getUserProfile');

router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const profileData = await getUserProfile(userId);
      
      if (profileData) {
        // Include missingFields in the response
        res.json({
          profile: profileData.user,
          completionPercentage: profileData.completionPercentage,
          missingFields: profileData.missingFields || [], // Add missingFields to the response
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
