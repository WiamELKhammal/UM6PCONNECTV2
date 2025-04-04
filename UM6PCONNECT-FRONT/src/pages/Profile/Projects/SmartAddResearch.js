import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Typography, CircularProgress,
  Select, MenuItem, FormControl, InputLabel, OutlinedInput, Chip, Box, Alert
} from "@mui/material";

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
  const [form, setForm] = useState({
    title: "",
    context: "",
    institution: "",
    collaborators: "",
    role: "",
    keywords: [],
    link: "",
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
          collaborators: result.authorships?.map(a => a.author.display_name).join(", ") || "",
        };
      } else if (link.includes("arxiv.org")) {
        const arxivId = link.split("/").pop();
        const res = await fetch(`https://export.arxiv.org/api/query?id_list=${arxivId}`);
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const title = xml.getElementsByTagName("title")[1]?.textContent || "Untitled";
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
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`);
        const result = await res.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(result.contents, "text/html");
        const title = doc.querySelector("title")?.textContent || "Untitled Article";
        const desc = doc.querySelector("meta[name='description']")?.content || "";
        data = {
          title,
          context: desc,
          institution: "",
          collaborators: "",
        };
      }

      setForm(prev => ({
        ...prev,
        title: data.title,
        context: data.context,
        institution: data.institution,
        collaborators: data.collaborators,
        link
      }));
    } catch (err) {
      setError("Could not import metadata. You can fill the fields manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (e) => {
    const {
      target: { value },
    } = e;
    setForm(prev => ({
      ...prev,
      keywords: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = () => {
    if (!link || !form.title.trim() || !form.context.trim()) {
      setError("Please fill in all required fields: URL, Title, and Summary.");
      return;
    }

    const finalData = {
      title: form.title.trim(),
      context: form.context.trim(),
      institution: form.institution.trim(),
      collaborators: form.collaborators.split(",").map(c => c.trim()).filter(Boolean),
      role: form.role.trim(),
      keywords: form.keywords,
      outputs: { link: link.trim() },
    };

    onAdd(finalData);
    onClose();
    setLink("");
    setForm({
      title: "",
      context: "",
      institution: "",
      collaborators: "",
      role: "",
      keywords: [],
      link: ""
    });
    setError("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Research Work</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Typography fontSize={14} color="text.secondary">
            Enter the research link (DOI, arXiv, or website). You can import metadata or type it manually.
          </Typography>

          <TextField
            label="Publication URL (required)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            required
          />

          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleFetch}
              disabled={loading || !link}
              sx={{
                borderColor: "#ea3b15",
                color: "#ea3b15",
                width: "100%",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fff",
                  color:'white',
                  backgroundColor: "#ea3b15",
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#ea3b15" }} /> : "Import Metadata"}
            </Button>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box mt={3}>
            <Typography variant="h6" align="left" fontWeight={300} gutterBottom color="#000">
              Imported Metadata
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Publication Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Summary or Abstract"
                name="context"
                value={form.context}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Institution (optional)"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Co-authors (comma-separated)"
                name="collaborators"
                value={form.collaborators}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Your Contribution"
                name="role"
                value={form.role}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Keywords (select one or more)</InputLabel>
                <Select
                  multiple
                  value={form.keywords}
                  onChange={handleKeywordChange}
                  input={<OutlinedInput label="Keywords (select one or more)" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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

              {/* Dotted upload area */}
              <Box
                sx={{
                  border: "2px dotted #C5C5C5",
                  borderRadius: "12px",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography fontWeight={500} mb={1} fontSize={14}>
                  Attach a file (PDF, image, or document)
                </Typography>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#000",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!link}
          sx={{
            backgroundColor: "#ea3b15",
            boxShadow: "none",
          }}
        >
          Add to My Work
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SmartAddResearch;
