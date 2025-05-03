import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Box,
  Alert,
} from "@mui/material";
import { useContext } from "react";
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

const SmartAddResearch = ({ open, onClose, onAdd }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    context: "",
    institution: "",
    collaborators: "",
    role: "",
    keywords: [],
  });

  const handleFetch = async () => {
    setLoading(true);
    setError("");

    try {
      let data = null;

      if (link.includes("doi.org")) {
        const id = encodeURIComponent(link);
        const res = await fetch(`https://api.openalex.org/works/${id}`);
        if (!res.ok) throw new Error("DOI not found");
        const result = await res.json();
        data = {
          title: result.title || "Untitled",
          context: result.abstract_inverted_index
            ? Object.keys(result.abstract_inverted_index).join(" ")
            : "",
          institution: result.institutions?.[0]?.display_name || "",
          collaborators: result.authorships
            ?.map((a) => a.author.display_name)
            .join(", ") || "",
        };
      } else if (link.includes("arxiv.org")) {
        const arxivId = link.split("/").pop();
        const res = await fetch(
          `https://export.arxiv.org/api/query?id_list=${arxivId}`
        );
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const title = xml.getElementsByTagName("title")[1]?.textContent || "";
        const summary = xml.getElementsByTagName("summary")[0]?.textContent || "";
        const authors = Array.from(xml.getElementsByTagName("author")).map(
          (a) => a.getElementsByTagName("name")[0]?.textContent
        );
        data = {
          title,
          context: summary,
          institution: "arXiv",
          collaborators: authors.join(", "),
        };
      } else {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(link)}`
        );
        const result = await res.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(result.contents, "text/html");
        const title = doc.querySelector("title")?.textContent || "Untitled";
        const desc =
          doc.querySelector("meta[name='description']")?.content || "";
        data = {
          title,
          context: desc,
          institution: "",
          collaborators: "",
        };
      }

      setForm((prev) => ({
        ...prev,
        title: data.title,
        context: data.context,
        institution: data.institution,
        collaborators: data.collaborators,
      }));
    } catch (err) {
      setError("Failed to import metadata. You can fill in the fields manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (e) => {
    const {
      target: { value },
    } = e;
    setForm((prev) => ({
      ...prev,
      keywords: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!link || !form.title || !form.context) {
      setError("Please fill in all required fields: URL, Title, and Summary.");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!userId) {
      setError("User not found.");
      return;
    }

    let base64File = null;
    if (file) {
      const base64 = await convertToBase64(file);
      base64File = {
        data: base64,
        name: file.name,
        type: file.type,
      };
    }

    const finalData = {
      userId,
      title: form.title,
      context: form.context,
      institution: form.institution,
      collaborators: form.collaborators.split(",").map((c) => c.trim()),
      role: form.role,
      keywords: form.keywords,
      outputs: {
        link,
        file: base64File,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // ✅ include token
        },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error("Failed to submit research");
      onAdd && onAdd();
      onClose();
      resetForm();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setLink("");
    setFile(null);
    setForm({
      title: "",
      context: "",
      institution: "",
      collaborators: "",
      role: "",
      keywords: [],
    });
    setError("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Research Work</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Typography fontSize={14} color="text.secondary">
            Enter a research URL (DOI, arXiv, or article page). Import metadata or type manually.
          </Typography>

          <TextField
            label="Research Link"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={handleFetch}
            disabled={loading || !link}
            sx={{
              borderColor: "#ea3b15",
              color: "#ea3b15",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ea3b15",
                color: "#fff",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Import Metadata"}
          </Button>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Summary or Context"
            name="context"
            fullWidth
            multiline
            rows={3}
            value={form.context}
            onChange={handleChange}
          />
          <TextField
            label="Institution"
            name="institution"
            fullWidth
            value={form.institution}
            onChange={handleChange}
          />
          <TextField
            label="Collaborators (comma-separated)"
            name="collaborators"
            fullWidth
            value={form.collaborators}
            onChange={handleChange}
          />
          <TextField
            label="Your Role"
            name="role"
            fullWidth
            value={form.role}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel >Keywords</InputLabel>
            <Select
              multiple
              value={form.keywords}
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

          {/* File Upload */}
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

  {file ? (
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
      Selected: {file.name}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#ea3b15", textTransform: "none" }}
        >
          Add to My Work
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SmartAddResearch;
