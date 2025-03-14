import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditProject = ({ open, onClose, projectData, fetchProjects }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (projectData) {
      setForm({
        name: projectData.name || "",
        description: projectData.description || "",
        startDate: projectData.startDate ? projectData.startDate.split("T")[0] : "",
        endDate: projectData.endDate ? projectData.endDate.split("T")[0] : "",
      });
    }
  }, [projectData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setError("");

    if (!projectData?._id) {
      setError("Project ID is missing. Cannot update project.");
      return;
    }

    if (!form.name || !form.description || !form.startDate || !form.endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchProjects();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update project.");
      }
    } catch (error) {
      setError("An error occurred while updating the project.");
      console.error("Failed to update project:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Project Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField fullWidth margin="dense" label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} required />
        <TextField fullWidth margin="dense" label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField fullWidth margin="dense" label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#d84b2b", color: "white" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProject;
