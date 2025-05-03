import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

const cardData = [
  {
    title: "Ingénieur Informatique",
    sub: "UNDERGRADUATE",
    count: "17,728+",
    image: "/assets/images/herosection/ACA1.png",
    hoverImage: "/assets/images/herosection/PERGOLA30.jpg",
  },
  {
    title: "Doctorate in Medicine",
    sub: "PHD",
    count: "16,340+",
    image: "/assets/images/herosection/ACA2.jpg",
    hoverImage: "/assets/images/herosection/STUDENT CENTER20.jpg",
  },
  {
    title: "Architecture (Bac+6)",
    sub: "UNDERGRADUATE",
    count: "16,563+",
    image: "/assets/images/herosection/ACA3.jpg",
    hoverImage: "/assets/images/herosection/_DPH1321AK-web.jpg",

  },
  {
    title: "Hospitality Business (100% English)",
    sub: "UNDERGRADUATE",
    count: "13,607+",
    image: "/assets/images/herosection/ACA4.jpg",
    hoverImage: "/assets/images/herosection/_E1A8880.jpg",
  },
];

const ProgramCardsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Box
      sx={{
        borderLeft: "1px solid #CCC",
        backgroundColor: "#1d1b1c",
        px: 0,
        py: 0,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Grid container spacing={0}>
        {cardData.map((card, index) => {
          const row = Math.floor(index / 2);
          const isImageLeft =
            (row % 2 === 0 && index % 2 === 0) ||
            (row % 2 === 1 && index % 2 === 1);

          const isHovered = hoveredIndex === index;

          return (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isImageLeft ? "row" : "row-reverse",
                  height: { xs: "auto", md: 300 },
                  flexWrap: "wrap",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={isHovered ? card.hoverImage : card.image}
                  alt={card.title}
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    height: { xs: 200, md: "100%" },
                    objectFit: "cover",
                    transition: "all 0.4s ease",
                  }}
                />

                {/* Text Content */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    backgroundColor: isHovered
                      ? isImageLeft
                        ? "#a0301a"
                        : "#e4d1c9"
                      : isImageLeft
                      ? "#ea3b15"
                      : "#fef2ec",
                    color: isHovered
                      ? isImageLeft
                        ? "#fff"
                        : "#a0301a"
                      : isImageLeft
                      ? "#fff"
                      : "#ea3b15",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 4,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        fontWeight: 400,
                        letterSpacing: 1,
                        mb: 1,
                      }}
                    >
                      {card.sub}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "26px",
                        fontWeight: 700,
                        mt: 1,
                      }}
                    >
                      {card.count}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProgramCardsGrid;
