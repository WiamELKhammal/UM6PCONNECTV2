import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.6 },
  },
};

const LandingPage2 = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/assets/images/bgg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        px: { xs: 3, md: 10 },
        py: 4,
        zIndex: 1,
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <Box sx={{ maxWidth: 800, position: "relative", zIndex: 2 }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#ea3b15",
              fontWeight: "bold",
              fontSize: { xs: "19px", md: "19px" },
              letterSpacing: "1px",
              mb: 2,
            }}
          >
            UM6P CONNECT
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "40px", sm: "58px", md: "72px" },
              color: "#fff",
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Unlock a World of Knowledge & Innovation.
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Typography
            sx={{
              color: "#f0f0f0",
              fontSize: { xs: "18px", sm: "20px" },
              lineHeight: 1.7,
              mb: 4,
            }}
          >
Discover the leading researchers, cutting-edge academic programs, and groundbreaking innovations at UM6P. Become part of a vibrant community of scholars, visionaries, and professionals who are shaping the future through knowledge, collaboration, and impact.
          </Typography>
        </motion.div>

        {/* CTA Button with motion */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "50px",
              px: 3,
              py: 1.5,
              backgroundColor: "#fff",
              minWidth: "320px",
              maxWidth: "400px",
              width: "80%",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0px 5px 20px rgba(0,0,0,0.12)",
                transform: "translateY(-1px)",
              },
            }}
            onClick={() => window.location.href = "/Our-Researchers"}
          >
            <Typography
              sx={{
                color: "#000",
                fontWeight: 500,
                fontSize: 15,
                textAlign: "center",
                flex: 1,
                mx: 1,
              }}
            >
              Explore Research & Innovation at UM6P
            </Typography>
            <IconButton
              sx={{
                backgroundColor: "#ea3b15",
                color: "#fff",
                ml: 1,
                "&:hover": { backgroundColor: "#d53010" },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Paper>

        </motion.div>
      </Box>
    </Box>
  );
};

export default LandingPage2;
