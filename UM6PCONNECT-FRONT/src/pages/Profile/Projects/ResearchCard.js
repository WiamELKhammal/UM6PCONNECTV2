// SmartAddResearch.jsx
import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Typography, CircularProgress
} from "@mui/material";

const SmartAddResearch = ({ open, onClose, onAdd }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [form, setForm] = useState({ role: "", keywords: "" });

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setFetchedData(null);
    try {
      const id = encodeURIComponent(link);
      const res = await fetch(`https://api.openalex.org/works/https://doi.org/${id}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setFetchedData({
        title: data.title,
        context: data.abstract_inverted_index
          ? Object.keys(data.abstract_inverted_index).join(" ")
          : "",
        institution: data.institutions?.[0]?.display_name || "",
        collaborators: data.authorships?.map(a => a.author.display_name) || [],
        outputs: { link },
      });
    } catch (err) {
      setError("Couldn’t fetch research details. You can fill manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const finalData = {
      ...fetchedData,
      role: form.role,
      keywords: form.keywords.split(",").map(k => k.trim()).filter(Boolean),
    };
    onAdd(finalData);
    onClose();
    setLink("");
    setFetchedData(null);
    setForm({ role: "", keywords: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Research from Link</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="Paste Research Link (DOI, arXiv, etc.)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleFetch} disabled={loading || !link}>
            {loading ? <CircularProgress size={20} /> : "Fetch Details"}
          </Button>

          {error && <Typography color="error">{error}</Typography>}

          {fetchedData && (
            <>
              <Typography variant="h6">Auto-filled Info</Typography>
              <TextField label="Title" value={fetchedData.title} fullWidth disabled />
              <TextField
                label="Abstract (auto-fetched)"
                value={fetchedData.context}
                fullWidth
                multiline
                rows={3}
                disabled
              />
              <TextField
                label="Institution"
                value={fetchedData.institution}
                fullWidth
                disabled
              />
              <TextField
                label="Collaborators"
                value={fetchedData.collaborators.join(", ")}
                fullWidth
                disabled
              />
              <TextField
                label="Your Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Keywords (comma separated)"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!fetchedData || !form.role}
        >
          Save Research
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SmartAddResearch;
