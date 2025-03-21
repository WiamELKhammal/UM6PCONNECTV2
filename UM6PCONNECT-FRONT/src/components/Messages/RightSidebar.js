import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Image, SquarePlay, FileMusic, FileText } from "lucide-react";

const RightSidebar = ({ recipient, onClose }) => {
  return (
    <Box
      sx={{
        width: "80px",
        height: "100vh",
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        right: 0,
        top: 0,
        borderLeft: "1px solid #c8c9c9",
      }}
    >
      {/* Profile Section - Now perfectly centered inside 85px */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "85px", //  Matches ChatHeader height
          width: "100%", // Ensures full width for centering
          borderBottom: "1px solid #ddd",
        }}
      >
        <Avatar
          src={recipient?.profilePicture || "/assets/images/default-profile.png"}
          sx={{
            width: 55,
            height: 55,
            border: "3px solid #fff",
          }}
        />
      </Box>

      {/* ✅ Action Buttons - Now Closer to Bottom Border */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "180px" }}>
        <IconButton sx={{ color: "#000", padding: "5px" }}>
          <Image size={22} />
        </IconButton>

        <IconButton sx={{ color: "#000", padding: "5px" }}>
          <SquarePlay size={22} />
        </IconButton>

        <IconButton sx={{ color: "#000", padding: "5px" }}>
          <FileMusic size={22} />
        </IconButton>

        <IconButton sx={{ color: "#000", padding: "5px" }}>
          <FileText size={22} />
        </IconButton>
      </Box>

      {/* Close Button - Moved Closer to Action Buttons */}
      <IconButton
        sx={{ bgcolor: "#E32636", color: "#fff", marginBottom: "10px", padding: "8px" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      {/* ✅ Collapse Sidebar Button */}
      <IconButton
        sx={{
          bgcolor: "#ea3b15",
          color: "#fff",
          position: "absolute",
          left: "-19.5px",
          top: "14%",
          transform: "translateY(-50%)",
          borderRadius: "30%",
          padding: "4px", //  Smaller button
          minWidth: "26px", // Smaller size
        }}
        onClick={onClose}
      >
        <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: "16px" }} /> {/* ✅ Reduced arrow size */}
        </IconButton>
    </Box>
  );
};

export default RightSidebar;
