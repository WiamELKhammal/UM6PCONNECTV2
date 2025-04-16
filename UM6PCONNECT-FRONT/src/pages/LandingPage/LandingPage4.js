import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/work-sans/300.css";

const ManifestoQuote = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#f6f6f6",
        py: 10,
        px: { xs: 3, md: 10 },
        fontFamily: "'Work Sans', sans-serif",
        borderBottom: "1px solid #fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Left: Text Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "36px" },
              fontWeight: 600,
              mb: 4,
              fontFamily: "'Work Sans', sans-serif",
              borderLeft: "5px solid #ea3b15",
              pl: 2,
            }}
          >
            Empowering Minds for a Sustainable Africa
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.7,
              textAlign: "justify",
              maxWidth: "900px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            “At Mohammed VI Polytechnic University (UM6P), we believe that the
            key to Africa's sustainable development lies in empowering its
            brightest minds. Our mission is to bridge the gap between
            theoretical knowledge and practical application, fostering an
            environment where innovation thrives. Through cutting-edge research,
            dynamic education programs, and entrepreneurial initiatives, we
            address the continent's most pressing challenges.
            <br />
            <br />
            UM6P CONNECT serves as your gateway to this vibrant ecosystem —
            inviting researchers, students, policymakers, and entrepreneurs to
            collaborate and drive meaningful change across Africa.”
          </Typography>
        </Box>

        {/* Right: UM6P Square Image */}
        <Box
          component="img"
          src="/assets/images/herosection/UM6P.png" // ← replace with your actual path
          alt="UM6P Square Vertical"
          sx={{
            height: { xs: 200, md: 555 },
            width: "auto",
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default ManifestoQuote;
