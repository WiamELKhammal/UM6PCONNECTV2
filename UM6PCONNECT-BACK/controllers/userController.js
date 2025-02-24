const { User } = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { generateTempPassword, sendEmail } = require('../utils/email');

// Function to find all pending users
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ Status: 'Pending', emailsent: false });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ error: 'Error fetching pending users' });
  }
};

// Function to send a welcome email with a temporary password
exports.sendWelcomeEmail = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate a temporary password
    const tempPassword = generateTempPassword();
    
    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    user.password = hashedPassword; // Update user's password

    // Send the email
    await sendEmail(user.email, user.fullname, tempPassword, user.role);

    // Update user status and mark email as sent
    user.Status = 'Active';
    user.emailsent = true;
    await user.save();

    res.status(200).json({ message: `Welcome email sent to ${user.email}` });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res.status(500).json({ message: "Error sending welcome email" });
  }
};

// Function to update user information (for profile completion)
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { fullname, email, telephone, role } = req.body;

  try {
    // Find and update the user
    const user = await User.findByIdAndUpdate(userId, {
      fullname,
      email,
      telephone,
      role
    }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Function to handle user login (if needed)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
