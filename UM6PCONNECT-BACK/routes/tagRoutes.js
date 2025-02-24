const express = require("express");
const Tag = require("../models/Tag");

const router = express.Router();

// GET - Récupérer tous les tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Ajouter un nouveau tag
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Tag name is required" });

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Supprimer un tag
router.delete("/:id", async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
