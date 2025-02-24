import React from "react";
import "bulma/css/bulma.min.css";
import { Button } from "@mui/material";

const LandingPage2 = () => {
  return (
    <section
      className="section"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 80px",
        height: "auto",
      }}
    >
      {/* Left Text Content */}
      <div style={{ maxWidth: "50%", minWidth: "300px", marginBottom: "20px" }}>
        <h3
          style={{
            color: "#d84b2b",
            fontWeight: "650",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "15px",
              height: "2px",
              backgroundColor: "#d84b2b",
              display: "inline-block",
            }}
          ></span>
          UM6P CONNECT
        </h3>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
        </h1>
        <p style={{ fontSize: "18px", color: "grey", lineHeight: "1.6" }}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor posuere
          vel venenatis eu sit massa volutpat massa rhoncus odio feugiat tellus,
          elit massa sed.
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
            size="medium" // Adjusted size to medium
            sx={{
              padding: "8px 16px", // Adjust padding for a smaller button
              fontSize: "14px", // Adjust font size
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            Discover Our Researchers
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="medium" // Adjusted size to medium
            sx={{
              padding: "8px 16px", // Adjust padding for a smaller button
              fontSize: "14px", // Adjust font size
              transition: "transform 0.3s ease",
              backgroundColor: "white", // Ensure the background stays white
              borderColor: "#d84b2b", // Set border color to red
              color: "#d84b2b", // Set text color to red
              "&:hover": {
                transform: "scale(1.1)",
                borderColor: "#c32c13", // Set border color on hover to dark red
                color: "#c32c13", // Set text color on hover to dark red
                backgroundColor: "white", // Ensure background stays white on hover
              },
            }}
          >
            Explore Academic Programs
          </Button>
        </div>
      </div>

      {/* Right Section with Video */}
      <div
        style={{
          maxWidth: "50%",
          minWidth: "300px",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Embedded YouTube Video */}
        <iframe
          width="600"
          height="433"
          src="https://www.youtube.com/embed/yvuIRAmphrg?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
        ></iframe>
      </div>
    </section>
  );
};

export default LandingPage2;
