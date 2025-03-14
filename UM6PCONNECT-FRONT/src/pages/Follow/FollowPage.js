// pages/FollowPage.js
import React, { useState } from "react";
import { Box } from "@mui/material";
import FollowSidebar from "./FollowSidebar";
import FollowList from "./FollowList";

const FollowPage = () => {
  const [activeTab, setActiveTab] = useState("followers"); // State for active tab

  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <FollowSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <FollowList activeTab={activeTab} />
    </Box>
  );
};

export default FollowPage;