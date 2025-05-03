import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileIntro from "./ProfileIntro";
import Experience from "./Experience";
import DiscoverWorkUser from "./DiscoverWorkUser";

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "discover", label: "Research Work" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#FFF",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 10px" : "0 20px",
        }}
      >
        <div className="container">
          <ProfileIntro userId={userId} />

          {/* Tab Navigation */}
          <Box sx={{ mt: 4, px: isMobile ? 2 : 7, width: "100%", bgcolor: "#FFF" }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#fff",
                  height: "3px",
                  borderRadius: 0,
                },
              }}
              sx={{
                borderBottom: "1px solid #444",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: isMobile ? "16px" : "18px",
                  color: "#CCC",
                  px: 2,
                  py: 1,
                  minHeight: "unset",
                  fontWeight: 400,
                },
                "& .Mui-selected": {
                  color: "#000 !important",
                },
                "& .MuiTabs-scrollButtons": {
                  display: "none",
                },
              }}
            >
              {tabs.map((tab) => (
                <Tab disableRipple key={tab.id} label={tab.label} value={tab.id} />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mt: 4, bgcolor: "#FFF", pb: 8 }}>
            {activeTab === "profile" && <Experience userId={userId} />}
            {activeTab === "discover" && <DiscoverWorkUser userId={userId} />}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default UserProfile;
