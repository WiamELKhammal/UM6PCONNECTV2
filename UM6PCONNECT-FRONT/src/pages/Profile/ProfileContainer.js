import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import Experience from "./Experience/Experience";
import Education from "./Education/Education";
import Projects from "./Projects/Projects";
import LicensesCertifications from "./LicensesCertifications/LicensesCertifications";
import Languages from "./Languages/Languages";
import Tags from "./Tags/Tags";
import SavedList from "../Save/SavedList";
import FollowPage from "../Follow/FollowPage";

const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "following", label: "Following" },
    { id: "saved", label: "Saved List" },
    { id: "tags", label: "Tags" },
  ];

  return (
    <Box sx={{
      width: "90%",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",

    }}>
      <div className="container">
        <ProfileIntro />
        {/* Tabs Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2, ml: 7.25, width: "90%" }}> {/* Shift tabs to the right */}
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTabs-indicator": { display: "none" }, // Hide default underline
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.id}
                label={tab.label}
                value={tab.id}
                sx={{
                  textTransform: "none",
                  fontWeight: "400",
                  px: 3,
                  py: 1.5,
                  backgroundColor: activeTab === tab.id ? "#d84b2b" : "white",
                  color: activeTab === tab.id ? "white" : "black",
                  transition: "0.3s",
                  border: activeTab === tab.id ? "none" : "1px solid #ccc", // Border for non-active tabs
                  borderBottom: activeTab === tab.id ? "none" : "1px solid #ccc", // Prevent bottom double border
                  borderRadius: index === 0 ? "6px 0 0 0" : index === tabs.length - 1 ? "0 6px 0 0" : "0", // Left top corner for first, right top for last
                  "&:hover": {
                    backgroundColor: activeTab === tab.id ? "#d84b2b" : "#f5f5f5",
                  },
                  "&.Mui-selected": {
                    color: "white",
                  },
                }}
              />
            ))}
          </Tabs>

        </Box>

        {/* Dynamic Content Based on Selected Tab */}
        <Box sx={{ mt: 3 }}>
          {activeTab === "profile" && (
            <>
              <Experience />
              <Education />
              <Projects />
              <LicensesCertifications />
              <Languages />
            </>
          )}
          {activeTab === "following" && <FollowPage />}
          {activeTab === "saved" && <SavedList />}
          {activeTab === "tags" && <Tags />}
        </Box>
      </div>
    </Box>
  );
};

export default ProfileContainer;
