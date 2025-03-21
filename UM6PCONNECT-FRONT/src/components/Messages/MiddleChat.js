import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import RightSidebar from "./RightSidebar";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MiddleChat = ({ selectedConversation }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Controls Right Sidebar

  useEffect(() => {
    if (!selectedConversation || !selectedConversation.userId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/conversation/${user._id}/${selectedConversation.userId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedConversation, user?._id]);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      {/* Main Chat Container (Dynamic Width) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: sidebarOpen ? "calc(100% - 100px)" : "100%", // ✅ Chat Shrinks When Sidebar Opens
          transition: "width 0.3s ease-in-out",
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
    "-ms-overflow-style": "none", // IE, Edge
    "scrollbar-width": "none", // Firefox
        }}
      >
        {/* ✅ Pass onToggleSidebar to ChatHeader */}
        <ChatHeader 
          recipient={selectedConversation} 
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)} // ✅ Toggles Sidebar
        />
        
        <Box sx={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <ChatMessages messages={messages} setMessages={setMessages} recipient={selectedConversation} />
        </Box>
        
        <ChatInput recipientId={selectedConversation.userId} setMessages={setMessages} />
      </Box>

      {/* ✅ Right Sidebar (Only shown when open) */}
      {sidebarOpen && <RightSidebar recipient={selectedConversation} onClose={() => setSidebarOpen(false)} />}
    </Box>
  );
};

export default MiddleChat;
