const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Function to generate a temporary password
const generateTempPassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  let tempPassword = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tempPassword += characters[randomIndex];
  }
  return tempPassword;
};

// Function to send an email
const sendEmail = async (to, fullname, tempPassword, userRole) => {
  const loginURL =
    userRole === "postdoc"
      ? "https://yourapp.com/postdoc/login"
      : "https://yourapp.com/professeur/login";

  const emailHTML = `
    <html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 8px;">
      <h3 style="font-size: 18px; font-weight: bold; color: #333;">Please Complete Your Profile!</h3>
      <p style="font-size: 16px;">Hello ${fullname},</p>
      <p style="font-size: 16px;">We are excited to welcome you to UM6P Connect! Please complete your profile to get started.</p>
      <p style="font-size: 16px;">Here’s what’s missing from your profile at the moment:</p>
      <ul style="font-size: 16px">
        <li>Tag Line</li>
        <li>Bio</li>
        <li>Location</li>
        <li>Phone Number</li>
        <li>Work Experience</li>
        <li>Education</li>
        <li>Skills</li>
      </ul>
    </div>

    <!-- Centered Table with email and temporary password -->
    <div style="display: flex; justify-content: center; margin-top: 20px;">
      <table style="width: 80%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 10px; border: 1px solid #ddd; font-size: 16px; background-color: #e73d18; color: #fff;">Email</th>
            <th style="text-align: left; padding: 10px; border: 1px solid #ddd; font-size: 16px; background-color: #e73d18; color: #fff;">Temporary Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #000;">${to}</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #000;">${tempPassword}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="font-size: 16px; margin-top: 20px; text-align: center;">Please log in to complete your profile and update your password.</p>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="${loginURL}" style="display: inline-block; padding: 12px 25px; background-color: #e73d18; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px; text-align: center;">Go to Profile</a>
    </div>
    
    <p style="font-size: 16px; margin-top: 20px";padding: 20px;>Best Regards,</p>
    <p style="font-size: 16px">UM6P Connect.</p>

    <footer style="text-align: center; margin-top: 30px;">
      <p style="font-size: 12px; color: #aaa;">UM6P Connect Team</p>
      <p style="font-size: 12px; color: #aaa;">&copy; 2025 UM6P Connect, All Rights Reserved.</p>
    </footer>
  </body>
</html>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 60000,
    socketTimeout: 60000,
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "UM6P Connect - Complete your profile",
      html: emailHTML,
    });
    console.log(`Email sent successfully to ${to}: ${info.response}`);
  } catch (error) {
    console.error(`Email sending error to ${to}:`, error.message);
  }
};

// Function to send emails to users with emailsent: false
const sendPasswordsToUnsentUsers = async () => {
  try {
    // Fetch only users with emailsent: false
    const unsentUsers = await User.find({ emailsent: false });

    console.log("Users found with emailsent=false:", unsentUsers.map(u => ({ _id: u._id, Email: u.Email, emailsent: u.emailsent })));

    for (const user of unsentUsers) {
      console.log(`Processing user: ${user.Email}, emailsent: ${user.emailsent}`);

      if (user.emailsent) {
        console.warn(`Skipping user ${user.Email} because emailsent is already true.`);
        continue; // Skip processing if emailsent is true
      }

      const tempPassword = generateTempPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const fullname = `${user.Prenom} ${user.Nom}`;

      try {
        await sendEmail(user.Email, fullname, tempPassword, user.role);

        // Update the user's record to mark the email as sent
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

// Function to send a welcome email to a specific user
const sendWelcomeEmail = async (userId, userRole) => {
  try {
    const user = await User.findById(userId);

    if (!user || user.role !== userRole) {
      console.error("User not found or role mismatch!");
      return;
    }

    if (user.emailsent) {
      console.warn(`Skipping user ${user.Email} because emailsent is already true.`);
      return;
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const fullname = `${user.Prenom} ${user.Nom}`;

    try {
      await sendEmail(user.Email, fullname, tempPassword, userRole);

      // Update the user's record to mark the email as sent
      await User.updateOne(
        { _id: user._id },
        { $set: { hashedTemporaryPass: hashedPassword, emailsent: true } }
      );

      console.log(`Welcome email sent to ${user.Email}`);
    } catch (emailError) {
      console.error(`Error sending welcome email to ${user.Email}:`, emailError.message);
    }
  } catch (error) {
    console.error("Error processing welcome email:", error.message);
  }
};

// Export the functions
module.exports = {
  generateTempPassword,
  sendPasswordsToUnsentUsers,
  sendWelcomeEmail,
  sendEmail,
};