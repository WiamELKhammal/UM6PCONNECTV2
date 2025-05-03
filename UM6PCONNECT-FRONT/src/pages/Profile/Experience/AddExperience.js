import React, { useState, useEffect, useContext } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Checkbox, FormControlLabel,
  CircularProgress, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, MenuItem, Grid
} from "@mui/material";
import { Alert } from "@mui/material";
import debounce from "lodash.debounce";
import { UserContext } from "../../../context/UserContext";

const employmentTypes = [
  "Full-time", "Part-time", "Freelance", "Contract",
  "Internship", "Apprenticeship", "Seasonal"
];

const AddExperience = ({ open, onClose, fetchExperience }) => {
  const { user } = useContext(UserContext);

  const [experience, setExperience] = useState({
    companyName: "",
    companyLogo: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    employmentType: "",
    location: "",
    industry: "",
    website: ""
  });

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const [error, setError] = useState("");

  // Match UM6P in any language
  const isUM6PName = (name = "") => {
    const n = name.toLowerCase();
    return (
      n.includes("um6p") ||
      n.includes("université mohammed vi polytechnique") ||
      n.includes("university mohammed vi polytechnic") ||
      n.includes("mohammed vi polytechnic university") ||
      n.includes("universidad mohammed vi politécnica") ||
      (n.includes("mohammed vi") && n.includes("poly"))
    );
  };

  const fetchAutocompleteResults = async (query) => {
    if (!query || query.length < 2) return [];

    const clearbitFetch = fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`)
      .then(res => res.json())
      .then(data =>
        data.map(item => ({
          name: item.name,
          logo: item.logo,
          domain: item.domain
        }))
      )
      .catch(() => []);

    const openAlexFetch = fetch(`https://api.openalex.org/institutions?search=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.results) return [];
        return data.results.map(inst => {
          const domain = inst?.homepage_url?.replace(/^https?:\/\//, "") || "";
          return {
            name: inst.display_name,
            logo: domain ? `https://logo.clearbit.com/${domain}` : "",
            domain
          };
        });
      })
      .catch(() => []);

    const [clearbitResults, openAlexResults] = await Promise.all([clearbitFetch, openAlexFetch]);

    const all = [...clearbitResults, ...openAlexResults];
    const unique = all.filter(
      (item, index, self) =>
        index === self.findIndex(r => r.name.toLowerCase() === item.name.toLowerCase())
    );

    return unique;
  };

  const handleSearch = debounce(async (text) => {
    if (!text || text.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const results = await fetchAutocompleteResults(text);
      setSearchResults(results);
    } catch (err) {
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    handleSearch(query);
    return () => handleSearch.cancel();
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience(prev => ({ ...prev, [name]: value }));
    if (name === "companyName") setQuery(value);
  };

  const handleSelectCompany = (company) => {
    const isUM6P = isUM6PName(company.name);

    setExperience(prev => ({
      ...prev,
      companyName: company.name,
      companyLogo: isUM6P ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/UM6P_wordmark_%282024%29.svg/1200px-UM6P_wordmark_%282024%29.svg.png" : company.logo || "",
      website: company.domain ? `https://${company.domain}` : ""
    }));
    setQuery(company.name);
    setSearchResults([]);
  };

  const handleCheckboxChange = (e) => {
    setIsPresent(e.target.checked);
    setExperience(prev => ({
      ...prev,
      endDate: e.target.checked ? "Present" : ""
    }));
  };

  const handleSave = async () => {
    setError("");
    if (!user?._id) {
      return setError("User not found.");
    }

    const requiredFields = ["companyName", "jobTitle", "startDate"];
    if (requiredFields.some(field => !experience[field]) || (!isPresent && !experience.endDate)) {
      return setError("Please fill in all required fields.");
    }

    try {
      if (!user?.token) {
        return setError("Authentication token not found.");
      }

      const res = await fetch("http://localhost:5000/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // ADDED token here
        },
        body: JSON.stringify({ ...experience, userId: user._id }),
      });
      

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save experience.");
      }

      fetchExperience();
      onClose();
    } catch (err) {
      console.error("Error saving experience:", err);
      setError(err.message || "Failed to save experience.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Experience</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              value={experience.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            {loading && <CircularProgress size={20} sx={{ mt: 1 }} />}
            {!loading && searchResults.length > 0 && (
              <List>
                {searchResults.map((result, index) => {
                  const isUM6P = isUM6PName(result.name);
                  const logo = isUM6P ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/UM6P_wordmark_%282024%29.svg/1200px-UM6P_wordmark_%282024%29.svg.png" : result.logo;

                  return (
                    <ListItem key={index} button onClick={() => handleSelectCompany(result)}>
                      <ListItemAvatar>
                        <Avatar src={logo}>{result.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={result.name}
                        secondary={result.domain || "No website"}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={experience.jobTitle}
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
              value={experience.employmentType}
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
              value={experience.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          {!isPresent && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={experience.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isPresent} onChange={handleCheckboxChange} />}
              label="I am currently working here"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={experience.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Industry"
              name="industry"
              value={experience.industry}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={experience.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ fontSize: "14px" }}>
                {error}
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#000" }}>Cancel</Button>
        <Button onClick={handleSave} sx={{ backgroundColor: "#ea3b15", color: "#fff" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExperience;
