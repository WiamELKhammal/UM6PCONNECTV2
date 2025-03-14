import React, { useState, useEffect, useContext } from "react";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";
import DeleteEducation from "./DeleteEducation";
import { UserContext } from "../../../context/UserContext";

const Education = () => {
    const { user } = useContext(UserContext);
    const [educationList, setEducationList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [deleteEducationId, setDeleteEducationId] = useState(null);

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

    const formatDate = (date) => {
        if (date === "Present") return "Present";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
                border: "1px solid #ddd",
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
                    marginBottom: "15px",
                }}
            >
                <div>
                    <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Education</h4>
                    <p style={{ fontSize: "12px", color: "#5a5a5a" }}>Add your education history to complete your profile.</p>
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
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
            </div>

            {/* Placeholder only when no education data exists */}
            {educationList.length === 0 && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginTop: "15px",
                        color: "#333",
                        fontSize: "14px",
                        justifyContent: "flex-start",
                    }}
                >
                    <div
                        style={{
                            border: "2px solid #ffff",
                                        padding: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "#f4e9e7",
                        }}
                    >
                        <SchoolIcon style={{ color: "#d84b2b", fontSize: "26px" }} />
                    </div>
                    <div>
                        <p style={{ fontWeight: "600", fontSize: "16px" }}>School Name</p>
                        <p style={{ color: "#333", fontSize: "14px" }}>Field of Study</p>
                        <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
                    </div>
                </div>
            )}

            {/* Display Education List if available */}
            {educationList.length > 0 &&
                educationList.map((edu, index) => (
                    <div key={edu._id || index}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "15px",
                                marginTop: "15px",
                                color: "#333",
                                fontSize: "14px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                padding: "12px",
                                backgroundColor: "#ffffff",
                                position: "relative",
                                zIndex: 1,
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div
                                    style={{
                                        border: "2px solid #ffff",
                                        padding: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "#f4e9e7",
                                    }}
                                >
                                    <SchoolIcon style={{ color: "#d84b2b", fontSize: "26px" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "600", fontSize: "16px" }}>{edu.schoolName || "School Name"}</p>
                                    <p style={{ color: "#333", fontSize: "14px" }}>{edu.fieldOfStudy || "Field of Study"}</p>
                                    <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "12px" }}>
                                <EditIcon
                                    onClick={() => handleOpen(edu)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                                />
                                <DeleteIcon
                                    onClick={() => setDeleteEducationId(edu._id)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                                />
                            </div>
                        </div>
                        {index < educationList.length - 1 && <Divider style={{ margin: "10px 0", backgroundColor: "#ddd", height: "1px", border: "none" }} />}
                    </div>
                ))}

            {editingEducation ? (
                <EditEducation open={open} onClose={handleClose} fetchEducation={fetchEducation} educationData={editingEducation} />
            ) : (
                <AddEducation open={open} onClose={handleClose} fetchEducation={fetchEducation} />
            )}

            <DeleteEducation
                open={!!deleteEducationId}
                onClose={() => setDeleteEducationId(null)}
                educationId={deleteEducationId}
                fetchEducation={fetchEducation}
            />
        </div>
    );
};

export default Education;
