import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Experience from "./Experience/Experience";
import DiscoverWork from "./Projects/DiscoverWork"; // 🔥 your research component
import Tags from "./Tags/Tags";
import SavedList from "../Save/SavedList";
import FollowPage from "../Follow/FollowPage";

const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "discover", label: "My Work" },
    { id: "following", label: "Following" },
    { id: "saved", label: "Saved List" },
    { id: "tags", label: "Field of work" },
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
        <ProfileIntro />

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
                fontWeight: 400, // No bold
              },
              "& .MuiTabs-scrollButtons": {
                display: "none",
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                disableRipple
                key={tab.id}
                label={tab.label}
                value={tab.id}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mt: 4 }}>
          {activeTab === "profile" && <Experience />}
          {activeTab === "discover" && <DiscoverWork />} {/* ✅ Your research section */}
          {activeTab === "following" && <FollowPage />}
          {activeTab === "saved" && <SavedList />}
          {activeTab === "tags" && <Tags />}
        </Box>
      </div>
    </Box>
  );
};

export default ProfileContainer;
