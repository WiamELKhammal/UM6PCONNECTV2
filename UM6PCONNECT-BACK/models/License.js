const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  licenseName: { type: String, required: true },
  issuedBy: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expirationDate: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("License", LicenseSchema);
