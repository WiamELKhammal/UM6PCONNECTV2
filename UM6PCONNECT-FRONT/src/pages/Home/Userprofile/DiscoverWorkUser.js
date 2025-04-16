import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const DiscoverWorkUser = ({ userId }) => {
  const [researchList, setResearchList] = useState([]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/research/user/${userId}`);
        const data = await res.json();
        setResearchList(data);
      } catch (error) {
        console.error("Failed to fetch user research:", error);
      }
    };

    if (userId) fetchResearch();
  }, [userId]);

  return (
    <Box
      sx={{
        width: "90%",
        margin: "0px auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography color="black" variant="h6" fontWeight={600} mb={2}>
        Research Work
      </Typography>

      {researchList.length === 0 ? (
        <Typography fontSize={16} color="#777">
          This user hasn’t posted any research yet.
        </Typography>
      ) : (
        researchList.map((r, i) => {
          const {
            title,
            context,
            institution,
            collaborators,
            role,
            keywords,
            outputs,
          } = r;

          const fileUrl = outputs?.file?.data;
          const publicationUrl = outputs?.link;

          return (
            <Box
              key={r._id}
              sx={{
                border: "1px solid #eee",
                borderRadius: "16px",
                p: 3,
                bgcolor: "#fff",
                mb: 3,
              }}
            >
              {/* Title */}
              <Typography
                color="black"
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ pr: 7 }}
              >
                {title}
              </Typography>

              {/* Context */}
              <Typography fontSize={14} color="text.secondary" mb={2}>
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
                <Typography fontSize={14} fontWeight={500} mb={1} color="#000">
                  Principal Investigator:
                  <Chip
                    label={role}
                    size="small"
                    sx={{
                      ml: 1,
                      backgroundColor: "#fbeaea",
                      color: "#e04c2c",
                      fontWeight: 500,
                    }}
                  />
                </Typography>
              )}

              {/* Keywords */}
              {keywords?.length > 0 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mb={2}
                  flexWrap="wrap"
                >
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
                    <Button startIcon={<PictureAsPdfIcon />} sx={{ color: "#e04c2c" }}>
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
                    <Button sx={{ color: "#e04c2c" }}>
                      View Publication
                    </Button>
                  </a>
                )}
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default DiscoverWorkUser;
