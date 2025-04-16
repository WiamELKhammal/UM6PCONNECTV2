import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import socket from "../Messages/socket";

const MessageList = ({ onSelectConversation }) => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [typingStatuses, setTypingStatuses] = useState({});

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/all-conversations/${user._id}`
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    if (user?._id) fetchConversations();
  }, [user]);

  useEffect(() => {
    socket.on("typing", ({ senderId }) => {
      setTypingStatuses((prev) => ({ ...prev, [senderId]: true }));
      setTimeout(() => {
        setTypingStatuses((prev) => ({ ...prev, [senderId]: false }));
      }, 3000);
    });

    return () => {
      socket.off("typing");
    };
  }, []);

  const handleConversationClick = async (contact) => {
    try {
      await axios.post("http://localhost:5000/api/messages/mark-read", {
        userId: user._id,
        contactId: contact._id,
      });
      await fetchConversations();
      onSelectConversation({
        userId: contact._id,
        Prenom: contact.Prenom,
        Nom: contact.Nom,
        profilePicture: contact.profilePicture,
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getFileLabel = (type = "") => {
    if (type.startsWith("image/")) return "Sent an Image";
    if (type.startsWith("video/")) return "Sent a Video";
    if (type.startsWith("audio/")) return "Sent an Audio";
    if (type === "application/pdf") return "Sent a PDF";
    return "Document";
  };

  return (
    <Box sx={{ width: "350px", height: "100vh", bgcolor: "#FFFFFF", borderRight: "1px solid #c8c9c9", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>Chats</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton sx={{ border: "1px solid #CCC", borderRadius: "8px", color: "#000" }}><GroupIcon /></IconButton>
          <IconButton sx={{ border: "1px solid #CCC", borderRadius: "8px", color: "#000" }}><AddIcon /></IconButton>
        </Box>
      </Box>

      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search chats"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
          sx: {
            border: "1px solid #CCC",
            height: "40px",
            "& fieldset": { border: "none" },
          },
        }}
        sx={{ marginBottom: "1rem", padding: "0px 16px" }}
      />

      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, "-ms-overflow-style": "none", scrollbarWidth: "none" }}>
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
              const contact = conv.contact || {
                _id: "",
                Nom: "Unknown",
                Prenom: "",
                profilePicture: "",
                status: "offline",
              };
              const unreadCount = conv.unreadCount;
              const isTyping = typingStatuses[contact._id];
              const isSentByMe = conv.senderId === user._id;
              const isSeen = conv.isRead && isSentByMe;

              const lastMessageText = isTyping
                ? "Typing..."
                : conv.text?.trim()
                ? conv.text
                : conv.files?.length > 0
                ? getFileLabel(conv.files[0]?.type)
                : "";

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
                    onClick={() => handleConversationClick(contact)}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Avatar src={contact.profilePicture || "/assets/images/default-profile.png"} sx={{ width: 55, height: 55 }} />
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

                    <Box sx={{ flex: 1, marginLeft: "15px" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "16px", color: "#1E1E1E", fontWeight: "500" }}>
                          {contact.Prenom} {contact.Nom}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#999" }}>
                          {formatTime(conv.createdAt)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {isSentByMe && (
                            isSeen ? <DoneAllIcon fontSize="small" sx={{ color: "#0ABF53" }} /> : <DoneIcon fontSize="small" sx={{ color: "#999" }} />
                          )}
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: unreadCount > 0 ? "600" : "400",
                              color: unreadCount > 0 ? "#000" : "#5F5F5F",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                          >
                            {lastMessageText}
                          </Typography>
                        </Box>

                        {unreadCount > 0 && (
                          <Box
                            sx={{
                              backgroundColor: "#e04c2c",
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
                  {index < conversations.length && (
                    <Divider sx={{ height: "1px", bgcolor: "#DDD" }} />
                  )}
                </React.Fragment>
              );
            })
        )}
      </Box>
    </Box>
  );
};

export default MessageList;
