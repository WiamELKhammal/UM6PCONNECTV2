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
import MyFriends from "./MyFriends";
import ArchivedChats from "./ArchivedChats";
import RightSidebar from "./RightSidebar";
import { UserContext } from "../../context/UserContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import Sidebar from "./Sidebar";

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
          `https://um6pconnectv2-production.up.railway.app/api/messages/conversation/${user._id}/${selectedConversation.userId}`,
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
      {/* 🖥 Sidebar (Desktop Only) */}
      {!isMobile && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* 📱 Chat List (Always show on desktop, only show on mobile if no conversation is selected) */}
      {(!isMobile || !selectedConversation) && (
        <Box sx={{ width: isMobile ? "100%" : "350px", flexShrink: 0 }}>
          {activeTab === "chats" ? (
            <MessageList
              onSelectConversation={handleSelectConversation}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === "archived" ? (
            <ArchivedChats
              onSelectConversation={handleSelectConversation}
              setActiveTab={setActiveTab}
            />
          ) : (
            <MyFriends
              onSelectConversation={handleSelectConversation}
              setActiveTab={setActiveTab}
            />
          )}
        </Box>
      )}

      {/* 💬 Chat area */}
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
              {/* 🔙 Mobile back to conversation list */}
              <Box sx={{ position: "relative" }}>
                {isMobile && (
                  <IconButton
                    onClick={() => setSelectedConversation(null)}
                    sx={{ position: "absolute", top: 20, left: 8, zIndex: 100 }}
                  >
                  </IconButton>
                )}
                <ChatHeader
                  recipient={selectedConversation}
                  onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                  onBack={() => setSelectedConversation(null)}
                  isMobile={isMobile}
                />
              </Box>

              {/* 💬 Messages */}
              <Box sx={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                <ChatMessages
                  messages={messages}
                  recipient={selectedConversation}
                />
              </Box>

              {/* 📥 Input */}
              <ChatInput
                recipientId={selectedConversation.userId}
                setMessages={setMessages}
              />
            </Box>
          )}
        </Box>
      )}

      {/* ℹ️ Right Sidebar */}
      {sidebarOpen && (
        <Box
          sx={{
            position: isMobile ? "fixed" : "relative",
            top: 0,
            right: 0,
            width: isMobile ? "100vw" : "320px",
            height: "100vh",
            zIndex: 1300,
            backgroundColor: "#fff",
          }}
        >
          <RightSidebar
            recipient={selectedConversation}
            onClose={() => setSidebarOpen(false)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Conversations;
