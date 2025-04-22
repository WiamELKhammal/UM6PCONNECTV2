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
At UM6P, learning is immersive, hands-on, and purpose-driven. Students don’t just attend classes—they build, experiment, and solve real-world problems from day one. This model is drawing unprecedented attention: as of March 2025, over 163,000 applications have been recorded—a 26% growth in just one month. With applicants from 20+ countries, from Casablanca to Cotonou and Rabat to Rwanda, UM6P is fast becoming a magnet for top talent across Africa and beyond. Demand is soaring for programs in Computer Science, Medicine, Architecture, and Hospitality Management, particularly in English. Behind the numbers is a growing, global, and gender-diverse community—ready to lead where it matters most.

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
