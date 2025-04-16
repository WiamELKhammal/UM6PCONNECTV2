import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/600.css";

const stats = [
  {
    icon: <GroupsIcon sx={{ fontSize: 36, color: "#fff" }} />,
    number: "20,500+",
    label: "Executives Trained",
    description: "Short & executive programs",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 36, color: "#fff" }} />,
    number: "50+",
    label: "University Partnerships",
    description: "Across the African continent",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 36, color: "#fff" }} />,
    number: "6",
    label: "Campuses",
    description: "5 in Morocco, 1 in Paris",
  },
];

const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#FFF",
        py: 10,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      {/* Paragraph */}
      <Box
        sx={{
          maxWidth: "1000px",
          px: { xs: 0, md: 0 },
          mx: "auto",
          mb: 8,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "30px",
            lineHeight: "36px",
            textAlign: "justify",
            fontFamily: "'Work Sans', sans-serif",

          }}
        >
          UM6P’s work extends beyond academia into real communities. Through
          training, policy labs, and regional campuses, the university:{" "}
          <br />
          •{" "}
          <strong style={{ fontWeight: 500, color: "#fff" }}>
            Trained 20,500+
          </strong>{" "}
          individuals in executive or short programs
          <br />
          •{" "}
          <strong style={{ fontWeight: 600, color: "#fff" }}>
            Built partnerships with 50+
          </strong>{" "}
          African universities
          <br />
          •{" "}
          <strong style={{ fontWeight: 600, color: "#fff" }}>
            Opened campuses in 5 Moroccan cities
          </strong>{" "}
          and launched an international hub in{" "}
          <strong style={{ fontWeight: 600, color: "#fff" }}>Paris </strong>
        </Typography>
      </Box>

      {/* Stats Section with bottom border */}
      <Box sx={{ px: { xs: 3, md: 8 }, borderBottom: "1px solid #fff", pb: 10 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  backgroundColor: "#fff",
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderLeft: "5px solid #e04c2c",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.02)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#e04c2c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {stat.number}
                  </Typography>
                  <Typography variant="subtitle2">{stat.label}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                    {stat.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TheWhy;
