import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const TitleSection = ({ title, id, number, borderTop = false }) => {
  return (
<Box
  id={id}
  sx={{
    position: "sticky",
    top: "64px", //  push down under navbar
    zIndex: 10,
    width: "100%",
    backgroundColor: "#1d1b1c",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: { xs: 3, md: 8 },
    py: 4,
    borderBottom: "1px solid #fff",
    ...(borderTop && { borderTop: "1px solid #fff" }),
  }}
>

      <Typography
        sx={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 300,
          fontSize: { xs: "30px", md: "70px" },
          lineHeight: { xs: "44px", md: "59px" },
          color: "#f6f6f6",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 300,
          fontSize: { xs: "40px", md: "90px" },
          lineHeight: "60px",
          color: "#e04c2c",
        }}
      >
        {number}
      </Typography>
    </Box>
  );
};

export default TitleSection;
