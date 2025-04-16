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
UM6P defines research excellence not only by publications, but by the application and measurable results. Over 2600 publications were recorded from 2020–2024, with 140 patents filed, and over 200 research projects in progress. The CORE LABs (Genomics, Materials, Water, and AI) serve as interdisciplinary platforms where students, faculty, and partners solve problems collaboratively.</Typography>
      </Box>
    </Box>
  );
};

export default TheWhy;
