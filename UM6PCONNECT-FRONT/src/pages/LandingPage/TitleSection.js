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
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: { xs: 3, md: 8 },
    py: 4,
    borderBottom: "1px solid #CCC",
    borderLeft: "1px solid #CCC",

    ...(borderTop && { borderTop: "1px solid #CCC" }),
  }}
>

      <Typography
        sx={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 300,
          fontSize: { xs: "2px", md: "60px" },
          lineHeight: { xs: "44px", md: "59px" },
          color: "#000",
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
