import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import NorthIcon from "@mui/icons-material/North";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/300.css";

const programs = [
  { name: "Ingénieur Informatique", count: 17728 },
  { name: "Doctorate in Medicine", count: 16340 },
  { name: "Architecture (Bac+6)", count: 16563 },
  { name: "Hospitality Business (100% English)", count: 13607 },
];

const AcademicLife = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Box
      id="academic"
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        backgroundColor: "#1d1b1c",
        color: "#f6f6f6",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      {/* Paragraph */}
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: "36px",
          color: "#FFF",
          maxWidth: "900px",
          ml: "auto",
          mr: 0,
          textAlign: "justify",
          mb: 6,
        }}
      >
        UM6P’s academic model is built on experiential learning and scientific
        immersion. Students don’t just attend lectures — they work in research
        labs, design policy models, and prototype hardware. The university
        attracted{" "}
        <Box component="span" sx={{ color: "#FFF", fontWeight: 600 }}>
          129,874
        </Box>{" "}
        applications in 2025, a{" "}
        <Box component="span" sx={{ color: "#FFF", fontWeight: 600 }}>
          273%
        </Box>{" "}
        increase vs. the previous year. More than{" "}
        <Box component="span" sx={{ color: "#FFF", fontWeight: 600 }}>
          4,124 international applicants
        </Box>{" "}
        from over 40 countries joined the ecosystem, reflecting UM6P’s African
        and global footprint.
      </Typography>

      {/* Section Title */}
      <Typography
        sx={{
          fontSize: { xs: "32px", md: "40px" },
          fontWeight: 300,
          mb: 4,
        }}
      >
        Programs in Demand :
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={4} ref={ref}>
        {programs.map((program, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                backgroundColor: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: "6px solid #e04c2c",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderLeft: "6px solid #ff4a1c",
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  mb: 2,
                  color: "#111",
                }}
              >
                {program.name}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{ mt: 2 }}
              >
                <Box
                  sx={{
                    backgroundColor: "#e04c2c",
                    borderRadius: "8px",
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NorthIcon sx={{ fontSize: 28, color: "#fff" }} />
                </Box>

                <Typography sx={{ fontSize: "48px", fontWeight: 600 }}>
                  {inView && (
                    <CountUp
                      start={0}
                      end={program.count}
                      duration={1.5}
                      separator=","
                    />
                  )}
                  +
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AcademicLife;
