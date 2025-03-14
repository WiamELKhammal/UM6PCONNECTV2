const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        console.log("Change Password API called");
        console.log("Received Request Body:", req.body);

        const { email, tempPassword, newPassword, confirmPassword } = req.body;

        if (!email || !tempPassword || !newPassword || !confirmPassword) {
            console.log("Missing fields in request");
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (newPassword !== confirmPassword) {
            console.log("New passwords do not match");
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const user = await User.findOne({ Email: email });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log("Stored hashed temp password:", user.hashedTemporaryPass);
        console.log("Entered temp password:", tempPassword);

        const isTempPasswordValid = await bcrypt.compare(tempPassword, user.hashedTemporaryPass);

        if (!isTempPasswordValid) {
            console.log("Invalid temporary password");
            return res.status(401).json({ message: 'Invalid temporary password.' });
        }

        // Hachage du nouveau mot de passe
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        user.hashedTemporaryPass = null;
        user.emailsent = true;
        user.Status = "Active"; 

        await user.save();
        console.log("Password changed successfully and account activated");

        res.status(200).json({ message: 'Password changed successfully. Account activated.' });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
