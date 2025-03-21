import React, { useState, useContext, useRef, useCallback } from "react";
import { Modal, Box, Button, IconButton, Slider } from "@mui/material";
import { Close, UploadFile, CameraAlt, Delete } from "@mui/icons-material";
import { UserContext } from "../../../context/UserContext";
import Cropper from "react-easy-crop";
import axios from "axios";
import CameraCapture from "./CameraCapture"; 

const EditProfilePic = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext); // ✅ Get setUser to update state instantly
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(user?.profilePicture || "/default-profile.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  // 📌 Open File Selection
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // 📌 Handle File Upload
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

  // 📌 Capture from Camera
  const handleCapture = (photo) => {
    setImageSrc(photo);
    setIsCropping(true);
    setShowCamera(false);
  };

  // 📌 Delete Image
  const handleDeleteImage = () => {
    setImageSrc("/default-profile.jpg");
    setIsCropping(false);
  };

  // 📌 Handle Cropping
  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // 📌 Crop & Save Image (Send to API & Update Context)
  const saveImage = async () => {
    if (!croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setImageSrc(croppedImage);
    setIsCropping(false);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/profilepicture/update-profile-picture/${user._id}`,
        { profilePicture: croppedImage }
      );

      if (response.status === 200) {
        console.log("Profile picture updated successfully.");

        // ✅ Update UserContext to refresh the profile picture instantly
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: croppedImage,
        }));

        onClose(); // 🔥 CLOSE THE MODAL AFTER SUCCESS 🔥
      }
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
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
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <Close />
        </IconButton>
        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "24px" }}>
          Change profile photo
        </h2>

        {/* Show Camera Screen Instead of Edit UI */}
        {showCamera ? (
          <CameraCapture onCapture={handleCapture} onClose={() => setShowCamera(false)} />
        ) : (
          <>
            {/* Image Preview Area */}
            <Box
              sx={{
                width: "100%",
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                position: "relative",
                borderRadius: "8px",
              }}
            >
              {isCropping ? (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt="Profile"
                  style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}
                />
              )}

              {imageSrc !== "/default-profile.jpg" && (
                <IconButton onClick={handleDeleteImage} sx={{ position: "absolute", top: 10, right: 10 }}>
                  <Delete />
                </IconButton>
              )}
            </Box>

            {/* Zoom Slider */}
            {isCropping && (
              <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, newValue) => setZoom(newValue)} sx={{ mt: 2, mx: 3 }} />
            )}

            {/* Upload & Camera Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<UploadFile />}
                sx={{
                  backgroundColor: "#fff",
                  color: "#ea3b15",
                  boxShadow: "none",
                  border: "1px solid #ea3b15",
                  "&:hover": { backgroundColor: "#b53c24", boxShadow: "none", color: "#fff" },
                }}
                onClick={triggerFileInput}
              >
                Upload a photo
              </Button>

              <Button
                variant="contained"
                startIcon={<CameraAlt />}
                sx={{
                  backgroundColor: "#fff",
                  color: "#ea3b15",
                  boxShadow: "none",
                  border: "1px solid #ea3b15",
                  "&:hover": { backgroundColor: "#b53c24", color: "#fff", boxShadow: "none" },
                }}
                onClick={() => setShowCamera(true)}
              >
                Take a photo
              </Button>
            </Box>

            {/* Hidden File Input */}
            <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileUpload} />

            {/* Cancel & Save Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                sx={{
                  color: "#ea3b15",
                  "&:hover": { backgroundColor: "#fbe4e0" },
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
                    "&:hover": { backgroundColor: "#b53c24" },
                  }}
                >
                  Save
                </Button>
              )}
            </Box>
          </>
        )}
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

export default EditProfilePic;
