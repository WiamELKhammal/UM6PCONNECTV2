import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MessageList from "./MessageList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";
import MyFriends from "./MyFriends";
import ArchivedChats from "./ArchivedChats";
import RightSidebar from "./RightSidebar";
import { UserContext } from "../../context/UserContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const Conversations = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("chats");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectConversation = (contact) => {
    setSelectedConversation(contact);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (!selectedConversation?.userId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/conversation/${user._id}/${selectedConversation.userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedConversation, user?._id]);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#FFF" }}>
      {/* Sidebar for tab navigation */}
      <Box sx={{ display: isMobile ? (!selectedConversation ? "block" : "none") : "block" }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </Box>

      {/* List of chats/friends */}
      {(!isMobile || !selectedConversation) && (
        <Box sx={{ width: isMobile ? "100%" : "350px", flexShrink: 0 }}>
          {activeTab === "chats" ? (
            <MessageList onSelectConversation={handleSelectConversation} />
          ) : activeTab === "archived" ? (
            <ArchivedChats onSelectConversation={handleSelectConversation} />
          ) : (
            <MyFriends onSelectConversation={handleSelectConversation} />
          )}
        </Box>
      )}

      {/* Chat section */}
      {(selectedConversation || !isMobile) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease-in-out",
            width: isMobile ? "100%" : sidebarOpen ? "calc(100% - 350px)" : "calc(100% - 80px)",
          }}
        >
          {!selectedConversation ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                padding: "20px",
              }}
            >
              <DotLottieReact
                src="https://lottie.host/f485dbc8-64c5-49c1-8db1-ad4600646d0b/4MM8tbZtCo.lottie"
                loop
                autoplay
                style={{ width: "250px", height: "250px", marginBottom: "10px" }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#1E1E1E",
                  fontSize: "28px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  letterSpacing: "0.44px",
                  marginBottom: "8px",
                }}
              >
                You’ve not chatted yet !!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#888888",
                  fontSize: "20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "400",
                }}
              >
                There is no chat done yet. Click on a user to start chatting.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                overflow: "hidden",
                paddingRight: sidebarOpen ? "80px" : "0px",
                transition: "padding-right 0.3s ease-in-out",
              }}
            >
              <Box sx={{ position: "relative" }}>
                {/* Back button for mobile */}
                {isMobile && (
                  <IconButton
                    onClick={() => setSelectedConversation(null)}
                    sx={{ position: "absolute", top: 20, left: 8, zIndex: 100 }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <ChatHeader
                  recipient={selectedConversation}
                  onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
              </Box>
              <Box sx={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                <ChatMessages
                  messages={messages}
                  recipient={selectedConversation}
                />
              </Box>
              <ChatInput
                recipientId={selectedConversation.userId}
                setMessages={setMessages}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Right Sidebar (only desktop) */}
      {!isMobile && sidebarOpen && (
        <RightSidebar
          recipient={selectedConversation}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </Box>
  );
};

export default Conversations;
