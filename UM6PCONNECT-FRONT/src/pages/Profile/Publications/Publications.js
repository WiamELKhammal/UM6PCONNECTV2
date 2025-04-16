import React, { useState, useEffect, useContext } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddPublication from "./AddPublication";
import EditPublication from "./EditPublication";
import DeletePublication from "./DeletePublication";
import { UserContext } from "../../../context/UserContext";

const Publications = () => {
  const { user } = useContext(UserContext);
  const [publicationsList, setPublicationsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [deletePublicationId, setDeletePublicationId] = useState(null);

  const fetchPublications = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`http://localhost:5000/api/publications/${user._id}`);
      const data = await response.json();
      setPublicationsList(data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [user]);

  const handleOpen = (publication = null) => {
    setEditingPublication(publication);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPublication(null);
  };

  const formatDate = (date) => {
    if (!date) return "Unknown Date";
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
      {/* Titre et bouton d'ajout */}
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
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#e04c2c" }}>Publications</h4>
          <p style={{ fontSize: "14px", color: "#000" }}>Add your research publications to showcase your work.</p>
        </div>
        <AddIcon
          onClick={() => handleOpen(null)}
          style={{
            cursor: "pointer",
            color: "#e04c2c",
            border: "1px solid #e04c2c",
            borderRadius: "8px",
            padding: "5px",
            fontSize: "30px",
          }}
        />
      </div>

      {/* Liste des publications */}
      {publicationsList.length > 0 ? (
        publicationsList.map((pub, index) => (
          <div key={pub._id || index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
                marginTop: "15px",
                color: "#000",
                fontSize: "14px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  <ArticleIcon style={{ color: "#000", fontSize: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>{pub.title || "Publication Title"}</p>
                  <p style={{ color: "#000" }}>{pub.authors || "Author(s)"}</p>
                  <p style={{ color: "#000" }}>
                    {formatDate(pub.date)} - {pub.journalOrConference || "Journal/Conference"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <EditIcon
                  onClick={() => handleOpen(pub)}
                  style={{
                    cursor: "pointer",
                    color: "#e04c2c",
                    fontSize: "24px",
                  }}
                />
                <DeleteIcon
                  onClick={() => setDeletePublicationId(pub._id)}
                  style={{
                    cursor: "pointer",
                    color: "#e04c2c",
                    fontSize: "24px",
                  }}
                />
              </div>
            </div>
            {index < publicationsList.length - 1 && <Divider style={{ margin: "10px 0" }} />}
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
            color: "#000",
            fontSize: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              <ArticleIcon style={{ color: "#000", fontSize: "30px" }} />
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Publication Title</p>
              <p style={{ color: "#000" }}>Author(s)</p>
              <p style={{ color: "#000" }}>Date - Journal/Conference</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals pour Ajouter / Modifier / Supprimer */}
      {editingPublication ? (
        <EditPublication open={open} onClose={handleClose} fetchPublications={fetchPublications} publicationData={editingPublication} />
      ) : (
        <AddPublication open={open} onClose={handleClose} fetchPublications={fetchPublications} />
      )}

      <DeletePublication
        open={!!deletePublicationId}
        onClose={() => setDeletePublicationId(null)}
        publicationId={deletePublicationId}
        fetchPublications={fetchPublications}
      />
    </div>
  );
};

export default Publications;
