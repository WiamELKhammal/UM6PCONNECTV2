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
        body: JSON.stringify({ email, password, keepSignedIn }), // ✅ send keepSignedIn
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        const userWithToken = { ...data.user, token: data.token };
        const storage = keepSignedIn ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(userWithToken));
        setUser(userWithToken);
        window.location.href = "/Our-Researchers"; // ✅ redirect after success
      } else {
        setError(data.error || "Sign In failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while signing in. Please try again.");
    }
  };

  return (
    <section className="section" style={{ padding: "0 20px" }}>
      <div className="container">
        <div
          className="columns"
          style={{
            maxWidth: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <div
            className="column is-8-mobile is-6-tablet is-4-desktop"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "26px", fontWeight: "400", color: "black", marginBottom: "20px" }}>
              Welcome back. Please sign in to your account.
            </h1>
            <div
  style={{
    backgroundColor: "white",
    padding: "25px",
    border: "1px solid #ccc",
    textAlign: "left",
    width: "100%",
    maxWidth: "500px", // make it a bit wider on all screens
    minWidth: "280px",  // prevent it from becoming too narrow on phones
  }}
>

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "black",
                  marginBottom: "5px",
                  textAlign: "center",
                }}
              >
                Sign In
              </h2>

              <p style={{ fontSize: "14px", color: "#6a6a6a", marginBottom: "20px", textAlign: "center" }}>
                Enter your credentials to continue.
              </p>

              {error && (
                <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>
              )}

              {/* Email Field */}
              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>
                  Email
                </label>
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

              {/* Password Field */}
              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>
                  Password
                </label>
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

              {/* Keep me signed in */}
              <div className="field" style={{ marginTop: "10px" }}>
                <label className="checkbox" style={{ fontSize: "14px", color: "#6a6a6a" }}>
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    style={{ marginRight: "8px" }}
                  />
                  Keep me signed in
                </label>
              </div>

              {/* Forgot Password */}
              <p style={{ fontSize: "14px", marginTop: "5px", textAlign: "right" }}>
                <a href="/forgot-password" style={{ color: "#ea3b15", fontWeight: "600" }}>
                  Forgot Password?
                </a>
              </p>

              {/* Submit Button */}
              <button
                className="button"
                style={{
                  backgroundColor: "#ea3b15",
                  color: "white",
                  width: "100%",
                  marginTop: "20px",
                  padding: "10px",
                  fontSize: "14px",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c83b15")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ea3b15")}
                onClick={handleSignIn}
              >
                Sign In
              </button>

              {/* Policies */}
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "15px",
                  textAlign: "center",
                  color: "#6a6a6a",
                }}
              >
                By signing in, you agree to our{" "}
                <span style={{ color: "#ea3b15" }}>Terms of Use</span>,{" "}
                <span style={{ color: "#ea3b15" }}>Privacy Policy</span> and{" "}
                <span style={{ color: "#ea3b15" }}>Cookie Policy</span>.
              </p>

              {/* Sign Up */}
              <p style={{ fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                Don't have an account?{" "}
                <a href="/signup" style={{ color: "#ea3b15", fontWeight: "600" }}>
                  Sign Up
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
