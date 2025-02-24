import React, { useState, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const AddExperience = ({ open, onClose, fetchExperience }) => {
  const { user } = useContext(UserContext);

  const [experience, setExperience] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [isPresent, setIsPresent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsPresent(e.target.checked);
    if (e.target.checked) {
      setExperience({ ...experience, endDate: "Present" });
    } else {
      setExperience({ ...experience, endDate: "" });
    }
  };

  const handleSave = async () => {
    setError("");

    if (!user?._id) {
      setError("User ID is missing. Cannot add experience.");
      return;
    }

    if (!experience.companyName || !experience.jobTitle || !experience.startDate || (!isPresent && !experience.endDate)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...experience, userId: user._id }),
      });

      if (response.ok) {
        fetchExperience();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save experience.");
      }
    } catch (error) {
      setError("An error occurred while saving the experience.");
      console.error("Failed to save experience:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Experience</DialogTitle>
      <DialogContent>
        <TextField label="Company Name" name="companyName" value={experience.companyName} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Job Title" name="jobTitle" value={experience.jobTitle} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Start Date" name="startDate" type="date" value={experience.startDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        
        {!isPresent && (
          <TextField label="End Date" name="endDate" type="date" value={experience.endDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        )}
        
        <FormControlLabel
          control={<Checkbox checked={isPresent} onChange={handleCheckboxChange} />}
          label="I am currently working here"
        />

        <TextField label="Description" name="description" value={experience.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
        
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#d84b2b", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExperience;
