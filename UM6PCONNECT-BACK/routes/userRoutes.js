const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');
const verifyToken = require('../middleware/verifyToken');

// ✅ PUBLIC: Get all active users (only public + social fields)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ Status: "Active" }).select(
      "Prenom Nom profilePicture coverPicture headline Departement Status badged followersCount followingCount linkedIn researchGate"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ PUBLIC: Get a specific user (only public + social fields)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "Prenom Nom profilePicture coverPicture headline Departement Status badged followersCount followingCount linkedIn researchGate"
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ✅ SECURED: Update user by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// ✅ SECURED: Delete user by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ✅ SECURED: Send welcome email
router.post('/:id/send-welcome-email', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await sendWelcomeEmail(user._id, user.role);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// ✅ SECURED: Update user badge
router.put('/:id/badge', verifyToken, async (req, res) => {
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
