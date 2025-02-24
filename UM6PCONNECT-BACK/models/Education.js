const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  schoolName: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

module.exports = mongoose.model("Education", EducationSchema);
