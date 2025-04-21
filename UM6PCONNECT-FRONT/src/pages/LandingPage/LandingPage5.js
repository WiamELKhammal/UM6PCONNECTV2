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
              fontSize: "22px",
              fontWeight: 300,
              lineHeight: 1.7,
              textAlign: "justify",
              maxWidth: "900px",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            “UM6P: Where Africa shapes the future. At the University Mohammed VI
            Polytechnic, we believe Africa holds the solutions to the world’s
            greatest challenges. UM6P is not just a university—it’s a movement.
            A home to 7,229 students, including nearly 1,000 PhD candidates, and
            a vibrant academic community from over 40 nationalities, united by
            one purpose: to transform potential into progress.
            <br />
            <br />
            Here, research drives innovation. Education fuels entrepreneurship.
            And ambition becomes impact. Rooted in Africa, connected to the
            world, UM6P empowers a generation to rise—bold, skilled, and ready
            to lead. From green energy to smart cities, from sustainable farming
            to digital frontiers, our students are shaping a better tomorrow,
            today.
            <br />
            <br />
            Dare to dream. Dare to build. Join us—let’s shape Africa’s future,
            and inspire the world.”
          </Typography>

          <Typography
            sx={{
              mt: 4,
              fontWeight: 600,
              fontSize: "20px",
              textAlign: "right",
              color: "#FFF",

            }}
          >
            — Hicham El Habti, President of UM6P
          </Typography>
        </Box>

        {/* Right: UM6P Square Image */}
        <Box
          component="img"
          src="/assets/images/herosection/Photo_Officielle_Président.jpg"
          alt="UM6P President"
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
