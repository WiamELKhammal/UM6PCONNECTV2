import React, { useState } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";

// Dashed upload box style
const DashedBox = styled(Box)(({ theme }) => ({
    border: "2px dashed #d1d5db",
    padding: theme.spacing(4),
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
}));

// Camera Modal Component
const CameraCapture = ({ open, onClose, onCapture }) => {
    const [stream, setStream] = useState(null);
    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) return;

        const startCamera = async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                    setStream(s);
                }
            } catch (err) {
                console.error("Camera error:", err);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [open]);

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL("image/png");
        onCapture(image);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 500,
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Typography fontWeight="bold" mb={2}>
                    Use Camera
                </Typography>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: "100%", borderRadius: 8 }}
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={handleCapture} variant="contained" sx={{ backgroundColor: "#ea3b15" }}>
                        Capture
                    </Button>
                    <Button onClick={onClose} variant="outlined" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const Step3Photos = ({ data, setData }) => {
    const [cameraOpen, setCameraOpen] = useState(false);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const updated = { ...data, [field]: imageUrl };
            setData(updated);
            localStorage.setItem("completeProfileData", JSON.stringify(updated));
        }
    };

    const handleCameraCapture = (dataUrl) => {
        const updated = { ...data, profilePicture: dataUrl };
        setData(updated);
        localStorage.setItem("completeProfileData", JSON.stringify(updated));
        setCameraOpen(false);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                    <DashedBox sx={{ width: "100%", maxWidth: 400 }}>
                        {data.profilePicture ? (
                            <Box mt={0}>
                                <img
                                    src={data.profilePicture}
                                    alt="Profile Preview"
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        ) : (
                            <>
                                <PhotoCameraIcon sx={{ fontSize: 48, color: "#9ca3af" }} />
                                <Typography fontSize={14} mt={1} color="text.primary">
                                    Upload your photo here
                                </Typography>
                                <Typography fontSize={12} color="text.secondary">
                                    (max: 4MB)
                                </Typography>
                            </>
                        )}
                    </DashedBox>
                </Box>
            </Grid>


            {/* Upload Buttons */}
            <Grid item xs={12} textAlign="center">
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<FolderIcon />}
                    sx={{
                        color: "#374151",
                        borderColor: "#d1d5db",
                        backgroundColor: "#fff",
                        "&:hover": {
                            backgroundColor: "#fef2f2",
                            borderColor: "#ea3b15",
                            color: "#ea3b15",
                        },
                        textTransform: "none",
                        borderRadius: "50px",
                        px: 3,
                        mr: 2,
                    }}
                >
                    Upload from Folder
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profilePicture")}
                    />
                </Button>

                <Button
                    onClick={() => setCameraOpen(true)}
                    variant="outlined"
                    startIcon={<PhotoCameraIcon />}
                    sx={{
                        color: "#374151",
                        borderColor: "#d1d5db",
                        backgroundColor: "#fff",
                        "&:hover": {
                            backgroundColor: "#fef2f2",
                            borderColor: "#ea3b15",
                            color: "#ea3b15",
                        },
                        textTransform: "none",
                        borderRadius: "50px",
                        px: 3,
                    }}
                >
                    Use Camera
                </Button>
            </Grid>

            {/* Camera Modal */}
            <CameraCapture
                open={cameraOpen}
                onClose={() => setCameraOpen(false)}
                onCapture={handleCameraCapture}
            />
        </Grid>
    );
};

export default Step3Photos;
