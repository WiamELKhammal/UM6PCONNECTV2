import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const ProgressHero = () => {
  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        position: "relative",
        top: 0,
        left: 0,
        background: "#000",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          backgroundImage: "url('/assets/images/herosection/Crowd Wisdom_Vision 2030 PAD50[1].JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          borderBottom:"1px solid #fff"
        }}
      >
        {/* Dark overlay for contrast */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />

        {/* Top-left Heading */}
        <Box
          sx={{
            position: "absolute",
            top: 55,
            left: { xs: 24, md: 72 },
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: { xs: "32px", md: "45px" },
              fontWeight: 300,
            }}
          >
            OUR VISION 2030
          </Typography>
        </Box>

        {/* Main Hero Text */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 24, md: 72 },
            bottom: { xs: 80, md: 120 },
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "38px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1,
            }}
          >
            From Ambition to Structure:  
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "38px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1,
            }}
          >
            UM6P’s Long-Term Mission
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressHero;
