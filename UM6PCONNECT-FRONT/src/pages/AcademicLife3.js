import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const cardData = [
  {
    title: "Housing & Facilities",
    color: "#e04c2c",
    image: "/assets/images/herosection/life.png",
    description:
    "Physical and mental wellness are central to student life at UM6P. Modern fitness centers, group training, and green running trails promote active habits. Wellness programs offer personalized health guidance, mental health support, and mindfulness workshops. With professional coaches and competitive teams, students can engage in athletics or simply maintain balance through a culture that values well-being at every level.",
    link: "https://www.youtube.com/watch?v=U9cGdRNMdQQ",
  },
  {
    title: "Dining & Lifestyle",
    color: "#e04c2c",
    image: "/assets/images/herosection/food.png",
    description:
    "Physical and mental wellness are central to student life at UM6P. Modern fitness centers, group training, and green running trails promote active habits. Wellness programs offer personalized health guidance, mental health support, and mindfulness workshops. With professional coaches and competitive teams, students can engage in athletics or simply maintain balance through a culture that values well-being at every level.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Wellness & Sports",
    color: "#e04c2c",
    image: "/assets/images/herosection/Sport.jpg",
    description:
      "Physical and mental wellness are central to student life at UM6P. Modern fitness centers, group training, and green running trails promote active habits. Wellness programs offer personalized health guidance, mental health support, and mindfulness workshops. With professional coaches and competitive teams, students can engage in athletics or simply maintain balance through a culture that values well-being at every level.",
    link: "https://www.youtube.com/watch?v=O91DT1pR1ew",
  },
  {
    title: "Staff & Family Services",
    color: "#e04c2c",
    image: "/assets/images/herosection/staff.png",
    description:
    "Physical and mental wellness are central to student life at UM6P. Modern fitness centers, group training, and green running trails promote active habits. Wellness programs offer personalized health guidance, mental health support, and mindfulness workshops. With professional coaches and competitive teams, students can engage in athletics or simply maintain balance through a culture that values well-being at every level.",
    link: "https://www.youtube.com/watch?v=y6120QOlsfU",
  },
];

const DiscoverMore = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1d1b1c",
        color: "#fff",
        px: { xs: 3, md: 8 },
        py: 8,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Typography fontSize="36px" fontWeight={600} mb={2}>
        Discover more
      </Typography>

      <Typography fontSize="30px" fontWeight={300} color="#FFF" mb={6}>
        Dive deeper into our ecosystem. From student life to family support,
        every part of the UM6P campus experience is designed to enrich learning,
        foster balance, and build a strong, inclusive community.
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                border: "1px solid #fff",
                overflow: "hidden",
                borderRadius: "4px",
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <Box
                sx={{
                  px: 2,
                  py: 2,
                  backgroundColor: "#111",
                  borderBottom: "1px solid #fff",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                    }}
                  />
                  <Typography fontSize="23px" fontWeight={500}>
                    {item.title}
                  </Typography>
                  <IconButton
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ ml: "auto", p: 0 }}
                  >
                    <ArrowOutwardIcon sx={{ color: item.color }} />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ px: 2, py: 2, backgroundColor: "#111" }}>
                <Typography fontSize="20px" color="#FFF">
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscoverMore;
