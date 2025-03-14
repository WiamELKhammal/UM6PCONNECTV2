import React, { useState, useEffect, useContext } from "react";
import BuildIcon from "@mui/icons-material/Build"; // Changed the icon
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import { UserContext } from "../../../context/UserContext";

const Projects = () => {
  const { user } = useContext(UserContext);
  const [projectsList, setProjectsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  const fetchProjects = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`http://localhost:5000/api/projects/${user._id}`);
      const data = await response.json();
      setProjectsList(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const handleOpen = (project = null) => {
    setEditingProject(project);
    setOpen(true);
  };

  const formatDate = (date) => {
    if (date === "Present") return "Present";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Projects</h4>
          <p style={{ fontSize: "12px", color: "#5a5a5a" }}>Add your projects to showcase your work.</p>
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

      {/* Projects List */}
      {projectsList.length > 0 ? (
        projectsList.map((project, index) => (
          <div key={project._id || index}>
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
                    border: "2px solid #fff",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f4e9e7",
                  }}
                >
                  <BuildIcon style={{ color: "#d84b2b", fontSize: "26px" }} /> {/* Updated icon */}
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{project.name || "Project Name"}</p>
                  <p style={{ color: "#333", fontSize: "14px" }}>{project.description || "Project Description"}</p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <EditIcon
                  onClick={() => handleOpen(project)}
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
                  onClick={() => setDeleteProjectId(project._id)}
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
            justifyContent: "flex-start", // Text and icon aligned to the left
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
            <BuildIcon style={{ color: "#d84b2b", fontSize: "26px" }} /> {/* Updated icon */}
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Project Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Project Description</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
          </div>
        </div>
      )}

      {editingProject ? (
        <EditProject open={open} onClose={handleClose} fetchProjects={fetchProjects} projectData={editingProject} />
      ) : (
        <AddProject open={open} onClose={handleClose} fetchProjects={fetchProjects} />
      )}

      <DeleteProject
        open={!!deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        projectId={deleteProjectId}
        fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default Projects;
