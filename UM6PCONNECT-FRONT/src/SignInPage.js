import React, { useState, useContext } from "react";
import "bulma/css/bulma.min.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        const storage = keepSignedIn ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
        storage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        window.location.href = "/Our-Researchers";
      } else {
        setError(data.error || "Sign In failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while signing in. Please try again.");
    }
  };

  return (
    <section className="section" style={{ padding: "0 40px" }}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-8" style={{ textAlign: "center", margin: "0 auto" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "400", color: "black", marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>

            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "left",
                border: "1px solid #ccc",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "black", marginBottom: "5px" }}>
                Sign In
              </h2>
              <p style={{ fontSize: "14px", color: "#6a6a6a", marginBottom: "20px" }}>
                Enter your credentials to sign in.
              </p>

              {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>Password</label>
                <div className="control" style={{ position: "relative" }}>
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "40px" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6a6a6a",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: "14px", marginTop: "5px" }}>
                <a href="/forgot-password" style={{ color: "#e04c2c", fontWeight: "600" }}>
                  Forgot Password?
                </a>
              </p>


              <button
                className="button"
                style={{
                  backgroundColor: "#e04c2c",
                  color: "white",
                  width: "100%",
                  borderRadius: "12px",
                  padding: "10px",
                  fontSize: "14px",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c83b15"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#e04c2c"}
                onClick={handleSignIn}
              >
                Sign In
              </button>

              <p style={{ fontSize: "12px", marginTop: "15px", textAlign: "center" }}>
                By clicking accept, you agree to our{" "}
                <span style={{ color: "#e04c2c" }}>Terms of Use</span>,{" "}
                <span style={{ color: "#e04c2c" }}>Privacy Policy</span>, and{" "}
                <span style={{ color: "#e04c2c" }}>Cookie Policy</span>.
              </p>

              <p style={{ fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                Don't have an account?{" "}
                <a href="/signup" style={{ color: "#e04c2c", fontWeight: "600" }}>
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
