import React, { useState, useEffect } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const formatDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end === "Present" ? new Date() : new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years ? `${years} yr${years > 1 ? 's' : ''}` : ""}${years && remainingMonths ? " " : ""}${remainingMonths ? `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}` : ""}`;
  };

  return (
    <div
      className="box"
      style={{
        width: "90%",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Work Experience</h4>
      </div>

      {experienceList.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ApartmentIcon style={{ color: "#5a5a5a", fontSize: "40px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
              No experience added yet.
            </p>
            <p style={{ fontSize: "14px", color: "#777" }}>
              This section will be updated once experience details are shared.
            </p>
          </div>
        </div>
      ) : (
        experienceList.map((exp, index) => (
          <div key={exp._id || index} style={{ marginTop: index === 0 ? "0" : "20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "15px" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#FFF",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {exp.companyLogo ? (
                    <img
                      src={exp.companyLogo}
                      alt={exp.companyName}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <ApartmentIcon style={{ color: "#5a5a5a", fontSize: "40px" }} />
                  )}
                </div>
                <div style={{ maxWidth: "800px" }}>
                  <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: 4 }}>{exp.jobTitle}</p>
                  <p style={{ fontSize: "14px", color: "#555", marginBottom: 2 }}>{exp.companyName} · Full-time</p>
                  <p style={{ fontSize: "13px", color: "#777", marginBottom: 2 }}>
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)} · {formatDuration(exp.startDate, exp.endDate)}
                  </p>
                  {exp.location && (
                    <p style={{ fontSize: "13px", color: "#777", marginBottom: 2 }}>{exp.location}</p>
                  )}
                  {exp.description && (
                    <p style={{ fontSize: "14px", color: "#333", whiteSpace: "pre-wrap", wordBreak: "break-word", marginTop: 8 }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {index < experienceList.length - 1 && (
              <Divider style={{ margin: "14px 0", backgroundColor: "#ddd", height: "0.5px", border: "none" }} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Experience;
