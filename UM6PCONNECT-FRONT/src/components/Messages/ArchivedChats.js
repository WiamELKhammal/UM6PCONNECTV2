import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ArchivedChats = ({ onSelectConversation, setActiveTab }) => {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!user?._id) return;

    const fetchArchivedConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/archived/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching archived conversations:", error);
      }
    };

    fetchArchivedConversations();
  }, [user]);

  const handleUnarchive = async (contactId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/messages/archive",
        {
          userId: user._id,
          contactId,
          archive: false,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      {/* Top Header with Back Arrow on Mobile */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1, gap: 1 }}>
        {isMobile && (
          <IconButton onClick={() => setActiveTab("chats")} size="small">
            <ArrowBackIcon />
          </IconButton>
        )}
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
          startAdornment: <InputAdornment position="start" />,
          sx: {
            border: "1px solid #CCC",
            height: "40px",
            "& fieldset": { border: "none" },
          },
        }}
        sx={{ mb: 2, px: 2 }}
      />

      {/* Chat List */}
      <Box sx={{ flex: 1, overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
        {conversations.length === 0 ? (
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
            No archived messages found.
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
              };

              return (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "14px 20px",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#F9FAFB" },
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
                    <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}>
                      <Avatar
                        src={contact.profilePicture || "/assets/images/default-profile.png"}
                        sx={{ width: 55, height: 55 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1E1E1E" }}>
                            {contact.Prenom} {contact.Nom}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "#999" }}>
                            {formatTime(conv.createdAt)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "3px" }}>
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

                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnarchive(contact._id);
                            }}
                            sx={{ color: "#ea3b15", padding: "4px" }}
                          >
                            <UnarchiveIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {index < conversations.length - 1 && <Divider sx={{ height: "1px", bgcolor: "#DDD" }} />}
                </React.Fragment>
              );
            })
        )}
      </Box>
    </Box>
  );
};

export default ArchivedChats;
