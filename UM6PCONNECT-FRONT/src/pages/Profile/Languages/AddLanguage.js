import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { UserContext } from "../../../context/UserContext"; // Import du contexte utilisateur

const AddLanguage = ({ open, onClose, fetchLanguages }) => {
  const { user } = useContext(UserContext); // Récupérer l'utilisateur du contexte
  const [language, setLanguage] = useState({
    name: "",
    proficiency: "",
  });
  const [languagesList, setLanguagesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const proficiencyLevels = ["Basic", "Intermediate", "Advanced", "Native"];

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const languages = data
          .map((country) => country.languages)
          .filter(Boolean)
          .flatMap((langs) => Object.values(langs))
          .filter((value, index, self) => self.indexOf(value) === index);

        setLanguagesList(languages);
      } catch (error) {
        console.error("Failed to fetch languages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleChange = (e) => {
    setLanguage({ ...language, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (language.name && language.proficiency) {
      if (!user?._id) {
        console.error("User ID is missing. Cannot add language.");
        return;
      }
      try {
        const response = await fetch("https://um6pconnectv2-production.up.railway.app/api/languages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...language,
            userId: user._id, // Correctly include the userId in the request
          }),
        });

        if (response.ok) {
          fetchLanguages();
          onClose();
        } else {
          console.error("Failed to save language. Server response:", await response.json());
        }
      } catch (error) {
        console.error("Failed to save language", error);
      }
    } else {
      console.error("All fields are required");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Language</DialogTitle>
      <DialogContent>
        <p style={{ fontSize: "14px", color: "#666" }}>Fill in the fields below to add a new language.</p>

        {/* Language Select Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Language</InputLabel>
          <Select
            label="Language"
            name="name"
            value={language.name}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "155px", // Limit the height of the dropdown
                  overflowY: "auto", // Enable scroll if the list is too long
                },
              },
            }}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              languagesList.map((lang, index) => (
                <MenuItem key={index} value={lang}>
                  {lang}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Proficiency Level Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Proficiency Level</InputLabel>
          <Select
            label="Proficiency Level"
            name="proficiency"
            value={language.proficiency}
            onChange={handleChange}
          >
            {proficiencyLevels.map((level, index) => (
              <MenuItem key={index} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#ea3b15", color: "#fff" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLanguage;
