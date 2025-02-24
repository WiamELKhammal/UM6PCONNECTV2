import React, { useState, useEffect, useContext } from "react";
import WorkIcon from "@mui/icons-material/Work";
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#d84b2b" }}>Projects</h4>
          <p style={{ fontSize: "14px", color: "#666" }}>Add your projects to showcase your work.</p>
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
                  <WorkIcon style={{ color: "#555", fontSize: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>{project.title || "Project Title"}</p>
                  <p style={{ color: "#666", wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {project.description || "Project Description"}
                  </p>
                  <p style={{ color: "#999" }}>
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <EditIcon
                  onClick={() => handleOpen(project)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
                <DeleteIcon
                  onClick={() => setDeleteProjectId(project._id)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
              </div>
            </div>
            {index < projectsList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
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
              <WorkIcon style={{ color: "#555", fontSize: "30px" }} />
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Project Title</p>
              <p style={{ color: "#666" }}>Project Description</p>
              <p style={{ color: "#999" }}>Start Date - End Date</p>
            </div>
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
