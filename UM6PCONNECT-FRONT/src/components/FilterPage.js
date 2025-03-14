import React, { useState, useEffect } from 'react';
import { TextField, Button, DialogActions, Checkbox, FormControlLabel, Divider, IconButton, Box, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';

const FilterPage = ({ onApplyFilter, onClose }) => {
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [headline, setHeadline] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [languagesOptions, setLanguagesOptions] = useState([]);

  useEffect(() => {
    // Fetch dynamic data for languages, educations, and experiences (you can adjust the endpoints based on your API)
    async function fetchFilterOptions() {
      try {
        const response = await fetch('http://localhost:5000/api/filters'); // Adjust the API endpoint
        const data = await response.json();
        setLanguagesOptions(data.languages); // Example: [{ name: "English" }, { name: "French" }, ...]
        // Set other data like educations and experiences similarly
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    }

    fetchFilterOptions();
  }, []);

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setSelectedLanguages((prev) =>
      prev.includes(value) ? prev.filter((lang) => lang !== value) : [...prev, value]
    );
  };

  const handleApplyFilters = async () => {
    const filters = {
      location,
      email,
      headline,
      address,
      firstName,
      lastName,
      department,
      languages: selectedLanguages,
      educations,
      experiences
    };

    // Make API call to filter users
    const response = await fetch('http://localhost:5000/api/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });

    if (response.ok) {
      const data = await response.json();
      onApplyFilter(data);  // Pass filtered users to parent component
    } else {
      const error = await response.json();
      console.error("Error applying filters: ", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        borderRadius: 2,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="black">Filter Options</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: '#d84b2b' }} />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Customize your search criteria
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* First Name and Last Name fields in the same row */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Department field */}
      <TextField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <ApartmentIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
        }}
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#d84b2b', // Red label when focused
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d84b2b', // Red border when focused
          },
        }}
      />

      {/* Location and Email fields in the same row */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Headline and Address fields in the same row */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <WorkIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <HomeIcon sx={{ color: '#d84b2b', marginRight: 1 }} />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#d84b2b', // Red label when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d84b2b', // Red border when focused
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Language Filter - Checkboxes in same row */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>Languages:</Typography>
        {languagesOptions.map((language) => (
          <FormControlLabel
            key={language.name}
            control={<Checkbox onChange={handleLanguageChange} value={language.name} />}
            label={language.name}
          />
        ))}
      </Box>

      {/* Education Filter */}
      <TextField
        label="Education"
        value={educations}
        onChange={(e) => setEducations(e.target.value.split(','))}
        fullWidth
        margin="normal"
        helperText="Enter educations separated by commas"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#d84b2b', // Red label when focused
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d84b2b', // Red border when focused
          },
        }}
      />

      {/* Experience Filter */}
      <TextField
        label="Experience"
        value={experiences}
        onChange={(e) => setExperiences(e.target.value.split(','))}
        fullWidth
        margin="normal"
        helperText="Enter experiences separated by commas"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#d84b2b', // Red label when focused
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d84b2b', // Red border when focused
          },
        }}
      />

      <Divider sx={{ marginBottom: 2 }} />

      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>Cancel</Button>
        <Button onClick={handleApplyFilters} style={{ backgroundColor: "#d84b2b", color: "white" }}>Apply Filter</Button>
      </DialogActions>
    </Box>
  );
};

export default FilterPage;
