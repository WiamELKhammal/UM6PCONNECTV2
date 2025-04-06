import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { UserContext } from "../../../context/UserContext";
import SmartAddResearch from "./SmartAddResearch";
import ResearchCard from "./ResearchCard";
import DeleteResearch from "./DeleteResearch"; // You create this
import EditResearch from "./EditResearch";     // You create this

const DiscoverWork = () => {
  const { user } = useContext(UserContext);
  const [researchList, setResearchList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchResearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/research/user/${user._id}`);
      const data = await res.json();
      setResearchList(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchResearch();
  }, [user]);

  return (
    <Box sx={{ width: "90%", margin: "20px auto", p: 3, border: "1px solid #ddd", borderRadius: "12px", backgroundColor: "#fff" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography color="black" variant="h6" fontWeight={600}>
            Research Work
          </Typography>
          <Typography fontSize={18} color="text.secondary">
            Showcase your publications, papers or academic work.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => setOpenAdd(true)}
          sx={{
            color: "#fff",
            borderColor: "#ea3b15",
            backgroundColor: "#ea3b15",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#fff",
              borderColor: "#ea3b15",
              color: "#ea3b15",
            },
          }}
        >
          + Add Research
        </Button>
      </Box>

      {researchList.length === 0 ? (
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <ArticleIcon sx={{ color: "#999", fontSize: 40 }} />
          <Box>
            <Typography fontWeight={600}>Research Title</Typography>
            <Typography fontSize={14}>Your contribution</Typography>
            <Typography fontSize={12} color="text.secondary">
              Link or Summary
            </Typography>
          </Box>
        </Box>
      ) : (
        researchList.map((r, i) => (
          <Box key={r._id || i} mt={i === 0 ? 0 : 3}>
            <ResearchCard
              research={r}
              onEdit={() => setEditItem(r)}
              onDelete={() => setDeleteItem(r)}
            />
            {i < researchList.length - 1 && (
              <Divider sx={{ my: 3, bgcolor: "#fff" }} />
            )}
          </Box>
        ))
      )}

      {/* Modals */}
      <SmartAddResearch open={openAdd} onClose={() => setOpenAdd(false)} onAdd={fetchResearch} />
      {editItem && (
        <EditResearch
          research={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={fetchResearch}
        />
      )}
      {deleteItem && (
        <DeleteResearch
          researchId={deleteItem._id}
          open={!!deleteItem}
          onClose={() => setDeleteItem(null)}
          onDelete={fetchResearch}
        />
      )}
    </Box>
  );
};

export default DiscoverWork;
