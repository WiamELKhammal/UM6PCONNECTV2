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
        backgroundColor: "#FFF",
        minHeight: "100vh",
        pb: 8,
        fontFamily: "'Work Sans', sans-serif",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", md: "90%" },
          margin: "0 auto",
        }}
      >
        <ProfileIntro />

        {/* Tab Navigation */}
        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            ml: { xs: 0, md: 7.25 },
            width: { xs: "100%", md: "90%" },
          }}
        >
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
                fontSize: { xs: "14px", md: "18px" },
                color: "#CCC",
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 1, md: 1.5 },
                minHeight: "unset",
                fontWeight: 400,
              },
              "& .Mui-selected": {
                color: "#000 !important",
              },
              "& .MuiTabs-scrollButtons": {
                display: { xs: "flex", md: "none" },
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab disableRipple key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mt: { xs: 2, md: 4 } }}>
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
