import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

const UploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(location.state?.image || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    setCroppedImage(canvas.toDataURL("image/png"));
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#222" }}>
      <IconButton onClick={() => navigate("/")} sx={{ position: "absolute", top: 8, left: 8, color: "white" }}>
        <Close />
      </IconButton>

      {image ? (
        <>
          <Cropper image={image} crop={crop} zoom={zoom} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={handleCropComplete} />
          <Button onClick={() => setImage(null)} sx={{ position: "absolute", top: 8, right: 8, color: "white" }}>
            <Delete />
          </Button>
        </>
      ) : (
        <Button component="label" sx={{ backgroundColor: "white", color: "#d84b2b", border: "1px solid #d84b2b" }}>
          Upload Photo
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
        </Button>
      )}

      {croppedImage && (
        <Button onClick={() => navigate("/", { state: { finalImage: croppedImage } })} sx={{ mt: 2, backgroundColor: "#d84b2b", color: "white" }}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default UploadPage;
