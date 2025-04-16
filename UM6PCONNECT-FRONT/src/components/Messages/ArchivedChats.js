import React, { useState, useEffect, useContext } from "react";
import {
  Box, Typography, Avatar, TextField, InputAdornment, IconButton, Divider
} from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive"; // ✅ Import Unarchive Icon
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ArchivedChats = ({ onSelectConversation }) => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    const fetchArchivedConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/archived/${user._id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching archived conversations:", error);
      }
    };

    fetchArchivedConversations();
  }, [user]);

  const handleUnarchive = async (contactId) => {
    try {
      await axios.post("http://localhost:5000/api/messages/archive", {
        userId: user._id,
        contactId,
        archive: false, // ✅ Unarchive chat
      });

      setConversations(conversations.filter(chat => chat.contact._id !== contactId));
    } catch (error) {
      console.error("Error unarchiving chat:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  return (
    <Box sx={{ 
      width: "350px", 
      height: "100vh", 
      bgcolor: "#FFFFFF", 
      borderRight: "1px solid #c8c9c9" 
    }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
        {/* "Archived Chats" Title */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>
          Archived Chats
        </Typography>

      </Box>

      {/* Search Bar */}
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search chats"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
          sx: {
            border: "1px solid #CCC",
            height: "40px",
            "& fieldset": { border: "none" },
          },
        }}
        sx={{ marginBottom: "1rem", padding: "0px 16px" }}
      />

      {/* Conversations List */}
      {conversations.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", marginTop: "20px" }}>
          No archived messages found.
        </Typography>
      ) : (
        conversations
          .filter((conv) =>
            `${conv.contact?.Prenom} ${conv.contact?.Nom}`.toLowerCase().includes(search.toLowerCase())
          )
          .map((conv, index) => {
            const contact = conv.contact || { _id: "", Nom: "Unknown", Prenom: "", profilePicture: "", status: "offline" };

            return (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 20px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#F9FAFB" },
                    position: "relative",
                  }}
                  onClick={() =>
                    onSelectConversation({
                      userId: contact._id,
                      Prenom: contact.Prenom,
                      Nom: contact.Nom,
                      profilePicture: contact.profilePicture,
                    })
                  }
                >
                  {/* Profile Picture */}
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}>
                    <Avatar src={contact.profilePicture || "/assets/images/default-profile.png"} sx={{ width: 55, height: 55 }} />

                    {/* Contact Info */}
                    <Box sx={{ flex: 1 }}>
                      {/* Name & Time (Same line, #999 color for time) */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1E1E1E" }}>
                          {contact.Prenom} {contact.Nom}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#999" }}>
                          {formatTime(conv.createdAt)}
                        </Typography>
                      </Box>

                      {/* Last Message & Unarchive Icon (Same Line) */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3px" }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#5F5F5F",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "220px",
                          }}
                        >
                          {conv.text || "No messages yet"}
                        </Typography>

                        {/* Unarchive Icon (Same Line as Message) */}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ Prevent click from opening chat
                            handleUnarchive(contact._id);
                          }}
                          sx={{
                            color: "#e04c2c",
                            padding: "4px",
                          }}
                        >
                          <UnarchiveIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* ✅ Divider between conversations */}
                {index < conversations.length  && <Divider sx={{ height: "1px", bgcolor: "#DDD" }} />}
              </React.Fragment>
            );
          })
      )}
    </Box>
  );
};

export default ArchivedChats;
