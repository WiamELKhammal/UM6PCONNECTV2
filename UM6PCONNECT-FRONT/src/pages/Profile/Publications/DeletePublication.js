import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from "@mui/material";

const DeletePublication = ({ open, onClose, publicationId, fetchPublications }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  const handleDelete = async () => {
    if (!publicationId) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/publications/${publicationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPublications();
        onClose();
      } else {
        alert("Failed to delete publication.");
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this publication? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} style={{ color: "#666" }}>Cancel</Button>
        <Button onClick={handleDelete} disabled={loading} style={{ color: "#d84b2b" }}>
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePublication;
