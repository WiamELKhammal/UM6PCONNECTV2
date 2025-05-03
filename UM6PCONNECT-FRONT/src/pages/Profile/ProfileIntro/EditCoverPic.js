import React, { useState, useContext, useRef, useCallback } from "react";
import { Modal, Box, Button, IconButton, Slider } from "@mui/material";
import { Close, UploadFile, Delete } from "@mui/icons-material";
import { UserContext } from "../../../context/UserContext";
import Cropper from "react-easy-crop";
import axios from "axios";

const EditCoverPic = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(user?.coverPicture || "/assets/images/default-cover.png");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImageSrc("/assets/images/default-cover.png");
    setIsCropping(false);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const saveImage = async () => {
    if (!croppedAreaPixels) return;
  
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setImageSrc(croppedImage);
    setIsCropping(false);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/profilepicture/update-cover-picture`, // ✅ REMOVE ${user._id}
        { coverPicture: croppedImage },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // ✅ Bearer Token attached
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Cover picture updated successfully.");
        setUser((prevUser) => ({
          ...prevUser,
          coverPicture: croppedImage,
        }));
        onClose();
      }
    } catch (error) {
      console.error("Error saving cover picture:", error);
    }
  };
  
  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          width: { xs: "90vw", sm: 600 }, // 📱 Responsive width
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
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <Close />
        </IconButton>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "22px" }}>
          Change Cover Photo
        </h2>

        {/* Image Preview */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "30vh", sm: 250 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {isCropping ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <img
              src={imageSrc}
              alt="Cover"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {imageSrc !== "/assets/images/default-cover.png" && (
            <IconButton onClick={handleDeleteImage} sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}>
              <Delete sx={{ color: "#ea3b15" }} />
            </IconButton>
          )}
        </Box>

        {/* Zoom Slider */}
        {isCropping && (
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, newValue) => setZoom(newValue)}
            sx={{ mt: 2, mx: 3 }}
          />
        )}

        {/* Upload Button */}
        <Button
          variant="contained"
          startIcon={<UploadFile />}
          onClick={triggerFileInput}
          sx={{
            backgroundColor: "#ea3b15",
            color: "white",
            "&:hover": { backgroundColor: "#b53c24" },
            mt: 2,
          }}
        >
          Upload a photo
        </Button>

        {/* Hidden File Input */}
        <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileUpload} />

        {/* Cancel & Save Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            sx={{
              color: "#ea3b15",
              width: { xs: "100%", sm: "auto" },
              "&:hover": { backgroundColor: "#fbe4e0" }
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          {isCropping && (
            <Button
              variant="contained"
              onClick={saveImage}
              sx={{
                backgroundColor: "#ea3b15",
                color: "white",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#b53c24" }
              }}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

// 📌 Crop Function
const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};

export default EditCoverPic;
