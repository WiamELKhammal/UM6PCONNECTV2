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
          <p style={{ fontSize: "12px", color: "#5a5a5a" }}>Add your work experience to complete your profile.</p>
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

      {/* Placeholder block only when experience list is empty */}
      {experienceList.length === 0 && (
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
              border: "2px solid #fff",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f4e9e7",
            }}
          >
            <WorkIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Company Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Job Title</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Start Date - End Date</p>
          </div>
        </div>
      )}

      {/* Display the Experience List if available */}
      {experienceList.length > 0 &&
        experienceList.map((exp, index) => (
          <div key={exp._id || index}>
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
                  <WorkIcon style={{ color: "#ea3b15", fontSize: "26px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{exp.companyName || "Company Name"}</p>
                  <p style={{ color: "#333", fontSize: "14px" }}>{exp.jobTitle || "Job Title"}</p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <EditIcon
                  onClick={() => handleOpen(exp)}
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
                  onClick={() => setDeleteExperienceId(exp._id)}
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
            {index < experienceList.length - 1 && <Divider style={{ margin: "10px 0", backgroundColor: "#ddd", height: "1px", border: "none" }} />}
          </div>
        ))}

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
