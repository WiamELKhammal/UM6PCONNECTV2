import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import "@fontsource/work-sans/300.css";

const ManifestoQuote = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
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
          {/* Top Bar: Name + Title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderBottom: "1px solid #CCC",
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRight: { md: "1px solid #CCC" },
                borderBottom: { xs: "1px solid #CCC", md: "none" },
                px: { xs: 2, md: 2 },
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "30px" },
                  fontWeight: 300,
                  textTransform: "uppercase",
                }}
              >
                HICHAM EL HABTI
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                px: { xs: 2, md: 2 },
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "30px" },
                  fontWeight: 300,
                }}
              >
                PRESIDENT OF UM6P
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ px: { xs: 3, md: 3 }, py: { xs: 4, md: 6 } }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "25px" },
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
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                textAlign: "right",
                color: "#000",
              }}
            >
              — Hicham El Habti, President of UM6P
            </Typography>
          </Box>
        </Grid>

        {/* Right Section: Image */}
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
              width: "900px",
              height: "100%",
              objectFit: "cover",
              borderLeft: { md: "1px solid #fff" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManifestoQuote;
