import React, { useState, useEffect } from "react";
import BuildIcon from "@mui/icons-material/Build"; // Changed the icon
import Divider from "@mui/material/Divider";

const Projects = ({ userId }) => {
  const [projectsList, setProjectsList] = useState([]);

  const fetchProjects = async () => {
    try {
      if (!userId) return;
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/projects/${userId}`);
      const data = await response.json();
      setProjectsList(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
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
      {/* Title and Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div>
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Projects</h4>
        </div>
      </div>

      {/* Projects List */}
      {projectsList.length > 0 ? (
        projectsList.map((project, index) => (
          <div key={project._id || index}>
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
                    border: "2px solid #fff",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f4e9e7",
                  }}
                >
                  <BuildIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{project.name || "Project Name"}</p>
                  <p style={{ color: "#000", wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {project.description || "Project Description"}
                  </p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                </div>
              </div>
            </div>
            {index < projectsList.length - 1 && (
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
              border: "2px solid #fff",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#f4e9e7",
            }}
          >
            <BuildIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Project Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Project Description</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
