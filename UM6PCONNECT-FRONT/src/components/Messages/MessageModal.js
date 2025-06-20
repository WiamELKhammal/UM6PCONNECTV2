import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import { io } from 'socket.io-client';
import { UserContext } from '../../context/UserContext';

const socket = io(process.env.REACT_APP_SOCKET_URL || "https://um6pconnectv2-production.up.railway.app");

const MessageModal = ({ open, onClose, recipientId, recipientName }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSendMessage = async () => {
    if (!user) {
      // Guest: send via email
      if (recipientEmail) {
        const subject = encodeURIComponent('Message from UM6P Connect Guest');
        const body = encodeURIComponent(message);
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        onClose();
      }
      return;
    }
  
    // Connected user
    if (!message.trim() && files.length === 0) return;
  
    const formData = new FormData();
    formData.append("senderId", user._id);
    formData.append("receiverId", recipientId);
    formData.append("text", message.trim());
  
    files.forEach((file) => {
      formData.append("file", file);
    });
  
    try {
      const response = await fetch("https://um6pconnectv2-production.up.railway.app/api/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });
      
      
  
      const data = await response.json();
      if (response.ok) {
        socket.emit("sendMessage", data.data); // Emit via socket
        setMessage('');
        setFiles([]);
        onClose();
      } else {
        console.error("Message send failed:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: '.jpg, .jpeg, .png, .gif, .pdf, .docx, .txt',
  });

  useEffect(() => {
    const fetchRecipientEmail = async () => {
      if (!user && recipientId) {
        try {
          const res = await fetch(`https://um6pconnectv2-production.up.railway.app/api/profile/${recipientId}`);
          const data = await res.json();
          setRecipientEmail(data?.Email || '');
        } catch (err) {
          console.error('Error fetching recipient email:', err);
        }
      }
    };
    fetchRecipientEmail();
  }, [recipientId, user]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{`Message to ${recipientName}`}</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
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

        {user && (
          <>
            <Typography variant="subtitle1" gutterBottom>Attachments</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              By uploading and sharing content, you confirm you have the rights to do so.
            </Typography>

            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: '10px',
                padding: '1rem',
                mb: '1rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">Drag or click to add files</Typography>
            </Box>

            {files.length > 0 && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Files:
                </Typography>
                {files.map((file, index) => (
                  <Typography key={index} variant="body2">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                ))}
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
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
          sx={{
            backgroundColor: '#fff',
            color: '#ea3b15',
            '&:hover': {
              backgroundColor: '#ea3b15',
              color: '#fff',
            },
          }}
          disabled={!message.trim()}
        >
          {user ? 'Send Message' : 'Send via Email'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageModal;
