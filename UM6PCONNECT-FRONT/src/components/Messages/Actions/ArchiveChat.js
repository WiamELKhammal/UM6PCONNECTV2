import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const ArchiveChat = ({ open, onClose, userId, contactId }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext); // Get token from context

  const handleArchive = async () => {
    if (!userId || !contactId || !user?.token) {
      console.error("Missing required IDs or token.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/messages/archive",
        {
          userId,
          contactId,
          archive: true,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Chat archived successfully.");
      onClose();
    } catch (error) {
      console.error("Error archiving chat:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Archive Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to archive this chat? You can always restore it later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#666" }} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleArchive}
          style={{ color: "#ea3b15" }}
          disabled={loading}
        >
          {loading ? "Archiving..." : "Archive"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArchiveChat;
