import React, { useState, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserContext } from "../../../context/UserContext"; // Import du contexte utilisateur

const AddEducation = ({ open, onClose, fetchEducation }) => {
  const { user } = useContext(UserContext); // Récupérer l'utilisateur du contexte
  const [education, setEducation] = useState({
    schoolName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?._id) {
      console.error("User ID is missing. Cannot add education.");
      return;
    }

    if (education.schoolName && education.fieldOfStudy && education.startDate && education.endDate) {
      try {
        console.log("Sending education data:", { ...education, userId: user._id }); // Debugging log

        const response = await fetch("http://localhost:5000/api/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...education, userId: user._id }), // Utilisation de user._id
        });

        if (response.ok) {
          fetchEducation(); // Rafraîchir la liste après ajout
          onClose();
        } else {
          console.error("Failed to save education. Server response:", await response.json());
        }
      } catch (error) {
        console.error("Failed to save education", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Education</DialogTitle>
      <DialogContent>
        <p style={{ fontSize: "14px", color: "#666" }}>Fill in the fields below to add a new education entry.</p>
        <TextField
          label="School Name"
          name="schoolName"
          value={education.schoolName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Field of Study"
          name="fieldOfStudy"
          value={education.fieldOfStudy}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={education.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={education.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#e04c2c", color: "#fff" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEducation;
