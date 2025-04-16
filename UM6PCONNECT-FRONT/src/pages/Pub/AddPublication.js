import React, { useState, useContext } from "react";
import {
  TextField, Button, Select, MenuItem, FormControl,
  InputLabel, Box, Typography, IconButton, Snackbar, Alert
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";

const AddPublication = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    authors: [""],
    date: "",
    link: "",
    file: null, // { name, data, mimetype }
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addAuthor = () => {
    setFormData({ ...formData, authors: [...formData.authors, ""] });
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    setFormData({ ...formData, authors: newAuthors });
  };

  const removeAuthor = (index) => {
    const newAuthors = formData.authors.filter((_, i) => i !== index);
    setFormData({ ...formData, authors: newAuthors });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        file: {
          name: file.name,
          data: reader.result, // base64 string
          mimetype: file.type,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setSnackbar({ open: true, message: "User ID is missing!", severity: "error" });
      return;
    }

    try {
      const payload = {
        userId,
        type: formData.type,
        title: formData.title,
        authors: JSON.stringify(formData.authors),
        date: formData.date,
        link: formData.link,
        file: formData.file || null,
      };

      const res = await fetch("http://localhost:5000/api/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");

      setSnackbar({ open: true, message: "Publication added successfully!", severity: "success" });
      setFormData({ type: "", title: "", authors: [""], date: "", link: "", file: null });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: "Failed to submit publication.", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        p: 4,
        mt: 5,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: "none",
        width: "90%",
        maxWidth: 600,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, left: 10, color: "#e04c2c" }}
      >
        <Close />
      </IconButton>

      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Publication
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Publication Type</InputLabel>
          <Select name="type" value={formData.type} onChange={handleChange} required>
            <MenuItem value="journal">Journal Article</MenuItem>
            <MenuItem value="conference">Conference Paper</MenuItem>
            <MenuItem value="book">Book</MenuItem>
            <MenuItem value="thesis">Thesis</MenuItem>
            <MenuItem value="tech-report">Technical Report</MenuItem>
            <MenuItem value="preprint">Preprint</MenuItem>
            <MenuItem value="book-chapter">Book Chapter</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          inputProps={{ minLength: 6, maxLength: 500 }}
          sx={{ mb: 2 }}
        />

        <Typography variant="body1" sx={{ mb: 1 }}>
          Authors:
        </Typography>
        {formData.authors.map((author, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              label={`Author ${index + 1}`}
              value={author}
              onChange={(e) => handleAuthorChange(index, e.target.value)}
              required
            />
            {index > 0 && (
              <IconButton onClick={() => removeAuthor(index)} color="error">
                <Remove />
              </IconButton>
            )}
          </Box>
        ))}
        <Button startIcon={<Add />} onClick={addAuthor} sx={{ mb: 2, color: "#e04c2c" }}>
          Add Author
        </Button>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Upload File (optional):
          </Typography>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              bgcolor: "#fff",
              color: "#e04c2c",
              border: "1px solid #e04c2c",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Select and Upload File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formData.file && (
            <Typography sx={{ mt: 1, color: "#555" }}>
              {formData.file.name}
            </Typography>
          )}
        </Box>

        <TextField
          fullWidth
          label="Publication Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Publication Link"
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#e04c2c",
            color: "white",
            boxShadow: "none",
            "&:hover": { bgcolor: "#b43e24", boxShadow: "none" },
          }}
        >
          Submit
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPublication;
