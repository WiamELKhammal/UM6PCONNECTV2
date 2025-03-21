import React, { useState, useEffect, useContext } from "react";
import {
  Box, Typography, Avatar, TextField, InputAdornment, IconButton, Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MessageList = ({ onSelectConversation }) => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/all-conversations/${user._id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [user]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  return (
    <Box
  sx={{ 
    width: "350px", 
    height: "100vh", 
    bgcolor: "#FFFFFF", 
    borderRight: "1px solid #c8c9c9",
    display: "flex",
    flexDirection: "column"
  }}
>
  {/* Header Section */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
    {/* "Chats" Title */}
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>
      Chats
    </Typography>

    {/* Icons (Group & Add Chat) */}
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton sx={{ border: "1px solid #CCC", borderRadius: "8px", color: "#000" }}>
        <GroupIcon />
      </IconButton>
      <IconButton sx={{ border: "1px solid #CCC", borderRadius: "8px", color: "#000" }}>
        <AddIcon />
      </IconButton>
    </Box>
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

  {/* ✅ Scrollable Conversations (Hides Scrollbar) */}
  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      "&::-webkit-scrollbar": { display: "none" }, // ✅ Hides scrollbar (Chrome, Safari)
      "-ms-overflow-style": "none", // ✅ Hides scrollbar (IE, Edge)
      "scrollbar-width": "none", // ✅ Hides scrollbar (Firefox)
    }}
  >
    {conversations.length === 0 ? (
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", marginTop: "20px" }}>
        No messages yet.
      </Typography>
    ) : (
      conversations
        .filter((conv) =>
          `${conv.contact?.Prenom} ${conv.contact?.Nom}`.toLowerCase().includes(search.toLowerCase())
        )
        .map((conv, index) => {
          const contact = conv.contact || { _id: "", Nom: "Unknown", Prenom: "", profilePicture: "", status: "offline" };
          const unreadCount = conv.unreadCount;

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
                <Box sx={{ position: "relative" }}>
                  <Avatar src={contact.profilePicture || "/assets/images/default-profile.png"} sx={{ width: 55, height: 55 }} />
                  {/* Status Indicator */}
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: contact.status === "online" ? "#34D399" : "#9CA3AF",
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      border: "2px solid white",
                    }}
                  />
                </Box>

                {/* User Info */}
                <Box sx={{ flex: 1, marginLeft: "15px" }}>
                  {/* Name & Time */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "16px", color: "#1E1E1E", fontWeight: "500" }}>
                      {contact.Prenom} {contact.Nom}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#999" }}>
                      {formatTime(conv.createdAt)}
                    </Typography>
                  </Box>

                  {/* Last Message & Unread Count */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
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
                      {conv.text}
                    </Typography>

                    {/* Unread Count (Orange Circle) */}
                    {unreadCount > 0 && (
                      <Box
                        sx={{
                          backgroundColor: "#ea3b15",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: "600",
                          borderRadius: "50%",
                          padding: "6px 10px",
                          minWidth: "25px",
                          textAlign: "center",
                        }}
                      >
                        {unreadCount}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* ✅ Divider between conversations */}
              {index < conversations.length && <Divider sx={{ height: "1px", bgcolor: "#DDD" }} />}
            </React.Fragment>
          );
        })
    )}
  </Box>
</Box>

  );
};

export default MessageList;
