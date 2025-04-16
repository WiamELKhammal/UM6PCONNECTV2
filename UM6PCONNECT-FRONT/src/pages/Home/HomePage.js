import React, { useContext } from "react";
import { Box, useMediaQuery, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import AutoLoopingCards from "./AutoLoopingCards";
import QuickLinksCard from "./QuickLinksCard";
import ProfileCard from "./ProfileCard";
import Footer from "./Footer";
import { UserContext } from "../../context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Show only RightSidebar if user is a guest
  if (!user) {
    return (
      <Box sx={{ bgcolor: "#181717", px: 2 }}>
        <RightSidebar />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", bgcolor: "#181717" }}>
      {/* Main Content */}
      <Box sx={{ flex: 2, width: "100%", paddingX: 2 }}>
        <RightSidebar />
      </Box>

      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: isMobile ? "unset" : 1,
          borderLeft: "1px solid #ddd",
          paddingTop: "10px",
          paddingX: 2,
        }}
      >
        <Stack spacing={2}>
          <ProfileCard />
          <Sidebar />
          <AutoLoopingCards />
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
