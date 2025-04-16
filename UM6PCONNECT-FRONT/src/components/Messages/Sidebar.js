import React, { useContext } from "react";
import { Box, IconButton, Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { UserContext } from "../../context/UserContext"; // ✅ Import User Context

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user } = useContext(UserContext);
    const profilePic = user?.profilePicture || "/assets/images/default-profile.png";

    return (
        <Box
            sx={{
                width: "80px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#fff",
                paddingY: 2,
                borderRight: "1px solid #c8c9c9",
            }}
        >
            {/* Top Icons */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                {/* Chat Icon - Active by Default */}
                <IconButton sx={{ color: "#e04c2c" }}>
                    <TextsmsIcon fontSize="large" />
                </IconButton>


                <IconButton
                    sx={{ color: activeTab === "chats" ? "#e04c2c" : "#000" }}
                    onClick={() => setActiveTab("chats")}
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>

                {/* Profile Icon */}
                <IconButton
                    sx={{ color: activeTab === "friends" ? "#e04c2c" : "#000" }}
                    onClick={() => setActiveTab("friends")} //  Set active tab to "friends"
                >
                    <PersonOutlineIcon />
                </IconButton>


                {/* Favorite Icon */}
                <IconButton sx={{ color: "#000" }}>
                    <StarBorderIcon />
                </IconButton>

                {/* Archive Icon (Switch to Archived Chats) */}
                <IconButton
                    sx={{ color: activeTab === "archived" ? "#e04c2c" : "#000" }}
                    onClick={() => setActiveTab("archived")}
                >
                    <ArchiveOutlinedIcon />
                </IconButton>
            </Box>

            {/* Bottom - Profile Picture */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Avatar src={profilePic} />
            </Box>
        </Box>
    );
};

export default Sidebar;
