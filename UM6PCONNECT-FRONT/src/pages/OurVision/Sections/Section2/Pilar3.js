import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#000",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        borderLeft: "1px solid #CCC",
        borderButtom: "1px solid #CCC",      }}
    >
      {/* 🔴 Floating Cubes */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 50,
          height: 50,
          backgroundColor: "#ea3b15",
          opacity: 0.15,
          transform: "rotate(20deg)",
          animation: "float1 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 60,
          right: 80,
          width: 40,
          height: 40,
          backgroundColor: "#ea3b15",
          opacity: 0.2,
          transform: "rotate(-20deg)",
          animation: "float2 8s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 150,
          left: "50%",
          width: 35,
          height: 35,
          backgroundColor: "#ea3b15",
          opacity: 0.15,
          transform: "rotate(12deg)",
          animation: "float3 7s ease-in-out infinite",
        }}
      />

      {/* 🧠 Paragraph */}
      <Box
        sx={{
          maxWidth: "1000px",
          px: { xs: 3, md: 4 },
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "30px",
            lineHeight: "36px",
            textAlign: "justify",
            fontFamily: "'Work Sans', sans-serif",
            color: "#000"

          }}
        >
Africa needs builders, not just thinkers. Vision 2030 fuels a new generation of entrepreneurs who turn problems into opportunities and ideas into ventures. Our priorities:
Igniting entrepreneurial mindsets across all disciplines
Creating ecosystems where innovation thrives
Supporting Moroccan-led solutions for African challenges
Entrepreneurship is not an option — it's our engine for impact.
        </Typography>
      </Box>

      {/* 🔁 Floating Animation Keyframes */}
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0) rotate(20deg); }
          50% { transform: translateY(-20px) rotate(20deg); }
          100% { transform: translateY(0) rotate(20deg); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) rotate(-20deg); }
          50% { transform: translateY(-15px) rotate(-20deg); }
          100% { transform: translateY(0) rotate(-20deg); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(12deg); }
          100% { transform: translateY(0) rotate(12deg); }
        }
      `}</style>
    </Box>
  );
};

export default TheWhy;
