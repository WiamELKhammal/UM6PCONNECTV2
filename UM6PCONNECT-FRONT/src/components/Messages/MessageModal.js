import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import { io } from "socket.io-client";
import { UserContext } from '../../context/UserContext';

// Initialize socket connection
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");

const MessageModal = ({ open, onClose, recipientId, recipientName }) => {
  const { user } = useContext(UserContext); // Get the current user
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() || files.length > 0) {
      const fileDataPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve({ name: file.name, data: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file); // Convert to base64
        });
      });

      Promise.all(fileDataPromises)
        .then((convertedFiles) => {
          const messageData = {
            senderId: user._id,
            receiverId: recipientId,
            text: message,
            files: convertedFiles,
          };

          // Emit the message via WebSocket
          socket.emit("sendMessage", messageData);

          console.log(`Message sent to ${recipientName}: ${message}`);
          console.log('Files:', convertedFiles);

          // Reset state
          setMessage("");
          setFiles([]);
          onClose();
        })
        .catch((error) => {
          console.error('Error converting files to base64:', error);
        });
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: '.jpg, .jpeg, .png, .gif, .pdf, .docx, .txt',
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{`Message to ${recipientName}`}</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>Message</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder={`Type your message to ${recipientName}...`}
          value={message}
          onChange={handleMessageChange}
          sx={{
            marginBottom: '1rem',
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ea3b15',
            },
          }}
        />

        <Typography variant="subtitle1" gutterBottom>Attachments</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
          By uploading and sharing this content, you confirm you have any necessary rights to do so.
        </Typography>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1rem',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Typography variant="body2" color="textSecondary">
            Drag and drop your files here or click to select files
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: .jpg, .jpeg, .png, .gif, .pdf, .docx, .txt
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "1rem" }}>
          {files.length > 0 && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Files to be sent:
            </Typography>
          )}
          {files.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            borderColor: '#ea3b15',
            color: '#ea3b15',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#ea3b15',
            },
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSendMessage}
          color="primary"
          sx={{
            backgroundColor: '#fff',
            color: '#ea3b15',
            '&:hover': {
              backgroundColor: '#ea3b15',
              color: 'white',
            },
          }}
          disabled={!message.trim() && files.length === 0}
        >
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageModal;