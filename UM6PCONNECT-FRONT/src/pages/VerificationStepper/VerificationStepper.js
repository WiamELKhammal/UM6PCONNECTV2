import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";


const steps = [
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,

];

const VerificationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Step {currentStep + 1} of {steps.length}
        </Typography>

        <StepComponent />

        <Box mt={3} display="flex" justifyContent="flex-end">
          {currentStep < steps.length - 1 && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: "#ea3b15",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#c3320f" },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default VerificationStepper;
