import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";

const AcademicGraphPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#000",
        minHeight: "100vh",
        px: { xs: 3, md: 8 },
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        borderLeft: "1px solid #CCC",
      }}
    >


      <Box
        component="img"
        src="/assets/images/herosection/BATIMENT ADMINISTRATIF3.jpg"
        alt="Academic Graph Placeholder"
        sx={{
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          display: "block",
          mx: "auto",

        }}
      />
    </Box>
  );
};

export default AcademicGraphPage;
