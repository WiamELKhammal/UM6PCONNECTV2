import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddSkill = ({ open, onClose, onAdd }) => {
    const [skill, setSkill] = useState("");
    const [level, setLevel] = useState("");
    const [skillSuggestions, setSkillSuggestions] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch("https://raw.githubusercontent.com/jakebathman/Skills-API/main/skills.json");
                const data = await response.json();
                setSkillSuggestions(data.skills || []);
            } catch (error) {
                console.error("Error fetching skills:", error);
                setSkillSuggestions(["JavaScript", "React", "Node.js", "Python", "Django"]); // Fallback options
            }
        };
        fetchSkills();
    }, []);

    const handleAdd = () => {
        if (skill && level) {
            onAdd({ name: skill, level });
            setSkill("");
            setLevel("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    fullWidth
                    label="Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    margin="normal"
                >
                    {skillSuggestions.map((s, index) => (
                        <MenuItem key={index} value={s}>
                            {s}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    margin="normal"
                >
                    {["Beginner", "Intermediate", "Advanced", "Expert"].map((lvl) => (
                        <MenuItem key={lvl} value={lvl}>
                            {lvl}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleAdd} color="primary" disabled={!skill || !level}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSkill;
