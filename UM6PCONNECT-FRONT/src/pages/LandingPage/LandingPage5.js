import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import "@fontsource/work-sans/300.css";

const ManifestoQuote = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffff",
        color: "#000",
        fontFamily: "'Work Sans', sans-serif",
        borderLeft: "1px solid #CCC",

      }}
    >
      <Grid container>
        {/* Left Section: Text */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Top: Name + Title Row with internal vertical border */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #CCC",
              height: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRight: "1px solid #CCC",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "30px", fontWeight: 300, textTransform: "uppercase" }}
              >
                HICHAM EL HABTI
              </Typography>
            </Box>
            <Box sx={{ flex: 1, px: 2, py: 1 }}>
              <Typography sx={{ fontSize: "30px", fontWeight: 300 }}>
                PRESIDENT OF UM6P
              </Typography>
            </Box>
          </Box>

          {/* Content Block */}
          <Box sx={{ px: 4, py: 4 }}>


            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: 300,
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              <Box component="span" sx={{ fontWeight: 600, color: "#000" }}>
                UM6P : Where Africa shapes the future.
              </Box>
              <br />
              <br />
              At the University Mohammed VI Polytechnic, we believe Africa holds
              the solutions to the world’s greatest challenges. UM6P is not just a
              university—it’s a movement. A home to 7,229 students, including
              nearly 1,000 PhD candidates, and a vibrant academic community from
              over 40 nationalities, united by one purpose: to transform potential
              into progress.
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
              and inspire the world.
            </Typography>

            {/* Signature */}
            <Typography
              sx={{
                mt: 4,
                fontWeight: 600,
                fontSize: "20px",
                textAlign: "right",
                color: "#000",
              }}
            >
              — Hicham El Habti, President of UM6P
            </Typography>
          </Box>
        </Grid>

        {/* Right Section: Image (Top-Aligned) */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Box
            component="img"
            src="/assets/images/herosection/Photo_Officielle_Président.jpg"
            alt="UM6P President"
            sx={{
              width: "100%",
              objectFit: "cover",
              borderLeft: "1px solid #fff",
              display: "block",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManifestoQuote;
