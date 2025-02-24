import React, { useState, useEffect, useContext } from "react";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import DeleteExperience from "./DeleteExperience";
import { UserContext } from "../../../context/UserContext";

const Experience = () => {
  const { user } = useContext(UserContext);
  const [experienceList, setExperienceList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [deleteExperienceId, setDeleteExperienceId] = useState(null);

  const fetchExperience = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`http://localhost:5000/api/experience/${user._id}`);
      const data = await response.json();
      setExperienceList(data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, [user]);

  const handleOpen = (experience = null) => {
    setEditingExperience(experience);
    setOpen(true);
  };
  const formatDate = (date) => {
    if (date === "Present") return "Present";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

  const handleClose = () => {
    setOpen(false);
    setEditingExperience(null);
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#d84b2b" }}>Work Experience</h4>
          <p style={{ fontSize: "14px", color: "#666" }}>Add your work experience to complete your profile.</p>
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

      {experienceList.length > 0 ? (
        experienceList.map((exp, index) => (
          <div key={exp._id || index}>
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
                  <p style={{ fontWeight: "500" }}>{exp.companyName || "Company Name"}</p>
                  <p style={{ color: "#666" }}>{exp.jobTitle || "Job Title"}</p>
                  <p style={{ color: "#999" }}>
    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
</p>


                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <EditIcon
                  onClick={() => handleOpen(exp)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
                <DeleteIcon
                  onClick={() => setDeleteExperienceId(exp._id)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
              </div>
            </div>
            {index < experienceList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
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
              <p style={{ fontWeight: "500" }}>Company Name</p>
              <p style={{ color: "#666" }}>Job Title</p>
              <p style={{ color: "#999" }}>Start Date - End Date</p>
            </div>
          </div>
        </div>
      )}

      {editingExperience ? (
        <EditExperience open={open} onClose={handleClose} fetchExperience={fetchExperience} experienceData={editingExperience} />
      ) : (
        <AddExperience open={open} onClose={handleClose} fetchExperience={fetchExperience} />
      )}

      <DeleteExperience
        open={!!deleteExperienceId}
        onClose={() => setDeleteExperienceId(null)}
        experienceId={deleteExperienceId}
        fetchExperience={fetchExperience}
      />
    </div>
  );
};

export default Experience;
