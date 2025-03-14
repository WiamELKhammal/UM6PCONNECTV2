import React, { useState, useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import Divider from "@mui/material/Divider";

const Languages = ({ userId }) => {
  const [languagesList, setLanguagesList] = useState([]);

  const fetchLanguages = async () => {
    try {
      if (!userId) return;
      const response = await fetch(`http://localhost:5000/api/languages/${userId}`);
      const data = await response.json();
      setLanguagesList(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, [userId]);

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
        </div>
      </div>

      {/* Languages List */}
      {languagesList.length > 0 ? (
        languagesList.map((language, index) => (
          <div key={language._id || index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Aligned text and icon to the left
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
                    border: "2px solid #CCC",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#CCC",
                  }}
                >
                  <LanguageIcon style={{ color: "#ffffff", fontSize: "26px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{language.name || "Language Name"}</p>
                  <p style={{ color: "#333", fontSize: "14px" }}>{language.proficiency || "Proficiency Level"}</p>
                </div>
              </div>
            </div>
            {index < languagesList.length - 1 && (
              <Divider style={{ margin: "10px 0", backgroundColor: "#ddd", height: "1px", border: "none" }} />
            )}
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Aligned text and icon to the left
            gap: "15px",
            marginTop: "15px",
            color: "#000",
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
            <LanguageIcon style={{ color: "#ffffff", fontSize: "26px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Language Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Proficiency Level</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Languages;
