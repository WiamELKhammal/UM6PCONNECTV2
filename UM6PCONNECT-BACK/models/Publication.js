const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    date: { type: Date, required: true },
    link: { type: String },
    fileData: { type: String }, // Contenu du fichier en Base64
    fileType: { type: String }, // Type MIME du fichier (ex: application/pdf)
});

module.exports = mongoose.model("Publication", PublicationSchema);
