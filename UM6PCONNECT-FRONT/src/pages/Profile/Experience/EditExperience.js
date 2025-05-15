import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import debounce from "lodash.debounce";
import { UserContext } from "../../../context/UserContext";

const CLEARBIT_URL = "https://autocomplete.clearbit.com/v1/companies/suggest?query=";
const employmentTypes = ["Full-time", "Part-time", "Freelance", "Contract", "Internship", "Apprenticeship", "Seasonal"];

const EditExperience = ({ open, onClose, experienceData, fetchExperience }) => {
  const [form, setForm] = useState({
    companyName: "",
    companyLogo: "",
    jobTitle: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    location: "",
    industry: "",
    description: "",
    isCurrent: false,
  });

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const fetchCompanies = async (q) => {
    const res = await fetch(`${CLEARBIT_URL}${q}`);
    const data = await res.json();
    return data.map(item => ({
      name: item.name,
      logo: item.logo,
      domain: item.domain
    }));
  };
  const { user } = useContext(UserContext); // correctly using your user

  const handleSearch = debounce(async (text) => {
    if (!text || text.length < 2) return;
    setLoading(true);
    try {
      const results = await fetchCompanies(text);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    if (experienceData) {
      setForm({
        companyName: experienceData.companyName || "",
        companyLogo: experienceData.companyLogo || "",
        jobTitle: experienceData.jobTitle || "",
        employmentType: experienceData.employmentType || "",
        location: experienceData.location || "",
        industry: experienceData.industry || "",
        startDate: experienceData.startDate ? experienceData.startDate.split("T")[0] : "",
        endDate: experienceData.endDate === "Present" || !experienceData.endDate ? "" : experienceData.endDate.split("T")[0],
        description: experienceData.description || "",
        isCurrent: experienceData.endDate === "Present" || !experienceData.endDate,
      });

      setQuery(experienceData.companyName || "");
    }
  }, [experienceData]);

  useEffect(() => {
    handleSearch(query);
    return () => handleSearch.cancel();
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "companyName") setQuery(value);
  };

  const handleSelectCompany = (company) => {
    setForm((prev) => ({
      ...prev,
      companyName: company.name,
      companyLogo: company.logo,
    }));
    setQuery(company.name);
    setSearchResults([]);
  };

  const handleCheckboxChange = () => {
    setForm((prev) => ({
      ...prev,
      isCurrent: !prev.isCurrent,
      endDate: !prev.isCurrent ? "" : "Present",
    }));
  };

  const handleUpdate = async () => {
    if (!experienceData?._id) return;
  
    const updatedData = {
      ...form,
      endDate: form.isCurrent ? "Present" : form.endDate || null,
    };
  
    try {
      if (!user?.token) {
        console.error("Authentication token not found.");
        return;
      }
  
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/experience/${experienceData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // ✅ ADDED TOKEN
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        fetchExperience();
        onClose();
      } else {
        console.error("Failed to update experience");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Experience</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            {loading && <CircularProgress size={20} sx={{ mt: 1 }} />}
            {!loading && searchResults.length > 0 && (
              <List>
                {searchResults.map((result, index) => (
                  <ListItem key={index} button onClick={() => handleSelectCompany(result)}>
                    <ListItemAvatar>
                      <Avatar src={result.logo} />
                    </ListItemAvatar>
                    <ListItemText primary={result.name} secondary={result.domain} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Employment Type"
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
              fullWidth
            >
              {employmentTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          {!form.isCurrent && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={form.isCurrent} onChange={handleCheckboxChange} />}
              label="I am currently working here"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#000" }}>Cancel</Button>
        <Button onClick={handleUpdate} sx={{ backgroundColor: "#ea3b15", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExperience;
