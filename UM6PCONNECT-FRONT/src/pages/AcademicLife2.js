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
          alignItems: { xs: "flex-start", md: "center" }, // ✅ center image vertically
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Text Left */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "30px",
              lineHeight: "36px",
              color: "#000",
              textAlign: "justify",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            At UM6P, learning is immersive, hands-on, and purpose-driven. Students
            don’t just attend classes—they build, experiment, and solve real-world
            problems from day one. This model is drawing unprecedented attention: as
            of March 2025, over 163,000 applications have been recorded—a 26% growth
            in just one month. With applicants from 20+ countries, from Casablanca
            to Cotonou and Rabat to Rwanda, UM6P is fast becoming a magnet for top
            talent across Africa and beyond. Demand is soaring for programs in
            Computer Science, Medicine, Architecture, and Hospitality Management,
            particularly in English. Behind the numbers is a growing, global, and
            gender-diverse community—ready to lead where it matters most.
          </Typography>
        </Box>

        {/* Image Right, Centered Vertically */}
        <Box
          component="img"
          src="/assets/images/herosection/visual_selection_2.png"
          alt="Academic Visual"
          sx={{
            width: { xs: "100%", md: "600px" },
            height: "auto",
            borderRadius: "8px",
            alignSelf: { xs: "center", md: "center" }, // ✅ for safe centering
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default AcademicLife;
