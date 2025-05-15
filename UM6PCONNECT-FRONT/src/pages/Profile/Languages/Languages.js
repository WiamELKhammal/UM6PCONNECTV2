import React, { useState, useEffect, useContext } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";
import DeleteLanguage from "./DeleteLanguage";
import { UserContext } from "../../../context/UserContext";

const Languages = () => {
  const { user } = useContext(UserContext);
  const [languagesList, setLanguagesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [deleteLanguageId, setDeleteLanguageId] = useState(null);

  const fetchLanguages = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/languages/${user._id}`);
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
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundClip: "padding-box",
        boxShadow: "none",
      }}
    >
      {/* Title and Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Languages</h4>
          <p style={{ fontSize: "14px", color: "#000" }}>Add languages you speak to your profile.</p>
        </div>
        <AddIcon
          onClick={() => handleOpen(null)}
          style={{
            cursor: "pointer",
            color: "#ea3b15",
            border: "1px solid #ea3b15",
            borderRadius: "8px",
            padding: "5px",
            fontSize: "30px",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
      </div>

      {/* Placeholder for empty languages */}
      {languagesList.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Align to the left
            gap: "15px",
            marginTop: "15px",
            color: "#000",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              border: "2px solid #fff",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f4e9e7",
                  }}
          >
            <LanguageIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Language Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Proficiency Level</p>
          </div>
        </div>
      )}

      {/* Languages List */}
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
                color: "#000",
                fontSize: "14px",
                position: "relative",
                zIndex: 1,
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div
                  style={{
                    border: "2px solid #fff",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f4e9e7",
                  }}
                >
                  <LanguageIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>
                    {language.name || "Language Name"}
                  </p>
                  <p style={{ color: "#333", fontSize: "14px" }}>
                    {language.proficiency || "Proficiency Level"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <EditIcon
                  onClick={() => handleOpen(language)}
                  style={{
                    cursor: "pointer",
                    color: "#ea3b15",
                    fontSize: "24px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <DeleteIcon
                  onClick={() => setDeleteLanguageId(language._id)}
                  style={{
                    cursor: "pointer",
                    color: "#ea3b15",
                    fontSize: "24px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            </div>
            {index < languagesList.length - 1 && (
              <Divider
                style={{
                  margin: "10px 0",
                  backgroundColor: "#ddd",
                  height: "1px",
                  border: "none",
                }}
              />
            )}
          </div>
        ))
      ) : null}

      {/* Add or Edit Language Modal */}
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

      {/* Delete Language Modal */}
      <DeleteLanguage
        open={!!deleteLanguageId}
        onClose={() => setDeleteLanguageId(null)}
        languageId={deleteLanguageId}
        fetchLanguages={fetchLanguages}
      />
    </div>
  );
};

export default Languages;
