import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const DeleteProject = ({ open, onClose, projectId, fetchProjects }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setError(""); // reset error when dialog closes
    }
  }, [open]);

  const handleDelete = async () => {
    if (!projectId) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project.");
      }

      await fetchProjects();
      onClose();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this project entry? This action cannot be undone.
        </DialogContentText>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} sx={{ color: "#666" }}>
          Cancel
        </Button>
        <Button onClick={handleDelete} disabled={loading} sx={{ color: "#e04c2c" }}>
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProject;
