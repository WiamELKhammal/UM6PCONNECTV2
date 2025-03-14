import React, { useState, useEffect } from "react";
import WorkIcon from "@mui/icons-material/Work";
import Divider from "@mui/material/Divider";

const Experience = ({ userId }) => {
  const [experienceList, setExperienceList] = useState([]);

  const fetchExperience = async () => {
    try {
      if (!userId) return;
      const response = await fetch(`http://localhost:5000/api/experience/${userId}`);
      const data = await response.json();
      setExperienceList(data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  useEffect(() => {
    fetchExperience();
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Work Experience</h4>
        </div>
      </div>

      {experienceList.length > 0 ? (
        experienceList.map((exp, index) => (
          <div key={exp._id || index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Aligned text and icon to the left
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
                  <WorkIcon style={{ color: "#ffffff", fontSize: "26px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{exp.companyName || "Company Name"}</p>
                  <p style={{ color: "#333", fontSize: "14px" }}>{exp.jobTitle || "Job Title"}</p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
            </div>
            {index < experienceList.length - 1 && (
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
            <WorkIcon style={{ color: "#ffffff", fontSize: "26px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Company Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Job Title</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
