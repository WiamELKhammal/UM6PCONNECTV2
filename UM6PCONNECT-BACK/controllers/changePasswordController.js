const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.handleChangePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, tempPassword, newPassword } = req.body;

    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isTempPasswordValid = await bcrypt.compare(tempPassword, user.hashedTemporaryPass);
    if (!isTempPasswordValid) return res.status(401).json({ message: 'Invalid temporary password.' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.hashedTemporaryPass = null;
    user.emailsent = true;
    user.Status = 'Active';
    user.verified = true;

    await user.save();
    res.status(200).json({ message: 'Password changed successfully. Account activated.' });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: 'Server error.' });
  }
};
