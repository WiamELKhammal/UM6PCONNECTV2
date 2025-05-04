import React, { useState, useContext, useRef } from "react";
import { Box, TextField, IconButton, Alert, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { io } from "socket.io-client";
import axios from "axios";
import Picker from "emoji-picker-react";
import RecordRTC from "recordrtc";

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");

const ChatInput = ({ recipientId, setMessages }) => {
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const recorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/webm",
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        timeSlice: 1000,
      });
      recorderRef.current = recorder;
      recorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        setIsRecording(false);
      });
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile({ name: file.name, data: reader.result, type: file.type, rawFile: file });
      };
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile && !audioBlob) {
      setError("You cannot send an empty message!");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("senderId", user._id);
    formData.append("receiverId", recipientId);
    formData.append("text", newMessage.trim());

    if (selectedFile) formData.append("file", selectedFile.rawFile);
    if (audioBlob) formData.append("file", audioBlob, "voice_message.webm");

    try {
      const response = await axios.post("http://localhost:5000/api/messages/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...response.data.data,
          text: newMessage.trim(), //  Use decrypted text on client-side
        },
      ]);
      
      socket.emit("sendMessage", response.data.data);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }

    setNewMessage("");
    setSelectedFile(null);
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setOpenEmojiPicker(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 1, backgroundColor: "#FFF", borderRadius: "30px", m: 1, border: "1px solid #ddd", position: "relative" }}>
      {error && <Alert severity="error" sx={{ width: "100%", fontSize: 12, mb: 1 }}>{error}</Alert>}

      {(selectedFile || audioUrl) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#f8f8f8", p: 1, borderRadius: 2, width: "100%", mb: 1 }}>
          {selectedFile ? (
            selectedFile.type.startsWith("image/") ? (
              <img src={selectedFile.data} alt="Preview" style={{ width: 50, height: 50, borderRadius: 5 }} />
            ) : (
              <Typography variant="body2">{selectedFile.name}</Typography>
            )
          ) : (
            <audio src={audioUrl} controls />
          )}
          <IconButton onClick={() => (selectedFile ? setSelectedFile(null) : setAudioBlob(null))} sx={{ color: "red" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {openEmojiPicker && <Box sx={{ position: "absolute", bottom: 60, left: 20, zIndex: 10 }}><Picker onEmojiClick={handleEmojiClick} /></Box>}

        <input type="file" ref={fileInputRef} hidden onChange={handleFileSelect} />
        <IconButton onClick={() => fileInputRef.current.click()} sx={{ color: "#ea3b15" }}><AddIcon /></IconButton>
        <IconButton onClick={() => setOpenEmojiPicker(!openEmojiPicker)} sx={{ color: "#ea3b15" }}><InsertEmoticonIcon /></IconButton>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ backgroundColor: "#FFF", borderRadius: "30px", padding: "0 10px", "& fieldset": { border: "none" }, minHeight: 45 }}
        />

        <IconButton onClick={isRecording ? stopRecording : startRecording} sx={{ color: "#ea3b15" }}>
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>

        <IconButton onClick={handleSendMessage} sx={{ backgroundColor: "#ea3b15", color: "#FFF" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
