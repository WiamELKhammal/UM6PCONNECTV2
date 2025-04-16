import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#FFF",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #fff",
      }}
    >
      {/* 🔴 Floating Cubes */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 50,
          height: 50,
          backgroundColor: "#e04c2c",
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
          backgroundColor: "#e04c2c",
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
          backgroundColor: "#e04c2c",
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

          }}
        >
          UM6P embeds innovation and venture creation within its academic and
          research model. Through StartGate, the university has supported{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            530+
          </Box>{" "}
          project holders and startups since 2020. The top{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            25
          </Box>{" "}
          startups have raised over{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            $20.6M
          </Box>
          , with a collective valuation surpassing{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            $200M
          </Box>
          . Students represent{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            50%
          </Box>{" "}
          of founders, and{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            14%
          </Box>{" "}
          are faculty-led ventures.
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
