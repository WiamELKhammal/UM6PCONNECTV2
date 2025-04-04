import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import ResearchCard from "./ResearchCard";
import SmartAddResearch from "./SmartAddResearch";
import ArticleIcon from '@mui/icons-material/Article';

const DiscoverWork = () => {
  const [researchList, setResearchList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (newResearch) => {
    setResearchList(prev => [...prev, newResearch]);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <div>
          <h4 style={{ fontWeight: "600", fontSize: "18px", color: "#000" }}>Research Work</h4>
          <p style={{ fontSize: "16px", color: "#5a5a5a" }}>Showcase your publications, papers or academic work.</p>
        </div>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{
            color: "#fff",
            borderColor: "#ea3b15",
            backgroundColor: "#ea3b15",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#fff", borderColor: "#ea3b15",color: "#ea3b15",
            }
          }}
        >
          + Add Research
        </Button>
      </div>

      {researchList.length === 0 && (
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
            <ArticleIcon style={{ color: "#5a5a5a", fontSize: "40px" }} />
          </div>
          <div>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>Research Title</p>
            <p style={{ fontSize: "14px" }}>Your contribution</p>
            <p style={{ fontSize: "12px", color: "#5a5a5a" }}>Link or Summary</p>
          </div>
        </div>
      )}

      {researchList.map((r, index) => (
        <div key={index} style={{ marginTop: index === 0 ? "0" : "20px" }}>
          <ResearchCard research={r} />
          {index < researchList.length - 1 && (
            <Divider style={{ margin: "14px 0", backgroundColor: "#ddd", height: "0.5px", border: "none" }} />
          )}
        </div>
      ))}

      <SmartAddResearch open={open} onClose={() => setOpen(false)} onAdd={handleAdd} />
    </div>
  );
};

export default DiscoverWork;
