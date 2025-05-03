import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import socket from "../Messages/socket";
import ArchivedChats from "./ArchivedChats";
import MyFriends from "./MyFriends";

const MessageList = ({ onSelectConversation, isMobile, activeTab, setActiveTab }) => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [typingStatuses, setTypingStatuses] = useState({});

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/all-conversations/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
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
    return () => socket.off("typing");
  }, []);

  const handleConversationClick = async (contact) => {
    try {
      await axios.post(
        "http://localhost:5000/api/messages/mark-read",
        {
          userId: user._id,
          contactId: contact._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
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
    <Box
      sx={{
        width: { xs: "100%", md: "350px" },
        height: "100vh",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #c8c9c9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isMobile && (
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Chats" value="chats" />
          <Tab label="Archived" value="archived" />
          <Tab label="Friends" value="friends" />
        </Tabs>
      )}

      {activeTab === "archived" ? (
        <ArchivedChats onSelectConversation={onSelectConversation} />
      ) : activeTab === "friends" ? (
        <MyFriends onSelectConversation={onSelectConversation} />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>Chats</Typography>
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
            sx={{ mb: 2, px: 2 }}
          />

          <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
            {conversations.length === 0 ? (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
                No messages yet.
              </Typography>
            ) : (
              conversations
                .filter((conv) =>
                  `${conv.contact?.Prenom} ${conv.contact?.Nom}`.toLowerCase().includes(search.toLowerCase())
                )
                .map((conv, index) => {
                  const contact = conv.contact || { _id: "", Nom: "Unknown", Prenom: "", profilePicture: "" };
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
                          px: 2,
                          py: 1.5,
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#F9FAFB" },
                        }}
                        onClick={() => handleConversationClick(contact)}
                      >
                        <Box sx={{ position: "relative" }}>
                          <Avatar src={contact.profilePicture || "/assets/images/default-profile.png"} sx={{ width: 50, height: 50 }} />
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: contact.status === "online" ? "#34D399" : "#9CA3AF",
                              position: "absolute",
                              bottom: 2,
                              right: 2,
                              border: "2px solid white",
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, ml: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                              {contact.Prenom} {contact.Nom}
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: "#999" }}>
                              {formatTime(conv.createdAt)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {isSentByMe &&
                                (isSeen ? (
                                  <DoneAllIcon fontSize="small" sx={{ color: "#0ABF53" }} />
                                ) : (
                                  <DoneIcon fontSize="small" sx={{ color: "#999" }} />
                                ))}
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: unreadCount > 0 ? 600 : 400,
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
                                  backgroundColor: "#ea3b15",
                                  color: "#FFF",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  borderRadius: "50%",
                                  px: 1,
                                  minWidth: 24,
                                  textAlign: "center",
                                }}
                              >
                                {unreadCount}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      {index < conversations.length - 1 && <Divider sx={{ bgcolor: "#DDD" }} />}
                    </React.Fragment>
                  );
                })
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MessageList;
