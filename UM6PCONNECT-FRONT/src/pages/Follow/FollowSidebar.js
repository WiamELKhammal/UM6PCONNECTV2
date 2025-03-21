import React from "react";
import { Box, Typography } from "@mui/material";

const FollowSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        width: "250px", // Fixed width for the sidebar
        bgcolor: "#f7f7f7",
        padding: "20px 0", // Vertical padding only, no horizontal padding
        borderRight: "1px solid #ddd",
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 3,fontWeight: "600", fontSize: "18px", color: "#000", px: 3 }}>
        Follow List
      </Typography>
        
      {/* Tabs Container */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Followers Tab */}
        <Box
          onClick={() => setActiveTab("followers")}
          sx={{
            fontWeight: 400,
            width: "250px",
            padding: "12px 0", // Vertical padding only, no horizontal padding
            backgroundColor: activeTab === "followers" ? "#ea3b15" : "transparent",
            color: activeTab === "followers" ? "white" : "black",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#ea3b15", // Red background on hover
              color: "white", // White text on hover
            },
          }}
        >
          <Box sx={{ px: 3 }}>Followers</Box> {/* Add padding inside the box */}
        </Box>

        {/* Following Tab */}
        <Box
          onClick={() => setActiveTab("following")}
          sx={{
            fontWeight: 400,
            width: "250px",
            padding: "12px 0", // Vertical padding only, no horizontal padding
            backgroundColor: activeTab === "following" ? "#ea3b15" : "transparent",
            color: activeTab === "following" ? "white" : "black",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#ea3b15", // Red background on hover
              color: "white", // White text on hover
            },
          }}
        >
          <Box sx={{ px: 3 }}>Following</Box> {/* Add padding inside the box */}
        </Box>
      </Box>
    </Box>
  );
};

export default FollowSidebar;