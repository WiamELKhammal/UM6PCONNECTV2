const express = require("express");
const Publication = require("../models/Publication");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // Pas de stockage sur disque, on garde le fichier en mémoire

// 📌 Ajouter une publication avec un fichier en Base64
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const { userId, type, title, authors, date, link } = req.body;

        let fileData = null;
        let fileType = null;

        if (req.file) {
            fileData = req.file.buffer.toString("base64"); // Conversion en Base64
            fileType = req.file.mimetype; // Type de fichier (ex: application/pdf)
        }

        const newPublication = new Publication({
            userId,
            type,
            title,
            authors: JSON.parse(authors), // Conversion en tableau
            date,
            link,
            fileData,
            fileType,
        });

        await newPublication.save();

        res.status(201).json({ message: "Publication added successfully", publication: newPublication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//  Récupérer les publications d’un utilisateur spécifique
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const publications = await Publication.find({ userId });

        if (!publications.length) {
            return res.status(404).json({ message: "No publications found" });
        }

        res.json(publications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


//  Supprimer une publication
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPublication = await Publication.findByIdAndDelete(id);

        if (!deletedPublication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.status(200).json({ message: "Publication deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
//  Télécharger un fichier d'une publication
router.get("/:id/file", async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication || !publication.fileData) {
            return res.status(404).json({ message: "File not found" });
        }

        const fileBuffer = Buffer.from(publication.fileData, "base64");

        res.setHeader("Content-Type", publication.fileType);
        res.setHeader("Content-Disposition", `attachment; filename="${publication.title}.pdf"`);
        res.send(fileBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
//  Obtenir le fichier en base64 pour affichage
router.get("/:id/preview", async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication || !publication.fileData) {
            return res.status(404).json({ message: "File not found" });
        }

        res.json({ fileData: publication.fileData, fileType: publication.fileType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Modifier une publication
router.put("/:id", upload.single("file"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, authors, date, link } = req.body;

        let updateFields = { title, type, authors: JSON.parse(authors), date, link };

        if (req.file) {
            updateFields.fileData = req.file.buffer.toString("base64");
            updateFields.fileType = req.file.mimetype;
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedPublication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.status(200).json({ message: "Publication updated successfully", publication: updatedPublication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
