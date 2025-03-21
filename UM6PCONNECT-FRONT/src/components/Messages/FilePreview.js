import React from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import JSZip from "jszip";

// ✅ Import PDF styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FilePreview = ({ file, onClose }) => {
  const pdfPlugin = defaultLayoutPlugin();

  // 📌 Extract ZIP contents if it's a ZIP file
  const extractZipContents = async () => {
    const zip = new JSZip();
    try {
      const zipData = await zip.loadAsync(file.data);
      return Object.keys(zipData.files).map((filename) => filename);
    } catch (error) {
      console.error("Error extracting ZIP:", error);
      return ["Error loading ZIP file"];
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {/* ✅ Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 20,
          color: "white",
          fontSize: "30px",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* ✅ Display PDF */}
      {file.type === "application/pdf" ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "80%",
            height: "80%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Viewer fileUrl={file.data} plugins={[pdfPlugin]} />
        </Box>
      ) : file.type === "application/zip" ? (
        <Box sx={{ color: "white", textAlign: "center", padding: "20px" }}>
          <Typography variant="h6">ZIP File Contents:</Typography>
          <React.Suspense fallback={<CircularProgress color="inherit" />}>
            {extractZipContents().then((files) =>
              files.map((name, idx) => <Typography key={idx}>{name}</Typography>)
            )}
          </React.Suspense>
        </Box>
      ) : (
        <Typography variant="h6" color="white">
          Unsupported file type for preview.
        </Typography>
      )}
    </Box>
  );
};

export default FilePreview;
