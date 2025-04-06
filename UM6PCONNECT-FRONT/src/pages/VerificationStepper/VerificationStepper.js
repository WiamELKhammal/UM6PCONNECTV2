import React, { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";

const steps = [Step1, Step2, Step3, Step4, Step5];

const VerificationStepper = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep];
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1300,
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: isMobile ? 2 : 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#777",
          }}
        >
          <CloseIcon />
        </IconButton>

        

        {/* Step Content */}
        <StepComponent />

        {/* Navigation */}
        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            onClick={handleBack}
            disabled={currentStep === 0}
            sx={{
              visibility: currentStep === 0 ? "hidden" : "visible",
              color: "#ea3b15",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Pagination Dots */}
          <Box display="flex" gap={1}>
            {steps.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: index === currentStep ? "#ea3b15" : "#ccc",
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            sx={{
              visibility:
                currentStep === steps.length - 1 ? "hidden" : "visible",
              color: "#ea3b15",
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default VerificationStepper;
