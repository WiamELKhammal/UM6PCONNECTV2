import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditPublication = ({ open, onClose, publicationData, fetchPublications }) => {
  const [form, setForm] = useState({
    title: "",
    journal: "",
    year: "",
    link: "",
  });

  useEffect(() => {
    if (publicationData) {
      setForm({
        title: publicationData.title || "",
        journal: publicationData.journal || "",
        year: publicationData.year || "",
        link: publicationData.link || "",
      });
    }
  }, [publicationData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!publicationData?._id) return;

    try {
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/publications/${publicationData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchPublications();
        onClose();
      } else {
        console.error("Failed to update publication");
      }
    } catch (error) {
      console.error("Error updating publication:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Publication</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Title" name="title" value={form.title} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Journal" name="journal" value={form.journal} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Year" name="year" type="number" value={form.year} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Link" name="link" value={form.link} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#ea3b15", color: "white" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPublication;
