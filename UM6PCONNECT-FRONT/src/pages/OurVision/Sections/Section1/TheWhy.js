import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#FFF",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px", // ✅ prevents text from going too wide
          px: { xs: 3, md: 4 }, // ✅ small inner padding
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "30px",
            lineHeight: "36px",
            textAlign: "justify",
            fontFamily: "'Work Sans', sans-serif",

          }}
        >
Vision 2030 was initiated to ensure that UM6P’s rapid growth stayed aligned with its foundational purpose: impact at scale. The university engaged over 1,000 community members through structured workshops, stakeholder dialogues, and co-creation labs. The goal: translate ambition into a shared, measurable pathway for the decade ahead.        </Typography>
      </Box>
    </Box>
  );
};

export default TheWhy;
