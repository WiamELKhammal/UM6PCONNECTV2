const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Prenom: { type: String, required: true },
  Nom: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  telephone: { type: String },
  password: { type: String, required: false },

  Status: { type: String, default: "Pending" },
  emailsent: { type: Boolean, default: false },
  hashedTemporaryPass: { type: String, required: false },
  profilePicture: { type: String, default: "" }, // Base64-encoded image
  coverPicture: { type: String, default: "" },
  // Additional profile fields
  bio: { type: String, default: "" },       // User's biography (limit to 200 words on the front-end)
  headline: { type: String, default: "" },    // Short professional tagline
  location: { type: String, default: "" },    // Geographical location
  address: { type: String, default: "" },     // Physical address
  birthDate: { type: Date, default: null },   // Birth date, using Date type for better handling
  url: { type: String, default: "" },          // Link to a website or social profile

  // Referencing other collections using ObjectId
  educations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
  licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],



});

// Create or retrieve the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
