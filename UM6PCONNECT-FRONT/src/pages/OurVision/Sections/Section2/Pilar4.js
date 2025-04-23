import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SchoolIcon from "@mui/icons-material/School";


const data = [
  {
    icon: <FingerprintIcon sx={{ fontSize: 30, color: "#e04c2c" }} />,
    label: "Executives Trained",
    description: (
      <>
        Short & executive programs<br />
         Trained 20,500+ individuals in executive or short programs.

      </>
    ),

    stat: "20,500+ ",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 30, color: "#e04c2c" }} />,
    label: "University Partnerships",
    description: (
      <>
        Across the African continent<br />
        Built partnerships with 50+ African universities.

      </>
    ),
    stat: "50+",
  },
  {
    icon: <AcUnitIcon sx={{ fontSize: 30, color: "#e04c2c" }} />,
    label: "Campuses",
    description: (
      <>
          5 in Morocco, 1 in Paris<br />
          Opened campuses in 5 Moroccan cities and launched an international hub in Paris.
      </>
    ),
    stat: "6",
  },



];

const StatsSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#fff",
        px: { xs: 3, md: 10 },
        py: 12,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "26px", md: "32px" },
          fontWeight: 400,
          textAlign: "left",
          mb: 8,
          color: "#000",
        }}
      >
UM6P’s work extends beyond academia into real communities. Through training, policy labs, and regional campuses, the university:

      </Typography>

      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: "20px",color: "#e04c2c", fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#000", lineHeight: 1.8 }}
              >
                {item.description}
              </Typography>
              <Typography
                sx={{ fontSize: "24px", fontWeight: 600, color: "#e04c2c" }}
              >
                {item.stat}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
