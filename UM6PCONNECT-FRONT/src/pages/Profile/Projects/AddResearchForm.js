import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Chip, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddResearchForm = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    context: "",
    problem: "",
    methodology: "",
    role: "",
    findings: "",
    collaborators: "",
    institution: "",
    keywords: [],
    keywordInput: "",
    outputs: {
      pdf: "",
      github: "",
      link: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeywordAdd = () => {
    if (form.keywordInput.trim() && !form.keywords.includes(form.keywordInput.trim())) {
      setForm(prev => ({
        ...prev,
        keywords: [...prev.keywords, prev.keywordInput.trim()],
        keywordInput: "",
      }));
    }
  };

  const handleKeywordDelete = (kw) => {
    setForm(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== kw),
    }));
  };

  const handleOutputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      outputs: {
        ...prev.outputs,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.context) return alert("Title and Context are required.");
    onAdd({
      ...form,
      collaborators: form.collaborators.split(",").map(c => c.trim()).filter(Boolean),
    });
    onClose();
    setForm({
      title: "",
      context: "",
      problem: "",
      methodology: "",
      role: "",
      findings: "",
      collaborators: "",
      institution: "",
      keywords: [],
      keywordInput: "",
      outputs: {
        pdf: "",
        github: "",
        link: "",
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Your Research</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField name="title" label="Title" fullWidth required value={form.title} onChange={handleChange} />
          <TextField name="context" label="Context" fullWidth multiline rows={2} value={form.context} onChange={handleChange} />
          <TextField name="problem" label="Problem" fullWidth multiline rows={2} value={form.problem} onChange={handleChange} />
          <TextField name="methodology" label="Methodology" fullWidth multiline rows={2} value={form.methodology} onChange={handleChange} />
          <TextField name="role" label="Your Role" fullWidth multiline rows={2} value={form.role} onChange={handleChange} />
          <TextField name="findings" label="Findings" fullWidth multiline rows={2} value={form.findings} onChange={handleChange} />
          <TextField name="collaborators" label="Collaborators (comma-separated)" fullWidth value={form.collaborators} onChange={handleChange} />
          <TextField name="institution" label="Institution" fullWidth value={form.institution} onChange={handleChange} />
          
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Add Keyword"
              value={form.keywordInput}
              onChange={(e) => setForm({ ...form, keywordInput: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleKeywordAdd()}
              sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleKeywordAdd}><AddIcon /></IconButton>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {form.keywords.map((kw, idx) => (
              <Chip key={idx} label={kw} onDelete={() => handleKeywordDelete(kw)} />
            ))}
          </Stack>

          <TextField name="pdf" label="PDF Link (optional)" value={form.outputs.pdf} onChange={handleOutputChange} fullWidth />
          <TextField name="github" label="GitHub Repo (optional)" value={form.outputs.github} onChange={handleOutputChange} fullWidth />
          <TextField name="link" label="External Link (optional)" value={form.outputs.link} onChange={handleOutputChange} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddResearchForm;
