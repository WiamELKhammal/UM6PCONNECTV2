import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "bulma/css/bulma.min.css";
import { GoogleCircleFilled, WindowsFilled } from "@ant-design/icons";

const LandingPage = () => {
  return (
    <section
      className="section"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      <div className="container">
        <div className="columns is-vcentered">
          {/* Left Column - Text Section */}
          <div className="column is-half" style={{ marginLeft: "40px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "600",
                color: "black",
                marginBottom: "20px",
                lineHeight: "1.5",
              }}
            >
Lorem ipsum dolor sit amet, <br></br>consectetur <br></br>adipiscing elit.              </h1>

            {/* Buttons Section */}
            <div
              className="buttons"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <button
                className="button"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "30px",
                  padding: "0.5em 1.5em",
                  marginBottom: "10px",
                  width: "100%",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <GoogleCircleFilled style={{ marginRight: "8px" }} />
                Continue with Gmail
              </button>
              <button
                className="button"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "30px",
                  padding: "0.5em 1.5em",
                  marginBottom: "10px",
                  width: "100%",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <WindowsFilled style={{ marginRight: "8px" }} />
                Continue with Microsoft
              </button>
              <button
                className="button"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "30px",
                  padding: "0.5em 1.5em",
                  width: "100%",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                Sign in with an email address
              </button>
            </div>

            {/* Centered Text below the buttons */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "#6a6a6a",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                By clicking continue to sign up or sign in you agree
              </p>
              <p
                style={{
                  color: "#6a6a6a",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                to the{" "}
                <span style={{ color: "#d84b2b" }}>Terms of Use</span>, the{" "}
                <span style={{ color: "#d84b2b" }}>Privacy Policy</span>, and the{" "}
                <span style={{ color: "#d84b2b" }}>Cookie Policy</span>.
              </p>
              <p style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}>
                New to UM6P Connect?{" "}
                <Link to="/signup" style={{ color: "#d84b2b", fontWeight: "600" }}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="column is-half">
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                backgroundImage: "url('https://via.placeholder.com/400')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
