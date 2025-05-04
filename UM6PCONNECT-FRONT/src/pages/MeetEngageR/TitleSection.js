import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const TitleSection = ({ title, id, number, borderTop = false }) => {
  return (
    <Box
      id={id}
      sx={{
        position: "sticky",
        top: "50px", // below navbar
        zIndex: 10,
        width: "100%",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, md: 8 },
        py: { xs: 3, md: 4 },
        borderBottom: "1px solid #CCC",
        borderLeft: "1px solid #CCC",
        ...(borderTop && { borderTop: "1px solid #CCC" }),
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 300,
          fontSize: { xs: "22px", sm: "25px", md: "50px" },
          lineHeight: { xs: "36px", sm: "44px", md: "59px" },
          color: "#000",
        }}
      >
        {title}
      </Typography>

      {number !== undefined && (
        <Typography
          sx={{
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 300,
            fontSize: { xs: "32px", sm: "48px", md: "90px" },
            lineHeight: { xs: "40px", sm: "50px", md: "60px" },
            color: "#ea3b15",
          }}
        >
          {number}
        </Typography>
      )}
    </Box>
  );
};

export default TitleSection;
