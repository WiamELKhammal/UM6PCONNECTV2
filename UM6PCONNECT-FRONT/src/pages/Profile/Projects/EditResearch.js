import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const tagList = [
  "Web Development",
  "Node.js",
  "Material Science",
  "Energy",
  "AI",
  "CSS",
  "HTML",
];

const EditResearch = ({ research, onClose, onUpdate }) => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    ...research,
    collaborators: research.collaborators?.join(", ") || "",
    keywords: research.keywords || [],
    link: research.outputs?.link || "",
    file: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData((prev) => ({
      ...prev,
      keywords: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, file }));
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!formData.title || !formData.context) {
      setError("Title and context are required.");
      return;
    }

    const updatedData = {
      ...formData,
      collaborators: formData.collaborators
        ?.split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      keywords: formData.keywords,
      outputs: {
        link: formData.link,
      },
    };

    if (formData.file) {
      const base64 = await convertToBase64(formData.file);
      updatedData.outputs.file = {
        data: base64,
        name: formData.file.name,
        type: formData.file.type,
      };
    }

    try {
      const res = await fetch(
        `https://um6pconnectv2-production.up.railway.app/api/research/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // ✅ Attach token
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update research.");
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Research</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          <TextField
            label="Institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Collaborators (comma-separated)"
            name="collaborators"
            value={formData.collaborators}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Keywords</InputLabel>
            <Select
              multiple
              value={formData.keywords}
              onChange={handleKeywordChange}
              input={<OutlinedInput label="Keywords" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {tagList.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
          />

<Box
  sx={{
    border: "2px dotted #aaa",
    padding: 2,
    borderRadius: 2,
    textAlign: "center",
  }}
>
  <Typography variant="body2" mb={1}>
    Upload supporting file (optional)
  </Typography>

  <Button
    component="label"
    variant="outlined"
    sx={{ mt: 1, textTransform: "none" }}
  >
    Choose File
    <input type="file" hidden onChange={handleFileChange} />
  </Button>

  {formData.file ? (
    <Typography
      variant="body2"
      mt={1}
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      Selected: {formData.file.name}
    </Typography>
  ) : (
    <Typography
      variant="body2"
      mt={1}
      sx={{ color: "#888" }}
    >
      No file selected
    </Typography>
  )}
</Box>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ bgcolor: "#ea3b15", color: "#fff", textTransform: "none" }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditResearch;
