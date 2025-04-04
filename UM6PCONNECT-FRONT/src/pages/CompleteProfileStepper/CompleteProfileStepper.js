import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Alert,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CollectionsIcon from "@mui/icons-material/Collections";

import Step1PersonalInfo from "./steps/Step1PersonalInfo";
import Step2Professional from "./steps/Step2Professional";
import Step3Photos from "./steps/Step3Photos";
import Step4CoverPhoto from "./steps/Step4CoverPhoto";
import Step5Review from "./steps/Step5Review";

const steps = [
  {
    title: "Personal Details",
    subtitle: "Name and department",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    title: "Professional Info",
    subtitle: "Headline and profiles",
    icon: <EmailIcon fontSize="small" />,
  },
  {
    title: "Profile Photo",
    subtitle: "Upload your headshot",
    icon: <GroupIcon fontSize="small" />,
  },
  {
    title: "Cover Image",
    subtitle: "Choose a banner",
    icon: <CollectionsIcon fontSize="small" />,
  },
  {
    title: "Review & Submit",
    subtitle: "Verify and confirm",
    icon: <RocketLaunchIcon fontSize="small" />,
  },
];

const CompleteProfileStepper = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem("completeProfileData");
    return stored
      ? JSON.parse(stored)
      : {
          firstName: "",
          lastName: "",
          Departement: "",
          headline: "",
          bio: "",
          linkedIn: "",
          researchGate: "",
          profilePicture: null,
          coverPicture: null,
        };
  });

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.firstName.trim() && formData.lastName.trim() && formData.Departement.trim();
      case 1:
        return formData.headline.trim() && formData.linkedIn.trim(); // researchGate optional
      case 2:
        return formData.profilePicture;
      case 3:
        return formData.coverPicture;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const isValid = validateStep(activeStep);
    if (!isValid) {
      setError("Please complete all required fields before continuing.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    localStorage.setItem("completeProfileData", JSON.stringify(formData));

    if (activeStep === steps.length - 1) {
      submitProfile();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const submitProfile = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      if (!userId) {
        setError("User ID is missing.");
        return;
      }

      // 1. Update user data
      await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Upload profile picture
      if (formData.profilePicture?.startsWith("data:image")) {
        await fetch(`http://localhost:5000/api/profilepicture/update-profile-picture/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profilePicture: formData.profilePicture }),
        });
      }

      // 3. Upload cover picture
      if (formData.coverPicture?.startsWith("data:image") || formData.coverPicture?.includes("/assets/")) {
        await fetch(`http://localhost:5000/api/profilepicture/update-cover-picture/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coverPicture: formData.coverPicture }),
        });
      }

      alert("Profile submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong while submitting. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1PersonalInfo data={formData} setData={setFormData} />;
      case 1:
        return <Step2Professional data={formData} setData={setFormData} />;
      case 2:
        return <Step3Photos data={formData} setData={setFormData} />;
      case 3:
        return <Step4CoverPhoto data={formData} setData={setFormData} />;
      case 4:
        return <Step5Review data={formData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Error banner */}
      {error && (
        <Box sx={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999, width: "90%", maxWidth: 500 }}>
          <Collapse in={!!error}>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Collapse>
        </Box>
      )}

      <Grid container sx={{ height: "100vh" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={4} sx={{
          backgroundColor: "#f4f4f5",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <Box>
            <Typography fontWeight="bold" fontSize={19} mb={3} color="black">
              UM6P Connect
            </Typography>

            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <Box key={index} display="flex" mb={3.2} alignItems="flex-start" position="relative">
                  <Box sx={{
                    position: "absolute", left: 17, top: 36,
                    bottom: index === steps.length - 1 ? "auto" : -20,
                    width: "2px", height: index !== steps.length - 1 ? 40 : 0,
                    backgroundColor: "#d1d5db", zIndex: 0,
                  }} />
                  <Box sx={{
                    backgroundColor: "#fff",
                    color: isActive ? "#ea3b15" : "#6b7280",
                    border: `1px solid ${isActive ? '#ea3b15' : '#e5e7eb'}`,
                    borderRadius: 1, width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    mr: 2, zIndex: 1,
                  }}>
                    {step.icon}
                  </Box>
                  <Box>
                    <Typography fontWeight={isActive ? "bold" : "normal"} fontSize={15} color={isActive ? "#111827" : "#6b7280"}>
                      {step.title}
                    </Typography>
                    <Typography fontSize={13.5} color="#9ca3af">
                      {step.subtitle}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Button variant="outlined" size="small" onClick={handleBack} disabled={activeStep === 0}
              sx={{ color: "#ea3b15", borderColor: "#ea3b15", ":hover": { borderColor: "#c33111" } }}>
              Previous
            </Button>
            <Button variant="contained" size="small" onClick={handleNext}
              sx={{ backgroundColor: "#ea3b15", ":hover": { backgroundColor: "#c33111" } }}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Grid>

        {/* Step Content */}
        <Grid item xs={12} md={8} sx={{ p: { xs: 4, md: 3 }, backgroundColor: "#fff" }}>
          <Box maxWidth={700} mx="auto" display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {steps[activeStep].title}
              </Typography>
              <Typography color="text.secondary" fontSize={14} mb={3}>
                {steps[activeStep].subtitle}
              </Typography>

              {renderStepContent()}
            </Box>

            <Box display="flex" justifyContent="center" mt={4} mb={1}>
              {steps.map((_, i) => (
                <Box
                  key={i}
                  width={44}
                  height={4}
                  borderRadius={2}
                  mx={0.5}
                  bgcolor={i === activeStep ? "#ea3b15" : "#e5e7eb"}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteProfileStepper;
