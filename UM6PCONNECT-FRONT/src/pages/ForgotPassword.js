import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Reset link sent! Check your inbox.");
        setError("");
      } else {
        setError(data.error || "Reset failed.");
        setMessage("");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setMessage("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#ffff", px: 2,boxShadow:"none" }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 3,
          border: "1px solid #ddd",
          boxShadow:"none"
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Forgot Password
        </Typography>
        <Typography fontSize={14} mb={2}>
          Enter your email to receive a reset link:
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ea3b15",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#c83812",
            },
          }}
        >
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
