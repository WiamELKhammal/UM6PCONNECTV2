const Postdoc = require("../models/Postdoc");
const { sendEmail } = require("../services/emailService");
const bcrypt = require("bcrypt");

exports.registerPostdoc = async (req, res) => {
  const { Email } = req.body;

  try {
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Postdoc({ ...req.body, password: hashedPassword });
    await user.save();

    await sendEmail(Email, "Your Temporary Password", `Your password is: ${password}`);

    res.status(201).json({ message: "User registered and email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
