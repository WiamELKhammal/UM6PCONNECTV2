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
    description:
      "UM6P offers a modern living and learning experience, with student housing that balances privacy, community, and comfort. From shared lounges to study zones and eco-conscious infrastructure, every facility is optimized to support student success and well-being.",
    link: "https://www.youtube.com/watch?v=U9cGdRNMdQQ",
  },
  {
    title: "Dining & Lifestyle",
    color: "#e04c2c",
    image: "/assets/images/herosection/food.png",
    description:
      "Dining at UM6P is about choice, community, and quality. With diverse cuisine options, welcoming cafés, and campus-wide events, students enjoy not just meals—but memorable social moments that define life beyond the classroom.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Wellness & Sports",
    color: "#e04c2c",
    image: "/assets/images/herosection/Sport.jpg",
    description:
      "Our campus is built for well-being. Students have access to gyms, group training, wellness workshops, and mindfulness spaces—all promoting a healthy balance between academic rigor and personal health.",
    link: "https://www.youtube.com/watch?v=O91DT1pR1ew",
  },
  {
    title: "Staff & Family Services",
    color: "#e04c2c",
    image: "/assets/images/herosection/staff.png",
    description:
      "UM6P supports its wider community with housing, medical care, education options for children, and inclusive services that empower both staff and their families to thrive within the university ecosystem.",
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
      <Typography fontSize="36px" fontWeight={600} mb={2}>
        Discover more
      </Typography>

      <Typography fontSize="30px" fontWeight={300} color="#000" mb={6}>
        Dive deeper into our ecosystem. From student life to family support,
        every part of the UM6P campus experience is designed to enrich learning,
        foster balance, and build a strong, inclusive community.
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
