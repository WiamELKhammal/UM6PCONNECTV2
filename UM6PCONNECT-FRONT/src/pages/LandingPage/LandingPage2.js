import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ProgressHero = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #CCC",
        borderLeft: "1px solid #CCC",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      {/* Dynamically Sized Image */}
      <Box
        component="img"
        src="/assets/images/herosection/_E1A6457.JPG"
        alt="UM6P Hero"
        sx={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          objectFit: "cover",
          objectPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      />

      {/* Top-left Title */}
      <Box
        sx={{
          position: "absolute",
          top: 55,
          left: 24,
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: "28px",
            fontWeight: 300,
          }}
        >
          UM6P CONNECT
        </Typography>
      </Box>

      {/* Slogan */}
      <Box
        sx={{
          position: "absolute",
          left: 24,
          bottom: 60,
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: 300,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          BUILT TO CONNECT,
        </Typography>
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: 300,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          DESIGNED TO EMPOWER
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressHero;
