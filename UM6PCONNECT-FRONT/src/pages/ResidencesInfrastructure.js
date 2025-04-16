import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const ResidencesInfrastructureJS = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#FFF",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px", // ✅ prevents text from going too wide
          px: { xs: 3, md: 4 }, // ✅ small inner padding
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
          UM6P’s campus offers a fully serviced residential environment tailored
          to students’ academic and personal well-being. Residences are equipped
          with shared workspaces, quiet zones, recreational rooms, and
          high-speed connectivity. Students have access to digital libraries,
          makerspaces, experimental farms, and data centers — all within walking
          distance.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResidencesInfrastructureJS;
