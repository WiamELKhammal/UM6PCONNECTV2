import React, { useRef, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setStream(stream);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    onCapture(dataUrl);
  };

  return (
    <Box textAlign="center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", borderRadius: 10 }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" onClick={handleCapture}>
          Capture
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CameraCapture;
