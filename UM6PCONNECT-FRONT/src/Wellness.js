import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const Wellness = () => {
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
UM6P’s sport and wellness program integrates physical health into daily academic life. The campus features a full gym, a semi-Olympic swimming pool, outdoor football and basketball courts, and dedicated spaces for yoga, martial arts, and intramural sports. Mental health support and routine medical care are available on-site.
        </Typography>
      </Box>
    </Box>
  );
};

export default Wellness;
