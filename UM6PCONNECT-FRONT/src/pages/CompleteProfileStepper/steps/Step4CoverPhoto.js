import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const banners = [
  "/assets/images/banner1.jpg",
  "/assets/images/banner1.jpg",
  "/assets/images/banner3.jpg",
  "/assets/images/banner4.jpg",
];

const DashedContainer = styled(Box)(({ theme }) => ({
  border: "2px dashed #d1d5db",
  padding: theme.spacing(5),
  borderRadius: 12,
  backgroundColor: "#f9fafb",
  maxWidth: 700,
  margin: "0 auto",
}));

const Step4CoverPhoto = ({ data, setData }) => {
  const handleSelect = (url) => {
    const updated = { ...data, coverPicture: url };
    setData(updated);
    localStorage.setItem("completeProfileData", JSON.stringify(updated));
  };

  return (
    <Box>


      <DashedContainer>
        <Grid container spacing={2}>
          {banners.map((url, index) => {
            const isSelected = data.coverPicture === url;
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Banner ${index + 1}`}
                  onClick={() => handleSelect(url)}
                  sx={{
                    width: "100%",
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 2,
                    cursor: "pointer",
                    border: isSelected
                      ? "3px solid #e04c2c"
                      : "2px solid transparent",
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        {data.coverPicture && (
          <Typography fontSize={14} mt={3} color="text.secondary">
            Selected banner:{" "}
            <span style={{ color: "#e04c2c" }}>
              {data.coverPicture.split("/").pop()}
            </span>
          </Typography>
        )}
      </DashedContainer>
    </Box>
  );
};

export default Step4CoverPhoto;
