import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const EngineeringMasterPrograms = () => {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetch("/data/programs_engineering_master.json") // Charge les données JSON
      .then((response) => response.json())
      .then((data) => setDomains(data))
      .catch((error) => console.error("Erreur de chargement des programmes :", error));
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Grid container spacing={3}>
        {domains.map((domain, domainIdx) =>
          domain.schools.map((school, schoolIdx) => (
            <Grid item xs={12} sm={6} md={4} key={`${domainIdx}-${schoolIdx}`}>
              <Card sx={{ borderRadius: "8px", display: "flex", flexDirection: "column", height: "100%" }}>
                
                {/* En-tête du domaine */}
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
                    {domain.name}
                  </Typography>
                </Box>

                {/* Contenu de l'école */}
                <CardContent sx={{ textAlign: "center", padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  
                  {/* Affichage du logo */}
                  {school.logo ? (
                    <Box sx={{ width: "100%", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "15px" }}>
                      <img src={school.logo} alt={school.name} style={{ maxHeight: "100px", objectFit: "contain" }} />
                    </Box>
                  ) : (
                    <Box sx={{ width: "100%", height: "80px", backgroundColor: "#f0f0f0", marginBottom: "15px" }} />
                  )}

                  {/* Nom de l'école */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                    {school.name}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" sx={{ color: "gray", fontSize: "0.85rem", marginBottom: "15px" }}>
                    {school.description}
                  </Typography>

                </CardContent>

                {/* Bouton de candidature */}
                <Button
                  fullWidth
                  href={school.application_link}
                  target="_blank"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    color: "black",
                    textTransform: "none",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    padding: "12px",
                    fontWeight: "bold", 

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

export default EngineeringMasterPrograms;
