const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Ajouter un projet
router.post("/", async (req, res) => {
  try {
    const { userId, name, description, startDate, endDate } = req.body;

    if (!userId || !name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const project = new Project({ userId, name, description, startDate, endDate });
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Récupérer tous les projets d'un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Mettre à jour un projet
router.put("/:id", async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const { id } = req.params;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Supprimer un projet
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
