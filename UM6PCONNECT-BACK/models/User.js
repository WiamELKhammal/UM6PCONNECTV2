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
  profilePicture: { type: String, default: "" },
  coverPicture: { type: String, default: "" },
  badged: { type: Boolean, default: false },

  // 🔐 RESET PASSWORD FIELDS (ADD THESE)
  resetToken: { type: String, default: null },
  resetTokenExpiration: { type: Date, default: null },

  // Additional profile fields
  bio: { type: String, default: "" },
  Departement: { type: String, default: "" },
  headline: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  researchGate: { type: String, default: "" },

  // References
  educations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
  licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],

  // Stats
  saveCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  lastSeen: { type: Date, default: null },
  verified: { type: Boolean, default: false }, //  

});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
