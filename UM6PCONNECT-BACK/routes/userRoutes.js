const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

// Get all users (for testing or admin purposes)

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find({ Status: "Active" }); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Send welcome email to a user
router.post('/:id/send-welcome-email', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await sendWelcomeEmail(user._id, user.role);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});
// Update user badge status to true
router.put('/:id/badge', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.badged) {
      user.badged = true;
      await user.save();
    }

    res.status(200).json({ message: 'Badge status updated', badged: user.badged });
  } catch (error) {
    console.error('Error updating badge status:', error);
    res.status(500).json({ error: 'Failed to update badge status' });
  }
});

module.exports = router;