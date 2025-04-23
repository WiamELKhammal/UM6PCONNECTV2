import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const LandingPage4 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#000",
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 10 },
        fontFamily: "'Work Sans', sans-serif",
        borderLeft: "1px solid #CCC",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Left: Text Content */}
        <Box sx={{ flex: 1, minHeight: { md: 480 } }}>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "20px", md: "25px" },
              fontWeight: 300,
              lineHeight: 1.7,
              textAlign: "justify",
              fontFamily: "'Work Sans', sans-serif",
              color: "#000",
            }}
          >
            At UM6P, we believe that meaningful progress begins with meaningful
            connection—between disciplines, people, and purpose. As a university
            rooted in research and driven by innovation, we are shaping a new
            generation of leaders equipped to turn knowledge into real-world
            impact.
            <br />
            <br />
            <Box component="span" sx={{ fontWeight: 600, color: "#000" }}>
              UM6P Connect
            </Box>{" "}
            is the digital expression of that mission. More than a platform,
            it’s a living space where education, research, and entrepreneurship
            intersect. A space where students chart their futures, researchers
            expand their reach, and collaboration becomes a catalyst for change.
            <br />
            <br />
            This is where Africa’s most promising minds come together—to
            connect, to grow, and to lead.
          </Typography>
        </Box>

        {/* Right: Image (unchanged) */}
        <Box
          component="img"
          src="/assets/images/herosection/_DPH1262-web.jpg"
          alt="UM6P Connect"
          sx={{
            height: "auto",
            maxHeight: 480,
            width: "auto",
            maxWidth: 350,
            alignSelf: { xs: "center", md: "flex-start" },
            mt: { xs: 3, md: 0 },
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage4;
