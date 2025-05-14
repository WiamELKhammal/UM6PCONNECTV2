import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFF",
        borderLeft: "1px solid #CCC",
        borderButtom: "1px solid #CCC",

        color: "#000",
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
At the heart of this vision lies a shared belief: that Africa’s future will be shaped by its ability to generate knowledge, build talent, create bold solutions, and uplift communities. Vision 2030 brings this belief to life through four foundational pillars.</Typography>
      </Box>
    </Box>
  );
};

export default TheWhy;
