import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const DeleteExperience = ({ open, onClose, experienceId, fetchExperience }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext); // correctly using your user

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  const handleDelete = async () => {
    if (!experienceId) return;
    setLoading(true);

    try {
      if (!user?.token) {
        alert("Authentication token not found.");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/experience/${experienceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // use user.token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete experience.");
      }

      await fetchExperience();
      onClose();
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this experience entry? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} style={{ color: "#666" }}>
          Cancel
        </Button>
        <Button onClick={handleDelete} disabled={loading} style={{ color: "#e04c2c" }}>
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExperience;
