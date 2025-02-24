import React, { useState, useEffect, useContext } from "react";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import Divider from "@mui/material/Divider";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";
import DeleteEducation from "./DeleteEducation"; // Import DeleteEducation Component
import { UserContext } from "../../../context/UserContext";

const Education = () => {
    const { user } = useContext(UserContext);
    const [educationList, setEducationList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [deleteEducationId, setDeleteEducationId] = useState(null); // New state for deletion

    const fetchEducation = async () => {
        try {
            if (!user?._id) return;
            const response = await fetch(`http://localhost:5000/api/education/${user._id}`);
            const data = await response.json();
            setEducationList(data);
        } catch (error) {
            console.error("Error fetching education:", error);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, [user]);

    const handleOpen = (education = null) => {
        setEditingEducation(education);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingEducation(null);
    };

    return (
        <div
            className="box"
            style={{
                width: "90%",
                margin: "20px auto",
                padding: "20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
                position: "relative",
                border: "2px solid #ddd",
                borderRadius: "12px",
                backgroundClip: "padding-box",
                boxShadow: "none",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div>
                    <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#d84b2b" }}>Education</h4>
                    <p style={{ fontSize: "14px", color: "#666" }}>Add your education history to complete your profile.</p>
                </div>
                <AddIcon
                    onClick={() => handleOpen(null)}
                    style={{
                        cursor: "pointer",
                        color: "#d84b2b",
                        border: "1px solid #d84b2b",
                        borderRadius: "8px",
                        padding: "5px",
                        fontSize: "30px",
                    }}
                />
            </div>

            {educationList.length > 0 ? (
                educationList.map((edu, index) => (
                    <div key={edu._id || index}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "15px",
                                marginTop: "15px",
                                color: "#444",
                                fontSize: "14px",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div
                                    style={{
                                        border: "2px solid #ccc",
                                        padding: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#888",
                                    }}
                                >
                                    <SchoolIcon style={{ color: "#555", fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "500" }}>{edu.schoolName || "School Name"}</p>
                                    <p style={{ color: "#666" }}>{edu.fieldOfStudy || "Field of Study"}</p>
                                    <p style={{ color: "#999" }}>
                                        {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <EditIcon
                                    onClick={() => handleOpen(edu)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => setDeleteEducationId(edu._id)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                    }}
                                />
                            </div>
                        </div>
                        {index < educationList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
                    </div>
                ))
            ) : (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "15px",
                        marginTop: "15px",
                        color: "#444",
                        fontSize: "14px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <div
                            style={{
                                border: "2px solid #ccc",
                                padding: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#888",
                            }}
                        >
                            <SchoolIcon style={{ color: "#555", fontSize: "30px" }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: "500" }}>School Name</p>
                            <p style={{ color: "#666" }}>Field of Study</p>
                            <p style={{ color: "#999" }}>
                                Start Date - End Date
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {editingEducation ? (
                <EditEducation open={open} onClose={handleClose} fetchEducation={fetchEducation} educationData={editingEducation} />
            ) : (
                <AddEducation open={open} onClose={handleClose} fetchEducation={fetchEducation} />
            )}

            <DeleteEducation
                open={!!deleteEducationId}
                onClose={() => setDeleteEducationId(null)}
                educationId={deleteEducationId} // Pass it here
                fetchEducation={fetchEducation} // Ensure the list updates after deletion
            />
        </div>
    );
};

export default Education;
