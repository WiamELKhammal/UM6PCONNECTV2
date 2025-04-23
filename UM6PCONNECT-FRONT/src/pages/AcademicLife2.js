import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";

const AcademicLife = () => {
  return (
    <Box
      id="academic"
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        borderLeft: "1px solid #CCC",
        backgroundColor: "#FFF",
        color: "#000",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Text Block */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: { xs: "28px", sm: "30px", md: "34px" },
              color: "#000",
              textAlign: "justify",
            }}
          >
            At UM6P, learning is immersive, hands-on, and purpose-driven.
            Students don’t just attend classes—they build, experiment, and solve
            real-world problems from day one. This model is drawing unprecedented
            attention: as of March 2025, over 163,000 applications have been
            recorded—a 26% growth in just one month. With applicants from 20+
            countries, from Casablanca to Cotonou and Rabat to Rwanda, UM6P is
            fast becoming a magnet for top talent across Africa and beyond.
            Demand is soaring for programs in Computer Science, Medicine,
            Architecture, and Hospitality Management, particularly in English.
            Behind the numbers is a growing, global, and gender-diverse
            community—ready to lead where it matters most.
          </Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src="/assets/images/herosection/IMG_3438[1].png"
          alt="Academic Visual"
          sx={{
            width: { xs: "100%", sm: "100%", md: "700px", lg: "750px" },
            height: "auto",
            borderRadius: "8px",
            flexShrink: 0,
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default AcademicLife;
