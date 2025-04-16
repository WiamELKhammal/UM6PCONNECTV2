import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";

const AcademicGraphPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#f6f6f6",
        minHeight: "100vh",
        px: { xs: 3, md: 8 },
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "36px" },
          fontWeight: 400,
          mb: 6,
          textAlign: "center", // ✅ CENTER TITLE
        }}
      >
         Top 6 Academic Programs by Application Volume 
      </Typography>

      <Box
        component="img"
        src="/assets/images/herosection/hero.png"
        alt="Academic Graph Placeholder"
        sx={{
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          display: "block",
          mx: "auto",
          border: "1px solid #444",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default AcademicGraphPage;
