import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const PostBacPrograms = () => {
  const [poles, setPoles] = useState([]);

  useEffect(() => {
    fetch("/data/poles.json") // Load JSON from public/data/
      .then((response) => response.json())
      .then((data) => setPoles(data))
      .catch((error) => console.error("Error loading poles data:", error));
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Grid container spacing={3}>
        {poles.map((pole, idx) =>
          pole.schools.map((school, schoolIdx) => (
            <Grid item xs={12} sm={6} md={4} key={`${idx}-${schoolIdx}`}>
              <Card
                sx={{
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%", // Ensures uniform height
                }}
              >
                {/* Pole Header */}
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "black", textAlign: "center" }}>

                    {pole.name}
                  </Typography>
                </Box>

                {/* School Content */}
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: "20px",
                    flexGrow: 1, // Allows content to occupy available space for uniform height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* Logo Display */}
                  {school.logo ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <img
                        src={school.logo}
                        alt={school.name}
                        style={{
                          maxHeight: "150px",
                          objectFit: "contain",
                          width: school.logo.includes("FGSES") ? "550px" : "auto", // Increase width only for FGSES logos
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "80px",
                        backgroundColor: "#f0f0f0",
                        marginBottom: "15px",
                      }}
                    />
                  )}

                  {/* School Name */}
                  <Typography
                    variant="h7"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    {school.name}
                  </Typography>

                  {/* Description with Reduced Size */}
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontSize: "0.85rem", marginBottom: "15px" }}
                  >
                    {school.description}
                  </Typography>
                </CardContent>

                {/* Full-width button */}
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    color: "black",
                    textTransform: "none",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    fontWeight: "bold", 
                    padding: "12px",
                    "&:hover": { backgroundColor: "#ccc" },
                  }}
                >
                  Candidater
                </Button>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PostBacPrograms;
