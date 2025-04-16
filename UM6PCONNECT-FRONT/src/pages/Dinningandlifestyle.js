import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const Dinningandlifestyle = () => {
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
The campus includes multiple food courts, local cafés, and themed restaurants catering to a multicultural student population. All dining facilities operate under sustainability protocols, with waste tracking and healthy menus. Food support is included in most scholarship packages — over 387 students were supported with full scholarships in 2023, representing a 69% coverage rate.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dinningandlifestyle;
