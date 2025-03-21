import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const DeleteEducation = ({ open, onClose, educationId, fetchEducation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setLoading(false); // Reset loading state when modal is closed
  }, [open]);

  const handleDelete = async () => {
    if (!educationId) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/education/${educationId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete education entry.");
      }

      await fetchEducation(); // Refresh the education list
      onClose(); // Close modal after successful deletion
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Failed to delete education entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this education entry? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} style={{ color: "#666" }}>
          Cancel
        </Button>
        <Button onClick={handleDelete} disabled={loading} style={{ color: "#ea3b15" }}>
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEducation;
