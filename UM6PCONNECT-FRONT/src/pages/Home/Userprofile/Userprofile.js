import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import ProfileIntro from "./ProfileIntro";
import Experience from "./Experience";

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    // Future tabs:
    // { id: "discover", label: "My Work" },
    // { id: "tags", label: "Field of Work" },
  ];

  return (
    <Box
      sx={{
        width: "90%",
        margin: "20px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
      }}
    >
      <div className="container">
        <ProfileIntro userId={userId} />

        {/* Tab Navigation */}
        <Box sx={{ mt: 4, ml: 7.25, width: "90%" }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000",
                height: "3px",
                borderRadius: 0,
              },
            }}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "18px",
                color: "#888",
                px: 2.5,
                py: 1,
                minHeight: "unset",
                fontWeight: 400,
              },
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: 400,
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
        <Box sx={{ mt: 4 }}>
          {activeTab === "profile" && <Experience userId={userId} />}
          {/* {activeTab === "discover" && <DiscoverWork userId={userId} />} */}
          {/* {activeTab === "tags" && <Tags userId={userId} />} */}
        </Box>
      </div>
    </Box>
  );
};

export default UserProfile;
