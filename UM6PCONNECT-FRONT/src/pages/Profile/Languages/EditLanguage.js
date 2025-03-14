import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { UserContext } from "../../../context/UserContext"; // Import du contexte utilisateur

const EditLanguage = ({ open, onClose, languageData, fetchLanguages }) => {
  const { user } = useContext(UserContext); // Récupérer l'utilisateur du contexte
  const [language, setLanguage] = useState({
    name: "",
    proficiency: "",
  });
  const [languagesList, setLanguagesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const proficiencyLevels = ["Basic", "Intermediate", "Advanced", "Native"];

  useEffect(() => {
    if (languageData) {
      setLanguage({
        name: languageData.name || "",
        proficiency: languageData.proficiency || "",
      });
    }
  }, [languageData]);

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

  const handleUpdate = async () => {
    setError("");

    if (!languageData?._id) {
      setError("Language ID is missing. Cannot update language.");
      return;
    }

    if (!language.name || !language.proficiency) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/languages/${languageData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(language),
      });

      if (response.ok) {
        fetchLanguages();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update language.");
      }
    } catch (error) {
      setError("An error occurred while updating the language.");
      console.error("Failed to update language:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Language</DialogTitle>
      <DialogContent>
        <p style={{ fontSize: "14px", color: "#666" }}>Update the details of the language below.</p>

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

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} style={{ backgroundColor: "#d84b2b", color: "#fff" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLanguage;
