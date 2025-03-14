import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import AutoLoopingCards from "./AutoLoopingCards"; // Import the new component
import Tags from "./Tags"; // Import the new component

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", gap: 2, p: 2, bgcolor: "#fff",paddingTop: "90px"  }}>
      {/* Sidebar + AutoLoopingCards */}
      {/*  */}

      {/* Main Content */}
      <Box sx={{ flex: 2 }}>
      <RightSidebar />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Sidebar />
        <AutoLoopingCards />
      </Box>

      {/* Right Sidebar */}
    </Box>
  );
};

export default HomePage;
