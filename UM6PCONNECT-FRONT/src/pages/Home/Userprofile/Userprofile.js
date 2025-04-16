import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import ProfileIntro from "./ProfileIntro";
import Experience from "./Experience";
import DiscoverWorkUser from "./DiscoverWorkUser";

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "discover", label: "Research Work" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#181717", // 🔥 entire page background
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "0px auto",
          padding: "0 20px",
        }}
      >
        <div className="container">
          <ProfileIntro userId={userId} />

          {/* Tab Navigation */}
          <Box sx={{ mt: 4, ml: 7.25, width: "90%", bgcolor: "#181717" }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#fff", // visible on dark bg
                  height: "3px",
                  borderRadius: 0,
                },
              }}
              sx={{
                borderBottom: "1px solid #444",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "18px",
                  color: "#ccc",
                  px: 2.5,
                  py: 1,
                  minHeight: "unset",
                  fontWeight: 400,
                },
                "& .Mui-selected": {
                  color: "#fff !important",
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
          <Box sx={{ mt: 4, bgcolor: "#181717", pb: 8 }}>
          {activeTab === "profile" && <Experience userId={userId} />}
            {activeTab === "discover" && <DiscoverWorkUser userId={userId} />}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default UserProfile;
