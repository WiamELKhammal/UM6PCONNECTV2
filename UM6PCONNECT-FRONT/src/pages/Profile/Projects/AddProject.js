import React, { useState, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const AddProject = ({ open, onClose, fetchProjects }) => {
  const { user } = useContext(UserContext);
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");

    if (!user?._id) {
      setError("User ID is missing. Cannot add project.");
      return;
    }

    if (!project.name || !project.description || !project.startDate || !project.endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, userId: user._id }),
      });

      if (response.ok) {
        fetchProjects();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save project.");
      }
    } catch (error) {
      setError("An error occurred while saving the project.");
      console.error("Failed to save project:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <TextField label="Project Name" name="name" value={project.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Description" name="description" value={project.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} required />
        <TextField label="Start Date" name="startDate" type="date" value={project.startDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField label="End Date" name="endDate" type="date" value={project.endDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#ea3b15", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProject;
