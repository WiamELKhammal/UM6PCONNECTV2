import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";


const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#FFF",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
        borderLeft: "1px solid #CCC",
        borderButtom: "1px solid #CCC",
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
            color: "#000",


          }}
        >
We believe in science that matters — research that does not remain locked in labs, but lives in the world. At UM6P, research is a catalyst for transformation. Vision 2030 commits to:
Empowering scientific freedom to pursue breakthrough discoveries
Fostering collaboration across disciplines and labs
Telling the story of our science and its impact on African communities
This is not about following global trends — it’s about setting them.</Typography>
      </Box>
    </Box>
  );
};

export default TheWhy;
