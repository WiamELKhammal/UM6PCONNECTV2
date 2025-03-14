const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User");
const router = express.Router();

// Filter endpoint to handle user filtering
router.post('/filter', async (req, res) => {
    const {
      location,
      telephone,
      email,
      bio,
      headline,
      address,
      url,
      languages,
      educations,
      experiences,
    } = req.body;
  
    try {
      const filterConditions = {};
  
      // Filter by location
      if (location) {
        filterConditions.location = { $regex: location, $options: 'i' }; // Case-insensitive match
      }
  
      // Filter by telephone
      if (telephone) {
        filterConditions.telephone = { $regex: telephone, $options: 'i' };
      }
  
      // Filter by email
      if (email) {
        filterConditions.email = { $regex: email, $options: 'i' };
      }
  
      // Filter by bio
      if (bio) {
        filterConditions.bio = { $regex: bio, $options: 'i' };
      }
  
      // Filter by headline
      if (headline) {
        filterConditions.headline = { $regex: headline, $options: 'i' };
      }
  
      // Filter by address
      if (address) {
        filterConditions.address = { $regex: address, $options: 'i' };
      }
  
      // Filter by url
      if (url) {
        filterConditions.url = { $regex: url, $options: 'i' };
      }
  
      // Filter by languages
      if (languages && languages.length > 0) {
        filterConditions.languages = { $in: languages }; // Assuming languages are ObjectIds
      }
  
      // Filter by educations
      if (educations && educations.length > 0) {
        filterConditions.educations = { $in: educations };
      }
  
      // Filter by experiences
      if (experiences && experiences.length > 0) {
        filterConditions.experiences = { $in: experiences };
      }
  
      // Query the database with the filter conditions
      const users = await User.find(filterConditions).populate('languages educations experiences');
  
      // Return the filtered users
      res.status(200).json(users);
    } catch (error) {
      console.error("Error applying filters: ", error);
      res.status(500).json({ message: 'Error applying filters', error });
    }
  });
  
module.exports = router;
