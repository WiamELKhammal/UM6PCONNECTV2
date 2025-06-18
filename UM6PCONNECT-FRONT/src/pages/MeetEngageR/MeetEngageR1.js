import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "@fontsource/work-sans/300.css";

const MeetEngageR1 = () => {
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
          backgroundImage: "url('/assets/images/herosection/ACA4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          borderBottom: "1px solid #fff",
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
            OUR FIELDS OF WORK  
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
            WHERE SCIENCE
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
            MEETS URGENCY
          </Typography>
        </Box>

        {/* Connect with Us Button - Positioned on same line, right-aligned */}
        <Button
  component="a"
  href="mailto:-email@UM6P.MA"
  sx={{
    position: "absolute",
    bottom: { xs: 80, md: 120 },
    right: { xs: 24, md: 72 },
    zIndex: 3,
    backgroundColor: "#ea3b15",
    color: "#FFF",
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 300,
    fontSize: { xs: "18px", md: "22px" }, // Increased font size
    padding: { xs: "14px 28px", md: "18px 36px" }, // Bigger padding
    boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ea3b15",
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(255,255,255,0.4)",
    },
  }}
>
  Connect with Us
</Button>
      </Box>
    </Box>
  );
};

export default MeetEngageR1;
