import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Badge,
  Collapse,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import { Image, SquarePlay, FileMusic, FileText, Link2 } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import axios from "axios";

const categorizeFilesByDate = (messages, type) => {
  const grouped = {};
  messages.forEach((msg) => {
    if (!msg.files || !msg.files.length) return;
    const date = moment(msg.createdAt).format("DD/MM/YYYY");
    msg.files.forEach((file) => {
      if (
        (type === "media" && (file.type.startsWith("image/") || file.type.startsWith("video/"))) ||
        (type === "docs" && (file.type.includes("pdf") || file.type.includes("word") || file.type.includes("text"))) ||
        (type === "link" && (file.type === "link" || file.data?.startsWith("http")))
      ) {
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(file);
      }
    });
  });
  return grouped;
};

const RightSidebar = ({ recipient, onClose }) => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("media");
  const [openDates, setOpenDates] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?._id || !recipient?.userId) return;

    axios
      .get(`http://localhost:5000/api/messages/files-between/${user._id}/${recipient.userId}`)
      .then((res) => {
        console.log("Fetched messages with files:", res.data);
        setMessages(res.data);
      })
      .catch((err) => console.error("Failed to fetch shared files:", err));
  }, [user, recipient]);

  const groupedFiles = categorizeFilesByDate(messages, activeTab);

  const handleToggleDate = (date) => {
    setOpenDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <Box
      sx={{
        width: "320px",
        height: "100vh",
        bgcolor: "#FFF",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 0,
        top: 0,
        borderLeft: "1px solid #c8c9c9",
      }}
    >
      <Box sx={{ display: "flex", height: "85px", justifyContent: "space-between", alignItems: "center", px: 2, py: 1, borderBottom: "1px solid #ddd" }}>
        <Box>
          <Typography fontWeight={600} fontSize={16}>Files</Typography>
          <Typography fontSize={14} fontWeight={500} color="#333">All shared files in this chat</Typography>
        </Box>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="fullWidth"
        sx={{
          px: 2,
          pt: 1,
          "& .MuiTabs-indicator": { backgroundColor: "#e04c2c" },
          "& .MuiTab-root": { color: "#e04c2c", fontWeight: 600 },
          "& .Mui-selected": { color: "#e04c2c !important" }
        }}
      >
        <Tab label="Media" value="media" />
        <Tab label="Link" value="link" />
        <Tab label="Docs" value="docs" />
      </Tabs>

      <Box sx={{ p: 2, overflowY: "auto", flex: 1, maxHeight: "calc(100vh - 160px)" }}>
        {Object.keys(groupedFiles).map((date, i) => (
          <Box key={date}>
            {i !== 0 && <Divider sx={{ height: "1px", bgcolor: "#fff", my: 1 }} />}
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, cursor: "pointer" }}
              onClick={() => handleToggleDate(date)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography fontSize={14} fontWeight={500} color="#183153">{date}</Typography>
                <Badge badgeContent={groupedFiles[date].length} color="error" />
              </Box>
              <ExpandMoreIcon fontSize="small" sx={{ transform: openDates[date] ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
            </Box>

            <Collapse in={!!openDates[date]}>
              <Grid container spacing={1} mb={2}>
                {groupedFiles[date].map((file, idx) => (
                  <Grid item xs={12} key={idx}>
                    {(file.type.includes("pdf") || file.type.includes("word") || file.type.includes("text")) ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: 60,
                          borderRadius: 2,
                          bgcolor: "#f8f8f8",
                          px: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <FileText size={20} />
                          <Typography fontSize={13}>{file.name}</Typography>
                        </Box>
                        <DownloadIcon fontSize="small" />
                      </Box>
                    ) : file.type.startsWith("image/") ? (
                      <Box component="img" src={file.data} alt={file.name} sx={{ width: "100%", height: 300, borderRadius: 1, objectFit: "cover" }} />
                    ) : file.type.startsWith("video/") ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: 180,
                          borderRadius: 1,
                          bgcolor: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SquarePlay size={22} />
                      </Box>
                    ) : file.type.startsWith("audio/") ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: 120,
                          borderRadius: 1,
                          bgcolor: "#f4f4f4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FileMusic size={22} />
                      </Box>
                    ) : file.type === "link" || file.data?.startsWith("http") ? (
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: 1,
                          bgcolor: "#e6f4ff",
                          borderLeft: "4px solid #00AEEF",
                          p: 1,
                        }}
                      >
                        <Typography fontWeight={600} fontSize={13} mb={0.5}>{file.name || "Shared Link"}</Typography>
                        <Typography fontSize={12} color="#0077cc" sx={{ wordBreak: "break-all" }}>{file.data}</Typography>
                      </Box>
                    ) : null}
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        ))}
      </Box>

      <IconButton
        sx={{
          bgcolor: "#e04c2c",
          color: "#fff",
          position: "absolute",
          left: "-19.5px",
          top: "14%",
          transform: "translateY(-50%)",
          borderRadius: "30%",
          padding: "4px",
        }}
        onClick={onClose}
      >
        <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: "16px" }} />
      </IconButton>
    </Box>
  );
};

export default RightSidebar;
