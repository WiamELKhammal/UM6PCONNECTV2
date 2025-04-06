const mongoose = require("mongoose");

const ResearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  context: { type: String },
  institution: { type: String },
  collaborators: [{ type: String }],
  role: { type: String },
  keywords: [{ type: String }],
  outputs: {
    link: { type: String },
    file: {
      data: { type: String }, // base64 string
      name: { type: String },
      type: { type: String },
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Research", ResearchSchema);
