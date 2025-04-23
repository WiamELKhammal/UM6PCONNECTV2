import React, { useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const cardData = [
  {
    title: "Housing & Facilities",
    color: "#e04c2c",
    image: "/assets/images/herosection/life.png",
    description: (
      <>
        Modern, secure, and designed for focus. <br />
        Students live in fully equipped apartments with private rooms, shared kitchens, high-speed internet, and dedicated study space. Common lounges, game rooms, and laundry services support everyday life—while warm, minimalist architecture creates a welcoming, inspiring atmosphere.
      </>
    ),
    link: "https://www.youtube.com/watch?v=U9cGdRNMdQQ",
  },
  {
    title: "Dining & Lifestyle",
    color: "#e04c2c",
    image: "/assets/images/herosection/food.png",
    description: (
      <>
        Food that fuels connection. <br />
        Enjoy balanced meals daily in the university restaurant, with diverse, healthy menus including vegetarian options. Grab coffee or a quick bite at the café, or unwind outdoors at the food truck garden—where social life and spontaneity meet.
      </>
    ),
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Wellness & Sports",
    color: "#e04c2c",
    image: "/assets/images/herosection/Sport.jpg",
    description: (
      <>
        Built for balance. <br />
        UM6P promotes holistic growth through access to sports, fitness, and wellness spaces. Whether you’re training, relaxing, or recharging, you’ll find the support to maintain a healthy mind and body—so you can lead with clarity and confidence.
      </>
    ),
    link: "https://www.youtube.com/watch?v=O91DT1pR1ew",
  },
  {
    title: "Staff & Family Services",
    color: "#e04c2c",
    image: "/assets/images/herosection/staff.png",
    description: (
      <>
        A thriving community for all. <br />
        UM6P is more than a university—it’s a living campus that supports its faculty, staff, and their families. With access to on-site services, family-friendly amenities, childcare support, and integrated wellness programs, we ensure that those who make UM6P’s mission possible can live and work in harmony.
      </>
    ),
    link: "https://www.youtube.com/watch?v=y6120QOlsfU",
  },
];
const DiscoverMore = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = cardData.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex + 3 < cardData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        color: "#000",
        borderLeft: "1px solid #CCC",
        px: { xs: 3, md: 8 },
        py: 8,
        fontFamily: "'Work Sans', sans-serif",
        position: "relative",
      }}
    >
      <Typography fontSize="30px" fontWeight={300} color="#000" mb={6}>
      At UM6P, education extends beyond the classroom. You live, learn, and grow in a purpose-built environment designed to inspire. Every space—from your residence to the research lab—is part of an ecosystem that supports your academic journey and personal development. This is not just where you study. It’s where you belong.

      </Typography>

      {/* Cards */}
      <Grid container spacing={3} wrap="nowrap" sx={{ overflow: "hidden" }}>
        {visibleCards.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: "100%", height: "300px", objectFit: "cover" }}
              />

              <Box
                sx={{
                  px: 2,
                  py: 2,
                  backgroundColor: item.color,
                  borderBottom: "1px solid #FFF",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#FFF",
                    }}
                  />
                  <Typography fontSize="25px" fontWeight={600} color="#FFF">
                    {item.title}
                  </Typography>
                  <IconButton
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ ml: "auto", p: 0 }}
                  >
                    <ArrowOutwardIcon sx={{ color: "#FFF" }} />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  px: 2,
                  py: 2,
                  backgroundColor: item.color,
                  flexGrow: 1,
                }}
              >
                <Typography fontSize="25px" color="#FFF">
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Bottom center arrow controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 2,
          mt: 4,
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={startIndex === 0}
          sx={{
            backgroundColor: "#ea3b15",
            color: "#fff",
            "&:hover": { backgroundColor: "#ea3b15" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={startIndex + 3 >= cardData.length}
          sx={{
            backgroundColor: "#ea3b15",
            color: "#fff",
            "&:hover": { backgroundColor: "#ea3b15" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DiscoverMore;
