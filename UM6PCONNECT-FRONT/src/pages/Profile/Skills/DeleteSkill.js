import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Snackbar, Alert } from "@mui/material";

const DeleteSkill = ({ open, onClose, skillId, fetchSkills }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!skillId) return;
    setLoading(true);

    try {
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/skills/${skillId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill.");
      }

      fetchSkills(); // Rafraîchir la liste après suppression
      onClose(); // Fermer le modal après suppression
    } catch (error) {
      console.error("Error deleting skill:", error);
      setError("Failed to delete skill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this skill? This action cannot be undone.
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

      {/* Snackbar pour afficher les erreurs */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteSkill;
