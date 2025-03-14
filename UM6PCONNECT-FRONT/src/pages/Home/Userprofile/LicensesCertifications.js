import React, { useState, useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import Divider from "@mui/material/Divider";

const LicensesCertifications = ({ userId }) => {
  const [licensesList, setLicensesList] = useState([]);

  const fetchLicenses = async () => {
    try {
      if (!userId) return;
      const response = await fetch(`http://localhost:5000/api/licenses/${userId}`);
      const data = await response.json();
      setLicensesList(data);
    } catch (error) {
      console.error("Error fetching licenses:", error);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, [userId]);

  const formatDate = (date) => {
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Licenses & Certifications</h4>
        </div>
      </div>

      {/* Licenses & Certifications List */}
      {licensesList.length > 0 ? (
        licensesList.map((license, index) => (
          <div key={license._id || index}>
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
                  <VerifiedIcon style={{ color: "#ffffff", fontSize: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>{license.licenseName || "Certification Name"}</p>
                  <p style={{ color: "#333", fontSize: "14px" }}>{license.issuedBy || "Issuing Organization"}</p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(license.issueDate)} - {license.expirationDate ? formatDate(license.expirationDate) : "No Expiration"}
                  </p>
                </div>
              </div>
            </div>
            {index < licensesList.length - 1 && (
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
            <VerifiedIcon style={{ color: "#ffffff", fontSize: "30px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Certification Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Issuing Organization</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Issue Date - Expiration Date</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicensesCertifications;
