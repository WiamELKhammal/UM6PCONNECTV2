const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { generateTempPassword } = require('../services/emailService'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Function to send emails to users with emailsent: false
const sendPasswordsToUnsentUsers = async () => {
  try {
    // Fetch only users with emailsent: false
    const unsentUsers = await User.find({ emailsent: false });

    // Log the users to check if the query is working correctly
    console.log("Users with emailsent=false:", unsentUsers.map(u => ({ _id: u._id, Email: u.Email, emailsent: u.emailsent })));

    // Proceed with sending emails to the users
    for (const user of unsentUsers) {
      console.log(`Processing user: ${user.Email}, emailsent: ${user.emailsent}`);

      // Skip users who already have emailsent: true (just in case)
      if (user.emailsent) {
        console.warn(`Skipping user ${user.Email} because emailsent is already true.`);
        continue;
      }

      // Generate temporary password and hash it
      const tempPassword = generateTempPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const fullname = `${user.Prenom} ${user.Nom}`;

      try {
        // Send email to the user
        await sendEmail(user.Email, fullname, tempPassword, user.role);

        // Update the user's record in the database
        await User.updateOne(
          { _id: user._id },
          { $set: { hashedTemporaryPass: hashedPassword, emailsent: true } }
        );

        console.log(`Email sent successfully to ${user.Email} and emailsent flag updated`);
      } catch (emailError) {
        console.error(`Error sending email to ${user.Email}:`, emailError.message);
      }
    }

    console.log("Processing of users with emailsent=false completed.");
  } catch (error) {
    console.error("Error processing users:", error.message);
  }
};

// Export the function
module.exports = {
  sendPasswordsToUnsentUsers,
};

