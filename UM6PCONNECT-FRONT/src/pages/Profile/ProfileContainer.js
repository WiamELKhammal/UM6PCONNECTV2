import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Experience from "./Experience/Experience";
import DiscoverWork from "./Projects/DiscoverWork";
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
        width: "100%",
        backgroundColor: "#181717",
        minHeight: "100vh",
        pb: 8,
        fontFamily: "'Work Sans', sans-serif", // ✅ Apply globally
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "0px auto",
        }}
      >
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
                backgroundColor: "#fff",
                height: "3px",
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
        <Box sx={{ mt: 4 }}>
          {activeTab === "profile" && <Experience />}
          {activeTab === "discover" && <DiscoverWork />}
          {activeTab === "following" && <FollowPage />}
          {activeTab === "saved" && <SavedList />}
          {activeTab === "tags" && <Tags />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileContainer;
