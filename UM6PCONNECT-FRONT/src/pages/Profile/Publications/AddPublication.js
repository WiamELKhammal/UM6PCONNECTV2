import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const AddPublication = ({ open, onClose, fetchPublications }) => {
  const { user } = useContext(UserContext);
  const [publication, setPublication] = useState({
    title: "",
    journal: "",
    year: "",
    link: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");

    if (!user?._id) {
      setError("User ID is missing. Cannot add publication.");
      return;
    }

    if (!publication.title || !publication.journal || !publication.year) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...publication, userId: user._id }),
      });

      if (response.ok) {
        fetchPublications();
        onClose();
      } else {
        setError("Failed to save publication.");
      }
    } catch (error) {
      setError("An error occurred while saving the publication.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Publication</DialogTitle>
      <DialogContent>
        <TextField label="Title" name="title" value={publication.title} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Journal" name="journal" value={publication.journal} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Year" name="year" type="number" value={publication.year} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Link" name="link" value={publication.link} onChange={handleChange} fullWidth margin="normal" />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#d84b2b", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPublication;
