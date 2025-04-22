import React from "react";
import "bulma/css/bulma.min.css";
import { Button } from "@mui/material";

const LandingPage2 = () => {
  return (
    <section
      className="section"
      style={{
        fontFamily: "'Roboto', Arial, sans-serif", // Changed font family
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 80px",
        height: "auto",
        paddingTop: "90px",
      }}
    >
      {/* Left Text Content */}
      <div style={{ maxWidth: "50%", minWidth: "300px", marginBottom: "20px" }}>
        <h3
          style={{
            color: "#e04c2c",
            fontWeight: "700",
            marginBottom: "10px",
            marginTop: "-100px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "26px", // Increased font size
          }}
        >
          <span
            style={{
              width: "20px",
              height: "3px",
              backgroundColor: "#e04c2c",
              display: "inline-block",
            }}
          ></span>
          UM6P CONNECT
        </h3>
        <h1
          style={{
            fontSize: "56px", // Increased font size
            fontWeight: "700",
            marginBottom: "20px",
            lineHeight: "1.3",
            color: "#333",
          }}
        >
          Unlock a World of Knowledge & Innovation
        </h1>
        <p style={{ fontSize: "20px", color: "#555", lineHeight: "1.7" }}>
          {/* Increased font size */}
          Discover the leading researchers, academic programs, and groundbreaking
          innovations at UM6P. Join a thriving community of scholars and professionals
          shaping the future.
        </p>


        {/* CTA Buttons */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={() => window.location.href = "/Our-Researchers"}
            sx={{
              padding: "12px 25px", // Adjusted padding for bigger button
              fontSize: "16px", // Increased font size
              fontWeight: "600",
              textTransform: "none",
              transition: "color 0.3s ease, box-shadow 0.3s ease", // Changed hover effect
              borderColor: "#e04c2c",
              backgroundColor: "#e04c2c",
              boxShadow: "0 4px 10px rgba(216, 75, 43, 0.2)",
              "&:hover": {
                color: "#e04c2c", // Text color change on hover
                boxShadow: "0 6px 14px rgba(216, 75, 43, 0.3)",
                textDecoration: "underline", // Underline effect on hover
              },
            }}
          >
            Discover Our Researchers
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="medium"
            onClick={() => window.location.href = "/Our-Programs"}
            sx={{
              padding: "12px 25px", // Adjusted padding for bigger button
              fontSize: "16px", // Increased font size
              fontWeight: "600",
              textTransform: "none",
              transition: "color 0.3s ease, border-color 0.3s ease", // Changed hover effect
              backgroundColor: "white",
              borderColor: "#e04c2c",
              color: "#e04c2c",
              "&:hover": {
                color: "#e04c2c", // Text color change on hover
                borderColor: "#e04c2c",
                backgroundColor: "#fff5f3", // Light background on hover
              },
            }}
          >
            Explore Academic Programs
          </Button>
        </div>
      </div>

      {/* Right Section with Custom Image */}
      <div
        style={{
          maxWidth: "50%",
          minWidth: "300px",
          position: "relative",
          textAlign: "center",
        }}
      >
        <img
          src="/assets/images/landpage2.png" // Custom image
          alt="UM6P Research"
          style={{
            width: "100%", // Reduced image size
            maxWidth: "750px", // Reduced image max-width
            height: "auto",
          }}
        />
      </div>
    </section>
  );
};

export default LandingPage2;
