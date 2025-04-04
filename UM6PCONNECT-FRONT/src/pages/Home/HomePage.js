import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import AutoLoopingCards from "./AutoLoopingCards";
import QuickLinksCard from "./QuickLinksCard";
import ProfileCard from "./ProfileCard";
import Footer from "./Footer";
import { Stack } from "@mui/material";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", bgcolor: "#fff" }}>
      
      {/* Main Content */}
      <Box sx={{ flex: 2, width: "100%", paddingTop: "90px", paddingX: 2 }}>
        <RightSidebar />
      </Box>

      {/* Left Section with border reaching top */}
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    flex: isMobile ? "unset" : 1,
    borderLeft: "1px solid #ddd",
    paddingTop: "90px",
    paddingX: 2,
  }}
>
  <Stack spacing={2}>
    <ProfileCard />
    <Sidebar />
    <AutoLoopingCards />
    <QuickLinksCard />
    <Footer />
  </Stack>
</Box>
    </Box>
  );
};

export default HomePage;
