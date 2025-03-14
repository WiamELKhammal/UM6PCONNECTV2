import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ChatBubbleOutline, GroupAdd, TrendingUp } from "@mui/icons-material";  // Updated icons

const cards = [
  {
    title: "Connect with Researchers",
    description: "Establish connections and collaborate with professionals in your field.",
    icon: <GroupAdd sx={{ fontSize: 60, color: "#d84b2b" }} />,  // Updated icon
  },
  {
    title: "Engage in Knowledge Exchange",
    description: "Communicate and share research findings with fellow researchers.",
    icon: <ChatBubbleOutline sx={{ fontSize: 60, color: "#d84b2b" }} />,  // Updated icon
  },
  {
    title: "Monitor Your Research Impact",
    description: "Track the influence and citations of your published work over time.",
    icon: <TrendingUp sx={{ fontSize: 60, color: "#d84b2b" }} />,  // Updated icon
  },
];

const AutoLoopingCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: 360,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid #ccc",
        boxShadow: 0,  
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* Icon in the Middle */}
      {cards[activeIndex].icon}

      {/* Title */}
      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
        {cards[activeIndex].title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
        {cards[activeIndex].description}
      </Typography>

      {/* Dots Indicator */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        {cards.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: activeIndex === index ? "black" : "lightgray",
              mx: 0.5,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AutoLoopingCards;
