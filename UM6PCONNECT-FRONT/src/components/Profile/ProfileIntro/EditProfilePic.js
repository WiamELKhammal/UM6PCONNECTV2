import React, { useState, useRef } from "react";
import { Modal, Button } from "@mui/material";
import { CloudUpload, ArrowForward, ArrowBack } from "@mui/icons-material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const EditProfilePic = ({ open, onClose, onNext }) => {
  console.log("EditProfilePic mounted");

  const [selectedImage, setSelectedImage] = useState(null);
  const cropperRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "80%",
          maxWidth: "600px",
          margin: "3% auto",
          textAlign: "center",
          position: "relative",
          height: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "black",
            fontSize: "20px",
          }}
        >
          X
        </button>

        {/* Steps Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            paddingBottom: "10px",
            borderBottom: "2px solid #ddd",
          }}
        >
          Step 1: Upload Your Profile Picture
        </div>

        <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>
          Pick a profile picture
        </h2>
        <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px",textAlign: "left" }}>
          Have a favorite selfie? Upload it now.
        </p>

        {/* Display Image */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={selectedImage || "/assets/images/default-profile.png"}
            alt="Profile Preview"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />
          {/* Upload Icon inside the Profile Circle */}
          <CloudUpload
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "grey",
              borderRadius: "50%",
              padding: "15px",
              cursor: "pointer",
              color: "white",
              fontSize: "45px",
            }}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            onChange={handleUpload}
          />
        </div>

        {/* Cropper for Image */}
        {selectedImage && (
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              marginBottom: "20px",
            }}
          >
            <Cropper
              src={selectedImage}
              style={{ width: "100%", height: "auto" }}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              dragMode="move"
              background={true}
            />
          </div>
        )}

        {/* Buttons Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {/* Previous Button (Disabled) */}
          <Button
            variant="contained"
            disabled={true}
            style={{ color: "#555" }}
            onMouseEnter={(e) => e.target.style.cursor = 'not-allowed'} // Change cursor to indicate it's unclickable
          >
            Previous
          </Button>


          {/* Next Button */}
          <Button
            variant="contained"
            onClick={onNext}

            style={{ backgroundColor: "#d84b2b", color: "#fff", width: "20%" }}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfilePic;