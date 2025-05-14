import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SchoolIcon from "@mui/icons-material/School";


const data = [
  {
    icon: <FingerprintIcon sx={{ fontSize: 30, color: "#ea3b15" }} />,
    label: "Empowering People",
    description: (
      <>
         We’ve trained over 20,500 individuals through short and executive education programs, equipping leaders across sectors with the tools to drive real-world change.


      </>
    ),

    stat: "20,500+ ",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 30, color: "#ea3b15" }} />,
    label: "Building Continental Bridges",
    description: (
      <>
With 50+ university partnerships across Africa, we’re creating a connected ecosystem of innovation, research, and shared purpose for a thriving continent.

      </>
    ),
    stat: "50+",
  },
  {
    icon: <AcUnitIcon sx={{ fontSize: 30, color: "#ea3b15" }} />,
    label: "Expanding Our Reach",
    description: (
      <>
UM6P has launched 5 campuses across Morocco and a new international hub in France & Canada , bringing education and opportunity closer to the communities we serve — locally and globally.
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
UM6P’s mission goes far beyond the walls of its campuses. We believe that the true measure of a university lies in the lives it transforms — in the ideas that leave the classroom and shape communities.
Vision 2030 strengthens our public mission to serve society, not as a side initiative, but as a central pillar of our identity. Through training programs, policy labs, and regional campuses, we are bridging the gap between knowledge and impact.

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
              <Typography sx={{ fontSize: "20px",color: "#ea3b15", fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#000", lineHeight: 1.8,    textAlign: "justify", 
 }}
              >
                {item.description}
              </Typography>
              <Typography
                sx={{ fontSize: "24px", fontWeight: 600, color: "#ea3b15" }}
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
