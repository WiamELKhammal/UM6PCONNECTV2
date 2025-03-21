import React, { useContext, useState } from "react";
import { Box, Typography, Avatar, Grid, IconButton, Alert } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

const ChatMessages = ({ messages, recipient }) => {
  const { user } = useContext(UserContext);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileError, setFileError] = useState(""); // ✅ Error state for large files

  // 📌 Handle File Selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    setFileError(""); // ✅ Clear error if file is valid
    setPreviewFile(file);
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
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* ✅ Show File Size Error */}
      {fileError && (
        <Alert severity="error" sx={{ mb: 2, fontSize: "14px" }}>
          {fileError}
        </Alert>
      )}

      {/* ✅ Fullscreen File Preview */}
      {previewFile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setPreviewFile(null)}
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
        </Box>
      )}

      {/* ✅ Messages List */}
      {messages.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", marginTop: "20px" }}>
          No messages yet.
        </Typography>
      ) : (
        messages.map((msg, index) => {
          const isSender = String(msg.senderId) === String(user._id);
          const formattedTime = moment(msg.createdAt).format("hh:mm A");

          return (
            <Box key={index}>
              {/* ✅ Message Bubble */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isSender ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: isSender ? "flex-end" : "flex-start",
                  }}
                >
                  {!isSender && (
                    <Avatar
                      src={recipient?.profilePicture || "/assets/images/default-profile.png"}
                      sx={{ width: 40, height: 40, marginRight: "8px" }}
                    />
                  )}

                  {/* ✅ Message Bubble */}
                  <Box
                    sx={{
                      backgroundColor: isSender ? "#ea3b15" : "#f0f0f0",
                      color: isSender ? "#fff" : "#000",
                      padding: "10px 14px",
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      textAlign: "left",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: isSender ? "0px" : "15px",
                      borderBottomLeftRadius: isSender ? "15px" : "0px",
                    }}
                  >
                    {msg.text && <Typography variant="body2">{msg.text}</Typography>}

                    {/* ✅ File Handling */}
                    {msg.files && msg.files.length > 0 && (
                      <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                        {msg.files.map((file, idx) => {
                          if (!file || !file.data) return null;

                          const fileType = file.type || "";

                          if (fileType.startsWith("image/")) {
                            return (
                              <Grid item xs={msg.files.length > 1 ? 6 : 12} key={idx}>
                                <img
                                  src={file.data}
                                  alt="Sent File"
                                  style={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreviewFile(file)}
                                />
                              </Grid>
                            );
                          } else if (fileType.startsWith("video/")) {
                            return (
                              <Grid item xs={12} key={idx}>
                                <video
                                  controls
                                  style={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreviewFile(file)}
                                >
                                  <source src={file.data} type={fileType} />
                                </video>
                              </Grid>
                            );
                          } else {
                            return (
                              <Grid
                                item
                                xs={12}
                                key={idx}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "10px", // ✅ Add space below PDFs
                                }}
                              >
                                <InsertDriveFileIcon sx={{ color: isSender ? "#FFF" : "#000", marginRight: "5px" }} />

                                {/* ✅ Keep filename on one line and truncate if needed */}
                                <Box
                                  sx={{
                                    maxWidth: "calc(100% - 40px)",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    color: isSender ? "#FFF" : "#000",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPreviewFile(file);
                                  }}
                                >
                                  {file.name}
                                </Box>
                              </Grid>
                            );
                          }
                        })}
                      </Grid>
                    )}
                  </Box>

                  {isSender && (
                    <Avatar
                      src={user?.profilePicture || "/assets/images/default-profile.png"}
                      sx={{ width: 40, height: 40, marginLeft: "8px" }}
                    />
                  )}
                </Box>

                {/* ✅ Timestamp */}
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#999",
                    marginTop: "5px",
                    textAlign: isSender ? "right" : "left",
                  }}
                >
                  {formattedTime}
                </Typography>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ChatMessages;
