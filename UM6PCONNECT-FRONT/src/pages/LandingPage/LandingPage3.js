import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BiotechIcon from '@mui/icons-material/Biotech';
const LandingPage3 = () => {
  const [users, setUsers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users?limit=12");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const usersPerPage = 4;
  const totalSlides = Math.ceil(users.length / usersPerPage);

  const visibleUsers = users.slice(
    currentSlide * usersPerPage,
    currentSlide * usersPerPage + usersPerPage
  );

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Box px={{ xs: 2, md: 10 }} py={6}>
      {/* UM6P CONNECT Title */}
      <Box display="flex" alignItems="center" mb={2}>
        <BiotechIcon sx={{ color: "#ea3b15", mr: 1 }} />
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#000"
          sx={{ letterSpacing: 1, fontSize: "14px", textTransform: "uppercase" }}
        >
          UM6P CONNECT
        </Typography>
      </Box>

      <Box
        sx={{
          height: "1px",
          width: 180,
          backgroundColor: "#ea3b15",
          mt: -1,
          mb: 2,
        }}
      />


      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={4}>
        <Box maxWidth={{ xs: "100%", md: "50%" }}>
          <Typography variant="h4" fontWeight="bold" lineHeight={1.3} color="#000">
            Explore the Minds Powering UM6P Innovation.
          </Typography>
        </Box>

        <Box maxWidth={{ xs: "100%", md: "40%" }} mt={{ xs: 3, md: 0 }}>
          <Typography fontSize={14} color="text.secondary" mb={2}>
            UM6P Connect offers an extensive network of researchers, institutions, and academic programs.
            Explore world-class expertise, innovative projects, and vibrant collaborations—empowering the future
            of education, science, and sustainable development.
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button
              onClick={() => (window.location.href = "/Our-Researchers")}
              sx={{
                color: "#ea3b15",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                padding: "6px 16px",
                border: "1px solid #ea3b15",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "transparent",
                  border: "1px solid #ea3b15",
                },
              }}
            >
              View More
            </Button>

            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleBack} disabled={currentSlide === 0}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={handleNext} disabled={currentSlide >= totalSlides - 1}>
                <ArrowForwardIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* User Carousel Section */}
      <Grid container spacing={2} justifyContent="center">
        {visibleUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
                p: 2,
                minHeight: 170,
                height: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography fontWeight={500} fontSize={16}>
                    {user.firstName || user.Prenom} {user.lastName || user.Nom}
                  </Typography>
                </Stack>

                <Typography fontSize={14} color="text.secondary" mb={2}>
                  {user.department || user.Departement || "No department"}
                </Typography>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => (window.location.href = "/Our-Researchers")}
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "14px",
                    pl: 0,
                  }}
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingPage3;
