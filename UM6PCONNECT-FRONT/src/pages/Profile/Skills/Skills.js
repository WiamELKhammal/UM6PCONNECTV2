import React, { useState, useEffect, useContext } from "react";
import BuildIcon from "@mui/icons-material/Build";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddSkill from "./AddSkills";
import EditSkill from "./EditSkills";
import DeleteSkill from "./DeleteSkill";
import { UserContext } from "../../../context/UserContext";

const Skills = () => {
    const { user } = useContext(UserContext);
    const [skillsList, setSkillsList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [deleteSkillId, setDeleteSkillId] = useState(null);

    const fetchSkills = async () => {
        try {
            if (!user?._id) return;
            const response = await fetch(`http://localhost:5000/api/skills/${user._id}`);
            const data = await response.json();
            setSkillsList(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [user]);

    const handleOpen = (skill = null) => {
        setEditingSkill(skill);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingSkill(null);
    };
    

    return (
        <div className="box" style={{ width: "90%", margin: "20px auto", padding: "20px", border: "2px solid #ddd", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div>
                    <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Skills</h4>
                    <p style={{ fontSize: "14px", color: "#000" }}>Add your skills to showcase your expertise.</p>
                </div>
                <AddIcon onClick={() => handleOpen(null)} style={{ cursor: "pointer", color: "#ea3b15", border: "1px solid #ea3b15", borderRadius: "8px", padding: "5px", fontSize: "30px" }} />
            </div>

            {skillsList.length > 0 ? (
                skillsList.map((skill, index) => (
                    <div key={skill._id || index}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div style={{ border: "2px solid #ccc", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <BuildIcon style={{ color: "#000", fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "500" }}>{skill.name || "Skill Name"}</p>
                                    <p style={{ color: "#000" }}>{skill.level || "Skill Level"}</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <EditIcon onClick={() => handleOpen(skill)} style={{ cursor: "pointer", color: "#ea3b15", fontSize: "24px" }} />
                                <DeleteIcon onClick={() => setDeleteSkillId(skill._id)} style={{ cursor: "pointer", color: "#ea3b15", fontSize: "24px" }} />
                            </div>
                        </div>
                        {index < skillsList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
                    </div>
                ))
            ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
                    <div style={{ border: "2px solid #ccc", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <BuildIcon style={{ color: "#000", fontSize: "30px" }} />
                    </div>
                    <div>
                        <p style={{ fontWeight: "500" }}>Skill Name</p>
                        <p style={{ color: "#000" }}>Skill Level</p>
                    </div>
                </div>
            )}

            {editingSkill ? (
                <EditSkill open={open} onClose={handleClose} fetchSkills={fetchSkills} skillData={editingSkill} />
            ) : (
                <AddSkill open={open} onClose={handleClose} fetchSkills={fetchSkills} />
            )}

            <DeleteSkill open={!!deleteSkillId} onClose={() => setDeleteSkillId(null)} skillId={deleteSkillId} fetchSkills={fetchSkills} />
        </div>
    );
};

export default Skills;
