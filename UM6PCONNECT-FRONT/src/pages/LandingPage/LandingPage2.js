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
        background: "#000",
        zIndex: 999,
        borderBottom: "1px solid #CCC",
        borderLeft: "1px solid #CCC",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          backgroundImage: "url('/assets/images/herosection/_E1A6457.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Overlay */}
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
            top: { xs: 30, md: 55 },
            left: { xs: 16, sm: 24, md: 72 },
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: { xs: "24px", sm: "30px", md: "45px" },
              fontWeight: 300,
            }}
          >
            UM6P CONNECT
          </Typography>
        </Box>

        {/* Main Hero Text */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 16, sm: 24, md: 72 },
            bottom: { xs: 50, sm: 70, md: 120 },
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "26px", sm: "32px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.1,
            }}
          >
            BUILT TO CONNECT,
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "26px", sm: "32px", md: "64px" },
              fontWeight: 300,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.1,
            }}
          >
            DESIGNED TO EMPOWER
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressHero;
