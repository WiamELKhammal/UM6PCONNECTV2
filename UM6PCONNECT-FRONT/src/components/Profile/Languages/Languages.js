import React, { useState, useEffect, useContext } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import Divider from "@mui/material/Divider";
import AddLanguage from "./AddLanguage"; // Import Add Language Component
import EditLanguage from "./EditLanguage"; // Import Edit Language Component
import DeleteLanguage from "./DeleteLanguage"; // Import Delete Language Component
import { UserContext } from "../../../context/UserContext"; // Assuming you have UserContext

const Languages = () => {
    const { user } = useContext(UserContext); 
    const [languagesList, setLanguagesList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingLanguage, setEditingLanguage] = useState(null);
    const [deleteLanguageId, setDeleteLanguageId] = useState(null); // New state for deletion

    const fetchLanguages = async () => {
        try {
            if (!user?._id) return;
            const response = await fetch(`http://localhost:5000/api/languages/${user._id}`);
            const data = await response.json();
            setLanguagesList(data);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, [user]);

    const handleOpen = (language = null) => {
        setEditingLanguage(language);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingLanguage(null);
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
                    <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#d84b2b" }}>Languages</h4>
                    <p style={{ fontSize: "14px", color: "#666" }}>Add languages you speak to your profile.</p>
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

            {languagesList.length > 0 ? (
                languagesList.map((language, index) => (
                    <div key={language._id || index}>
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
                                    <LanguageIcon style={{ color: "#555", fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "500" }}>{language.name || "Language Name"}</p>
                                    <p style={{ color: "#666" }}>{language.proficiency || "Proficiency Level"}</p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <EditIcon
                                    onClick={() => handleOpen(language)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => setDeleteLanguageId(language._id)}
                                    style={{
                                        cursor: "pointer",
                                        color: "#d84b2b",
                                        fontSize: "24px",
                                    }}
                                />
                            </div>
                        </div>
                        {index < languagesList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
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
                            <LanguageIcon style={{ color: "#555", fontSize: "30px" }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: "500" }}>Language Name</p>
                            <p style={{ color: "#666" }}>Proficiency Level</p>
                        </div>
                    </div>
                </div>
            )}

            {editingLanguage ? (
                <EditLanguage
                    open={open}
                    onClose={handleClose}
                    fetchLanguages={fetchLanguages}
                    languageData={editingLanguage}
                />
            ) : (
                <AddLanguage open={open} onClose={handleClose} fetchLanguages={fetchLanguages} />
            )}

            <DeleteLanguage
                open={!!deleteLanguageId}
                onClose={() => setDeleteLanguageId(null)}
                languageId={deleteLanguageId} // Pass it here
                fetchLanguages={fetchLanguages} // Ensure the list updates after deletion
            />
        </div>
    );
};

export default Languages;
