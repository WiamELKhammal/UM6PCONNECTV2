import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";

const AcademicGraphPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        borderLeft: "1px solid #CCC",
        color: "#000",
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        fontFamily: "'Work Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "28px", md: "36px", lg: "40px" },
          fontWeight: 400,
          mb: { xs: 4, md: 6 },
          textAlign: "center",
          color: "#000",
        }}
      >
        Top 6 Academic Programs by Application Volume
      </Typography>

      <Box
        component="img"
        src="/assets/images/herosection/visual_selection_1.png"
        alt="Academic Graph"
        sx={{
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          display: "block",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default AcademicGraphPage;
