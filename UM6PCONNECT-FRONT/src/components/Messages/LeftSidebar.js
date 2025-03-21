import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import MessageList from "./MessageList";
import { UserContext } from "../../context/UserContext";

const Conversation = () => {
  const { user } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Section - Messages List */}
      <Box sx={{ width: "30%", borderRight: "1px solid #ddd", overflowY: "auto" }}>
        <MessageList onSelectConversation={setSelectedUser} />
      </Box>

     
    </Box>
  );
};

export default Conversation;
