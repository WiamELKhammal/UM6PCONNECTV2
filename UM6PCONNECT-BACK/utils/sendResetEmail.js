const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // must be false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // <- allows self-signed certs
    },
  });
  

const sendResetEmail = async (to, name, resetLink) => {
  const mailOptions = {
    from: `"UM6P CONNECT" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your UM6P Password",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <img src="https://www.um6p.ma/sites/all/themes/custom/um6p/logo.png" alt="UM6P" style="width: 120px; margin-bottom: 20px;" />
        <h2 style="color: #ea3b15;">Reset your password</h2>
        <p>Hi ${name || "there"},</p>
        <p>We received a request to reset your UM6P account password.</p>
        <p>
          Click the button below to set a new password:
        </p>
        <a href="${resetLink}" style="display: inline-block; background-color: #ea3b15; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a>
        <p style="margin-top: 20px; font-size: 13px; color: #666;">
          If you didn't request this, please ignore this email.
        </p>
        <p style="margin-top: 30px; font-size: 13px;">© UM6P CONNECT - All rights reserved.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
