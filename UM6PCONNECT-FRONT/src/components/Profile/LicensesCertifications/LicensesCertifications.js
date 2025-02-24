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
      const response = await fetch(`http://localhost:5000/api/licenses/${user._id}`);
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
      {/* Title and Add Button */}
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#d84b2b" }}>Licenses & Certifications</h4>
          <p style={{ fontSize: "14px", color: "#666" }}>Add your licenses and certifications to your profile.</p>
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
                  <VerifiedIcon style={{ color: "#555", fontSize: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>{license.licenseName || "Certification Name"}</p>
                  <p style={{ color: "#666" }}>{license.issuedBy || "Issuing Organization"}</p>
                  <p style={{ color: "#999" }}>
                    {new Date(license.issueDate).toISOString().split("T")[0]} -
                    {license.expirationDate ? new Date(license.expirationDate).toISOString().split("T")[0] : "No Expiration"}
                  </p>


                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <EditIcon
                  onClick={() => handleOpen(license)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
                <DeleteIcon
                  onClick={() => setDeleteLicenseId(license._id)}
                  style={{
                    cursor: "pointer",
                    color: "#d84b2b",
                    fontSize: "24px",
                  }}
                />
              </div>
            </div>
            {index < licensesList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
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
              <VerifiedIcon style={{ color: "#555", fontSize: "30px" }} />
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Certification Name</p>
              <p style={{ color: "#666" }}>Issuing Organization</p>
              <p style={{ color: "#999" }}>Issue Date - Expiration Date</p>
            </div>
          </div>
        </div>
      )}

      {editingLicense ? (
        <EditLicense open={open} onClose={handleClose} fetchLicenses={fetchLicenses} licenseData={editingLicense} />
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
