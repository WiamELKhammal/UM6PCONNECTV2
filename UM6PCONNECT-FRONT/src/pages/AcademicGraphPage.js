import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";

const AcademicGraphPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        borderLeft: "1px solid #CCC",

        color: "#000",
        minHeight: "100vh",
        px: { xs: 3, md: 8 },
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "40px" },
          fontWeight: 400,
          mb: 6,
          textAlign: "center",
                  color: "#000",

        }}
      >
        Top 6 Academic Programs by Application Volume
      </Typography>

      <Box
        component="img"
        src="/assets/images/herosection/visual_selection_1.png"
        alt="Academic Graph Placeholder"
        sx={{
          width: { xs: "100%", md: "120%" }, // make it larger on desktop
          maxWidth: "1400px",               // optional: set upper limit
          height: "auto",
          display: "block",
          mx: "auto",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default AcademicGraphPage;
