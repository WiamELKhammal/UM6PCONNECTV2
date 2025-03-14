import React, { useState } from "react";
import EditProfileForm from "./EditProfileForm";

const ProfileSetup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);
  const saveProfile = () => {
    console.log("Profile data saved!");
    closeModal();
  };

  return (
    <>
      {isOpen && <EditProfileForm open={isOpen} onClose={closeModal} onSave={saveProfile} />}
    </>
  );
};

export default ProfileSetup;
