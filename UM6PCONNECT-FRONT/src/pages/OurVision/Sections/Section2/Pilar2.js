import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/600.css";

const stats = [
  {
    icon: <GroupsIcon sx={{ fontSize: 50, color: "#fff" }} />,
    number: "50,000+",
    label: "Applications",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 50, color: "#fff" }} />,
    number: "42%",
    label: "Female Enrollment",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 50, color: "#fff" }} />,
    number: "12%",
    label: "International Students",
  },
];

const TheWhy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        py: 10,
        px: { xs: 3, md: 8 },
        fontFamily: "'Work Sans', sans-serif",
        borderLeft: "1px solid #CCC",

      }}
    >
      <Grid container spacing={8} alignItems="center">
        {/* LEFT TEXT */}
        <Grid item xs={12} md={7}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "30px",
              lineHeight: "36px",
              textAlign: "justify",
              color: "#000",
            }}
          >
Education at UM6P is not a passive experience; it's a journey of action, reflection, and leadership. Vision 2030 redefines what it means to learn, by prioritizing:
Experiential learning and 'learning by doing'
Leadership development rooted in collaboration
Student well-being as a foundation for excellence
We are shaping leaders who don’t just graduate with degrees — they graduate with purpose.
          </Typography>
        </Grid>

        {/* RIGHT STATS */}
        <Grid item xs={12} md={5}>
          <Box display="flex" flexDirection="column" gap={4}>
            {stats.map((stat, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#ea3b15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #CCC",
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "40px", fontWeight: 600 }}>
                    {stat.number}
                  </Typography>
                  <Typography sx={{ fontSize: "30px", fontWeight: 400 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TheWhy;
