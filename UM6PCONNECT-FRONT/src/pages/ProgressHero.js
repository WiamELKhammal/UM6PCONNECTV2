import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const ProgressHero = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        top: 0,
        left: 0,
        background: "#000",
        zIndex: 999,
        overflow: "hidden", // ensure no scrollbars
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: "url('/assets/images/herosection/HERO.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          borderLeft: "1px solid #CCC",
          borderRight: "1px solid #CCC",
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
            top: { xs: 32, md: 55 },
            left: { xs: 20, md: 72 },
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: { xs: "24px", sm: "32px", md: "45px" },
              fontWeight: 300,
            }}
          >
            STUDY AND LIVE AT UM6P
          </Typography>
        </Box>

        {/* Main Hero Text */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 20, md: 72 },
            bottom: { xs: 60, md: 120 },
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1, md: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "34px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.1,
            }}
          >
            A CAMPUS BUILT FOR LEARNING,
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "34px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.1,
            }}
          >
            DESIGNED FOR IMPACT.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressHero;
