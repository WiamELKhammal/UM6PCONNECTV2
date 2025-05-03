import React from "react";
import { Box, Typography } from "@mui/material";

const FollowSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        width: { xs: "120px", sm: "220px" }, // 📱 Small width on phone
        bgcolor: "#f7f7f7",
        padding: "20px 0",
        borderRight: "1px solid #ddd",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: "600",
          fontSize: { xs: "14px", sm: "18px" }, // 📱 Smaller title on phone
          color: "#000",
          px: 2,
        }}
      >
        Follow List
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          onClick={() => setActiveTab("followers")}
          sx={{
            fontWeight: 400,
            width: "100%",
            padding: "12px 0",
            backgroundColor: activeTab === "followers" ? "#ea3b15" : "transparent",
            color: activeTab === "followers" ? "white" : "black",
            cursor: "pointer",
            textAlign: "center",
            transition: "0.3s",
            fontSize: { xs: "13px", sm: "16px" }, // 📱 Smaller text on phone
            "&:hover": {
              backgroundColor: "#ea3b15",
              color: "white",
            },
          }}
        >
          Followers
        </Box>

        <Box
          onClick={() => setActiveTab("following")}
          sx={{
            fontWeight: 400,
            width: "100%",
            padding: "12px 0",
            backgroundColor: activeTab === "following" ? "#ea3b15" : "transparent",
            color: activeTab === "following" ? "white" : "black",
            cursor: "pointer",
            textAlign: "center",
            transition: "0.3s",
            fontSize: { xs: "13px", sm: "16px" },
            "&:hover": {
              backgroundColor: "#ea3b15",
              color: "white",
            },
          }}
        >
          Following
        </Box>
      </Box>
    </Box>
  );
};

export default FollowSidebar;
