import React, { useState, useEffect, useContext } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddLicense from "./AddLicense";
import EditLicense from "./EditLicense";
import DeleteLicense from "./DeleteLicense";
import { UserContext } from "../../../context/UserContext";

const LicensesCertifications = () => {
  const { user } = useContext(UserContext);
  const [licensesList, setLicensesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  const [deleteLicenseId, setDeleteLicenseId] = useState(null);

  const fetchLicenses = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`https://um6pconnectv2-production.up.railway.app/api/licenses/${user._id}`);
      const data = await response.json();
      setLicensesList(data);
    } catch (error) {
      console.error("Error fetching licenses:", error);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, [user]);

  const handleOpen = (license = null) => {
    setEditingLicense(license);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLicense(null);
  };

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
          <p style={{ fontSize: "12px", color: "#5a5a5a" }}>Add your licenses and certifications to your profile.</p>
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

      {/* Licenses & Certifications List */}
      {licensesList.length > 0 ? (
        licensesList.map((license, index) => (
          <div key={license._id || index}>
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
                  <VerifiedIcon style={{ color: "#ea3b15", fontSize: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>
                    {license.licenseName || "Certification Name"}
                  </p>
                  <p style={{ color: "#333", fontSize: "14px" }}>
                    {license.issuedBy || "Issuing Organization"}
                  </p>
                  <p style={{ color: "#5a5a5a", fontSize: "12px" }}>
                    {formatDate(license.issueDate)} - {license.expirationDate ? formatDate(license.expirationDate) : "No Expiration"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <EditIcon
                  onClick={() => handleOpen(license)}
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
                  onClick={() => setDeleteLicenseId(license._id)}
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
            justifyContent: "flex-start", // Align to the left
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
            <VerifiedIcon style={{ color: "#ea3b15", fontSize: "30px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Certification Name</p>
            <p style={{ color: "#333", fontSize: "14px" }}>Issuing Organization</p>
            <p style={{ color: "#5a5a5a", fontSize: "12px" }}>Issue Date - Expiration Date</p>
          </div>
        </div>
      )}

      {/* Modals for Add/Edit/Delete License */}
      {editingLicense ? (
        <EditLicense
          open={open}
          onClose={handleClose}
          fetchLicenses={fetchLicenses}
          licenseData={editingLicense}
        />
      ) : (
        <AddLicense open={open} onClose={handleClose} fetchLicenses={fetchLicenses} />
      )}

      <DeleteLicense
        open={!!deleteLicenseId}
        onClose={() => setDeleteLicenseId(null)}
        licenseId={deleteLicenseId}
        fetchLicenses={fetchLicenses}
      />
    </div>
  );
};

export default LicensesCertifications;
