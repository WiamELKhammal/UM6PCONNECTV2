import React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ResearchCard = ({ research, onEdit, onDelete }) => {
  if (!research) return null;

  const {
    title,
    context,
    institution,
    collaborators,
    role,
    keywords,
    outputs
  } = research;

  const fileUrl = outputs?.file?.data;
  const publicationUrl = outputs?.link;

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: "16px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "none",
        position: "relative",
      }}
    >
      {/* Icons fixed top-right */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 0.5,
        }}
      >
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" sx={{ color: "#555" }} />
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <DeleteIcon fontSize="small" sx={{ color: "#ea3b15" }} />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography
        color="black"
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ pr: 7 }} // prevent text under icons
      >
        {title}
      </Typography>

      {/* Context */}
      <Typography fontSize={14} color="text.secondary" mb={2} >
        {context}
      </Typography>

      {/* Institution and Collaborators */}
      <Stack direction="row" spacing={2} mb={1}>
        <Typography fontSize={14} fontStyle="italic" color="#000">
          {institution || "—"}
        </Typography>
        <Typography fontSize={14} color="#000">
          {collaborators?.join(", ")}
        </Typography>
      </Stack>

      {/* Principal Investigator */}
      {role && (
        <Typography fontSize={14}color="#000" fontWeight={500} mb={1}>
          Principal Investigator:
          <Chip
            label={role}
            size="small"
            sx={{
              ml: 1,
              backgroundColor: "#fbeaea",
              color: "#ea3b15",
              fontWeight: 500,
            }}
          />
        </Typography>
      )}

      {/* Keywords */}
      {keywords?.length > 0 && (
        <Stack direction="row" alignItems="center" spacing={1} mb={2} flexWrap="wrap">
          <Typography fontSize={14} color="#000" fontWeight={500}>
            Keywords:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {keywords.map((kw, i) => (
              <Chip key={i} label={kw} size="small" />
            ))}
          </Stack>
        </Stack>
      )}

      <Divider sx={{ height: "1px", bgcolor: "#fff", my: 1 }} />

      {/* File and Link Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {fileUrl && (
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button startIcon={<PictureAsPdfIcon />} sx={{ color: "#ea3b15" }}>
              Download PDF
            </Button>
          </a>
        )}
        {publicationUrl && (
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ color: "#ea3b15" }}>
              View Publication
            </Button>
          </a>
        )}
      </Box>
    </Box>
  );
};

export default ResearchCard;
