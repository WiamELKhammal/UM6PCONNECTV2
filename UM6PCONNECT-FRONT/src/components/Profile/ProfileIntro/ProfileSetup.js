import React, { useState } from "react";
import EditProfilePic from "./EditProfilePic";
import EditCoverPic from "./EditCoverPic";
import EditBio from "./EditBio";
import EditLocation from "./EditLocation";
import EditContactInfos from "./EditContactInfos";
import EditDepartment from "./EditDepartment";
import { Modal } from "@mui/material";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < 6 ? prev + 1 : prev)); // Prevent going beyond last step
  const previousStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev)); // Prevent going before first step
  const closeModal = () => setStep(0); // Close the modal

  return (
    <>
      {/* Step 1: Edit Profile Picture */}
      {step === 1 && (
        <EditProfilePic open={true} onClose={closeModal} onNext={nextStep} />
      )}

      {/* Step 2: Edit Cover Picture */}
      {step === 2 && (
        <EditCoverPic
          open={true}
          onClose={closeModal}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}

      {/* Step 3: Edit Bio */}
      {step === 3 && (
        <EditBio
          open={true}
          onClose={closeModal}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}

      {/* Step 4: Edit Location */}
      {step === 4 && (
        <EditLocation
          open={true}
          onClose={closeModal}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}

      {/* Step 5: Edit Contact Infos */}
      {step === 5 && (
        <EditContactInfos
          open={true}
          onClose={closeModal}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}

      {/* Step 6: Edit Department */}
      {step === 6 && (
        <EditDepartment
          open={true}
          onClose={closeModal}
          onNext={nextStep}
          onPrevious={previousStep}
        />
      )}
    </>
  );
};

export default ProfileSetup;
