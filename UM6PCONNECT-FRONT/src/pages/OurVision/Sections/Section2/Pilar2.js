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
    number: "50,000+",
    label: "Applications",
    description: "Received annually (2020–2023)",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 36, color: "#fff" }} />,
    number: "42%",
    label: "Female Enrollment",
    description: "Female students at UM6P",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 36, color: "#fff" }} />,
    number: "12%",
    label: "International Students",
    description: "Ratio reached by 2023",
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
          px: { xs: 3, md: 4 },
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
          Education at UM6P is shaped by applied science, immersion, and
          autonomy. Our curriculum integrates classroom instruction with lab
          experimentation, fieldwork, and entrepreneurship exposure. Between
          2020 and 2023:
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
