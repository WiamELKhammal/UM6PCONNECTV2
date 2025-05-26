import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, CircularProgress
} from "@mui/material";
const DeleteResearch = ({ open, onClose, researchId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

 
  
  const handleDelete = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")); // or from context if available
      const token = storedUser?.token;
  
      const res = await fetch(`http://localhost:5000/api/research/${researchId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Delete failed");
      onDelete();
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete research.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this research? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">Cancel</Button>
        <Button onClick={handleDelete} disabled={loading} sx={{ color: "#ea3b15" }}>
          {loading ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteResearch;
