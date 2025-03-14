import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

const EditExperience = ({ open, onClose, experienceData, fetchExperience }) => {
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false, // Ajout du statut pour "Toujours en poste"
  });

  useEffect(() => {
    if (experienceData) {
      setForm({
        companyName: experienceData.companyName || "",
        jobTitle: experienceData.jobTitle || "",
        startDate: experienceData.startDate ? experienceData.startDate.split("T")[0] : "",
        endDate: experienceData.endDate === "Present" || !experienceData.endDate ? "" : experienceData.endDate.split("T")[0],
        description: experienceData.description || "",
        isCurrent: experienceData.endDate === "Present" || !experienceData.endDate, // Activer la case si c'est "Present"
      });
    }
  }, [experienceData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setForm((prev) => ({
      ...prev,
      isCurrent: !prev.isCurrent,
      endDate: prev.isCurrent ? "" : "Present",
    }));
  };

  const handleUpdate = async () => {
    if (!experienceData?._id) return;

    try {
      const updatedData = {
        ...form,
        endDate: form.isCurrent ? "Present" : form.endDate || null, // Convertir "Present" ou null
      };

      const response = await fetch(`http://localhost:5000/api/experience/${experienceData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        fetchExperience();
        onClose();
      } else {
        console.error("Failed to update experience");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Experience</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Job Title" name="jobTitle" value={form.jobTitle} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        
        <FormControlLabel
          control={<Checkbox checked={form.isCurrent} onChange={handleCheckboxChange} />}
          label="Currently Working Here"
        />

        {!form.isCurrent && (
          <TextField fullWidth margin="dense" label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        )}

        <TextField fullWidth margin="dense" label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#d84b2b", color: "white" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExperience;
