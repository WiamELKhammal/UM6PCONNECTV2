import React, { useRef, useState, useEffect } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";

const CameraCapture = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cameraError, setCameraError] = useState(false);

  // 📌 Start Camera
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraError(false);
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setCameraError(true);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 📌 Capture Photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImageSrc(canvas.toDataURL("image/jpeg"));
    }
  };

  // 📌 Save and Close
  const savePhoto = () => {
    onCapture(imageSrc);
    onClose();
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          width: 650,
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
        {/* Title */}
        <Typography sx={{ fontSize: "18px", fontWeight: "bold", mb: 2 }}>
          Take a photo of yourself
        </Typography>

        {/* Camera Preview */}
        <Box
          sx={{
            width: "100%",
            height: 220,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {cameraError ? (
            <Box sx={{ textAlign: "center", color: "white", px: 3 }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
                We couldn’t access your camera
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Make sure you've allowed camera access and that it's not in use by another application.
              </Typography>
            </Box>
          ) : !imageSrc ? (
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", borderRadius: "8px" }} />
          ) : (
            <img src={imageSrc} alt="Captured" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />
          )}
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            sx={{
              color: "#e04c2c",
              border: "1px solid #e04c2c",
              "&:hover": { backgroundColor: "#fbe4e0" },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          {!imageSrc ? (
            <Button
              variant="contained"
              startIcon={<CameraAlt />}
              onClick={capturePhoto}
              disabled={cameraError}
              sx={{
                backgroundColor: cameraError ? "#ccc" : "#e04c2c",
                color: "white",
                boxShadow:"none",
                "&:hover": {boxShadow:"none", backgroundColor: cameraError ? "#ccc" : "#b53c24" },
              }}
            >
              Take photo
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={savePhoto}
              sx={{
                backgroundColor: "#e04c2c",
                color: "white",
                "&:hover": { backgroundColor: "#b53c24",boxShadow:"none" },
              }}
            >
              Save
            </Button>
          )}
        </Box>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Box>
    </Modal>
  );
};

export default CameraCapture;
