import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Alert
} from "@mui/material";

const EditResearch = ({ research, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...research });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.context) {
      setError("Title and context are required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/research/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update research.");
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Research</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth />
          <TextField label="Context" name="context" value={formData.context} onChange={handleChange} fullWidth multiline rows={4} />
          <TextField label="Institution" name="institution" value={formData.institution} onChange={handleChange} fullWidth />
          <TextField label="Collaborators" name="collaborators" value={formData.collaborators} onChange={handleChange} fullWidth />
          <TextField label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} sx={{ bgcolor: "#ea3b15", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditResearch;
