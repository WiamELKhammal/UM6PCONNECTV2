import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MessageList from "./MessageList";
import MyFriends from "./MyFriends";
import ArchivedChats from "./ArchivedChats";
import { UserContext } from "../../context/UserContext";

const MobileConversations = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeTab, setActiveTab] = useState("chats");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (contact) => {
    setSelectedConversation(contact);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top header with back arrow and inline tab icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        {selectedConversation && (
          <IconButton onClick={() => setSelectedConversation(null)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1, textAlign: "center" }}>
          {activeTab === "chats"
            ? "Chats"
            : activeTab === "archived"
            ? "Archived"
            : "Friends"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => setActiveTab("chats")}>
            <ChatBubbleOutlineIcon sx={{ color: activeTab === "chats" ? "#ea3b15" : "#777" }} />
          </IconButton>
          <IconButton onClick={() => setActiveTab("archived")}>
            <ArchiveOutlinedIcon sx={{ color: activeTab === "archived" ? "#ea3b15" : "#777" }} />
          </IconButton>
          <IconButton onClick={() => setActiveTab("friends")}>
            <PersonOutlineIcon sx={{ color: activeTab === "friends" ? "#ea3b15" : "#777" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content: full screen */}
      <Box sx={{ flex: 1 }}>
        {activeTab === "chats" && (
          <MessageList
            isMobile={true}
            onSelectConversation={handleSelectConversation}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "archived" && (
          <ArchivedChats onSelectConversation={handleSelectConversation} />
        )}
        {activeTab === "friends" && (
          <MyFriends onSelectConversation={handleSelectConversation} />
        )}
      </Box>
    </Box>
  );
};

export default MobileConversations;
