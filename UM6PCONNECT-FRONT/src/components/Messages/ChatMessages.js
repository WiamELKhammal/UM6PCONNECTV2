import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Alert,
  Button,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import socket from "./socket"; // ✅ Make sure you have this path set correctly

const ChatMessages = ({ messages, recipient }) => {
  const { user } = useContext(UserContext);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const isSender = (senderId) => String(senderId) === String(user._id);

  useEffect(() => {
    socket.on("typing", ({ userId, to }) => {
      if (userId === recipient?.userId && to === user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2500);
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [recipient?.userId, user._id]);

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name || "download";
    link.click();
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {fileError && (
        <Alert severity="error" sx={{ mb: 2, fontSize: "14px" }}>
          {fileError}
        </Alert>
      )}

      {previewFile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setPreviewFile(null)}
            sx={{ position: "absolute", top: 10, right: 20, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {messages.length === 0 ? (
        <Typography textAlign="center" mt={2} color="textSecondary">
          No messages yet.
        </Typography>
      ) : (
        messages.map((msg, index) => {
          const sender = isSender(msg.senderId);
          const time = moment(msg.createdAt).format("hh:mm A");

          return (
            <Box key={index} display="flex" justifyContent={sender ? "flex-end" : "flex-start"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: sender ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  {!sender && (
                    <Avatar
                      src={recipient?.profilePicture || "/assets/images/default-profile.png"}
                      sx={{ width: 40, height: 40, mr: 1 }}
                    />
                  )}

                  <Box
                    sx={{
                      backgroundColor: sender ? "#e04c2c" : "#f0f0f0",
                      color: sender ? "#fff" : "#000",
                      padding: "10px 14px",
                      borderRadius: 3,
                      wordBreak: "break-word",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: sender ? "0px" : "15px",
                      borderBottomLeftRadius: sender ? "15px" : "0px",
                    }}
                  >
                    {msg.text && (
                      <Typography variant="body2" sx={{ mb: msg.files?.length ? 1 : 0 }}>
                        {msg.text}
                      </Typography>
                    )}

                    {msg.files?.length > 0 && (
                      <Grid container spacing={1}>
                        {msg.files.map((file, idx) => {
                          if (!file?.data) return null;
                          const type = file.type || "";
                          const name = file.name || "";

                          if (type.startsWith("image/")) {
                            return (
                              <Grid item xs={12} key={idx}>
                                <img src={file.data} alt={name} style={{ width: "100%", borderRadius: 8 }} />
                                <Button
                                  size="small"
                                  onClick={() => handleDownload(file)}
                                  sx={{ mt: 1, color: sender ? "#fff" : "#000", display: "block", mx: "auto" }}
                                >
                                  Download
                                </Button>
                              </Grid>
                            );
                          }

                          if (type.startsWith("video/")) {
                            return (
                              <Grid item xs={12} key={idx}>
                                <video controls style={{ width: "100%", borderRadius: 8 }}>
                                  <source src={file.data} type={type} />
                                </video>
                                <Button
                                  size="small"
                                  onClick={() => handleDownload(file)}
                                  sx={{ mt: 1, color: sender ? "#fff" : "#000", display: "block", mx: "auto" }}
                                >
                                  Download
                                </Button>
                              </Grid>
                            );
                          }

                          if (type.startsWith("audio/")) {
                            return (
                              <Grid item xs={12} key={idx}>
                                <audio controls style={{ width: "100%" }}>
                                  <source src={file.data} type={type} />
                                </audio>
                              </Grid>
                            );
                          }

                          if (type === "application/pdf") {
                            return (
                              <Grid item xs={12} key={idx}>
                                <iframe
                                  src={file.data}
                                  title={name}
                                  style={{ width: "100%", height: 300, borderRadius: 8 }}
                                />
                                <Button
                                  size="small"
                                  onClick={() => handleDownload(file)}
                                  sx={{ mt: 1, color: sender ? "#fff" : "#000", display: "block", mx: "auto" }}
                                >
                                  Download PDF
                                </Button>
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <InsertDriveFileIcon sx={{ color: sender ? "#fff" : "#000" }} />
                              <Typography
                                sx={{
                                  color: sender ? "#fff" : "#000",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDownload(file)}
                              >
                                {name}
                              </Typography>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>

                  {sender && (
                    <Avatar
                      src={user?.profilePicture || "/assets/images/default-profile.png"}
                      sx={{ width: 40, height: 40, ml: 1 }}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: sender ? "flex-end" : "flex-start",
                    mt: 0.5,
                    gap: 0.5,
                  }}
                >
                  <Typography sx={{ fontSize: "10px", color: "#999" }}>{time}</Typography>

                  {sender && (
                    <>
                      {msg.isRead ? (
                        <DoneAllIcon sx={{ fontSize: 14, color: "#0ABF53" }} />
                      ) : (
                        <DoneIcon sx={{ fontSize: 14, color: "#999" }} />
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })
      )}

      {/* ✅ Typing Indicator */}
      {isTyping && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "#555",
            fontStyle: "italic",
            textAlign: "left",
            mt: 2,
            ml: 1,
          }}
        >
          {recipient?.Prenom || "User"} is typing...
        </Typography>
      )}
    </Box>
  );
};

export default ChatMessages;
