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
        const res = await fetch(`https://um6pconnectv2-production.up.railway.app/api/research/user/${userId}`);
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
        margin: "0 auto",
        px: { xs: 1.5, md: 3 },
        py: 3,
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
                p: { xs: 2, md: 3 },
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
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                mb={1}
                flexWrap="wrap"
              >
                <Typography fontSize={14} fontStyle="italic" color="#000">
                  {institution || "—"}
                </Typography>
                {collaborators?.length > 0 && (
                  <Typography fontSize={14} color="#000">
                    {collaborators.join(", ")}
                  </Typography>
                )}
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
                      color: "#ea3b15",
                      fontWeight: 500,
                    }}
                  />
                </Typography>
              )}

              {/* Keywords */}
              {keywords?.length > 0 && (
                <Box mb={2}>
                  <Typography
                    fontSize={14}
                    color="#000"
                    fontWeight={500}
                    sx={{ mb: 1 }}
                  >
                    Keywords:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {keywords.map((kw, i) => (
                      <Chip key={i} label={kw} size="small" />
                    ))}
                  </Stack>
                </Box>
              )}

              <Divider sx={{ height: "1px", bgcolor: "#fff", my: 2 }} />

              {/* File and Link Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
              >
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
              </Stack>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default DiscoverWorkUser;
