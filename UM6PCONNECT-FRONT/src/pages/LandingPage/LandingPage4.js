import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const LandingPage4 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#f6f6f6",
        py: 10,
        px: { xs: 3, md: 10 },
        fontFamily: "'Work Sans', sans-serif",
        borderBottom: "1px solid #fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Left: Text Content */}
        <Box sx={{ flex: 1 }}>
          {/* Title with white square */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
 
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: 600,
                color:"#FFF",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              Step into the movement
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 300,
              lineHeight: 1.7,
              textAlign: "justify",
              maxWidth: "900px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            At UM6P, we believe that meaningful progress begins with meaningful
            connection—between disciplines, people, and purpose. As a university
            rooted in research and driven by innovation, we are shaping a new
            generation of leaders equipped to turn knowledge into real-world
            impact.
            <br />
            <br />
            <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
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

        {/* Right: Image */}
        <Box
          component="img"
          src="/assets/images/herosection/UM6P.png"
          alt="UM6P Connect"
          sx={{
            height: { xs: 200, md: 555 },
            width: "auto",
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage4;
