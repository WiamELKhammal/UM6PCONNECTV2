import React, { useState, useEffect, useContext } from "react";
import SchoolIcon from "@mui/icons-material/School";
import Divider from "@mui/material/Divider";

const Education = ({ userId }) => {
    const [educationList, setEducationList] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchEducation = async () => {
        try {
            if (!userId) return;
            const response = await fetch(`http://localhost:5000/api/education/${userId}`);
            const data = await response.json();
            setEducationList(data);
        } catch (error) {
            console.error("Error fetching education:", error);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, [userId]);

    const formatDate = (date) => {
        if (date === "Present") return "Present";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
                </div>
            </div>

            {educationList.length > 0 ? (
                educationList.map((edu, index) => (
                    <div key={edu._id || index}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",  // Aligned text and icon to the left
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
                                        border: "2px solid #CCC",
                                        padding: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "#CCC",
                                    }}
                                >
                                    <SchoolIcon style={{ color: "#ffffff", fontSize: "26px" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "600", fontSize: "16px" }}>{edu.schoolName || "School Name"}</p>
                                    <p style={{ color: "#333", fontSize: "14px" }}>{edu.fieldOfStudy || "Field of Study"}</p>
                                    <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {index < educationList.length - 1 && (
                            <Divider style={{ margin: "10px 0", backgroundColor: "#ddd", height: "1px", border: "none" }} />
                        )}
                    </div>
                ))
            ) : (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",  // Aligned text and icon to the left
                        gap: "15px",
                        marginTop: "15px",
                        color: "#333",
                        fontSize: "14px",
                    }}
                >
                    <div
                        style={{
                            border: "2px solid #CCC",
                            padding: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#CCC",
                        }}
                    >
                        <SchoolIcon style={{ color: "#ffffff", fontSize: "26px" }} />
                    </div>
                    <div>
                        <p style={{ fontWeight: "600", fontSize: "16px" }}>School Name</p>
                        <p style={{ color: "#333", fontSize: "14px" }}>Field of Study</p>
                        <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Education;
