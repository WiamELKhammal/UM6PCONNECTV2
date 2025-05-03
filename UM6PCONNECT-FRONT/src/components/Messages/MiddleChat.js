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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!selectedConversation || !selectedConversation.userId || !user?.token) return;

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
  }, [selectedConversation, user?._id, user?.token]);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: sidebarOpen ? "calc(100% - 100px)" : "100%",
          transition: "width 0.3s ease-in-out",
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        <ChatHeader
          recipient={selectedConversation}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <Box sx={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <ChatMessages
            messages={messages}
            setMessages={setMessages}
            recipient={selectedConversation}
          />
        </Box>

        <ChatInput
          recipientId={selectedConversation.userId}
          setMessages={setMessages}
        />
      </Box>

      {sidebarOpen && (
        <RightSidebar
          recipient={selectedConversation}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </Box>
  );
};

export default MiddleChat;
