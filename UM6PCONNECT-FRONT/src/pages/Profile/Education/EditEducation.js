import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditEducation = ({ open, onClose, educationData, fetchEducation }) => {
  const [form, setForm] = useState({
    schoolName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  // Charger les données actuelles pour l'édition
  useEffect(() => {
    if (educationData) {
      setForm({
        schoolName: educationData.schoolName || "",
        fieldOfStudy: educationData.fieldOfStudy || "",
        startDate: educationData.startDate || "",
        endDate: educationData.endDate || "",
      });
    }
  }, [educationData]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envoyer la mise à jour
  const handleUpdate = async () => {
    if (!educationData?._id) return;

    try {
        const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/education/${educationData._id}`, {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(form),
          });
          

      if (response.ok) {
        fetchEducation(); // Rafraîchir la liste des éducations
        onClose(); // Fermer la modal
      } else {
        console.error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Education</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="School Name"
          name="schoolName"
          value={form.schoolName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Field of Study"
          name="fieldOfStudy"
          value={form.fieldOfStudy}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Start Date"
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="End Date"
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#ea3b15", color: "white" }}>
          Save 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEducation;
