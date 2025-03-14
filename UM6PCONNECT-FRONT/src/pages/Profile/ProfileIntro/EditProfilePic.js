import React, { useState } from "react";
import { Modal, Box, Button, IconButton } from "@mui/material";
import { Close, CameraAlt, UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EditProfilePic = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          width: 420,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, left: 8, color: "#666" }}>
          <Close />
        </IconButton>

        <h2>Pick a cover picture</h2>

        <Button
          variant="contained"
          onClick={() => navigate("/camera")}
          startIcon={<CameraAlt />}
          sx={{ my: 1, width: "100%" }}
        >
          Use Camera
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/upload")}
          startIcon={<UploadFile />}
          sx={{ my: 1, width: "100%" }}
        >
          Upload Photo
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfilePic;
