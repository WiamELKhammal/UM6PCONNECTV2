import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState(""); // State to manage error messages
  const { setUser } = useContext(UserContext);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleKeepSignedIn = () => setKeepSignedIn(!keepSignedIn);


  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Vérifier ce que l'API retourne
  
      if (response.ok && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        console.log("User stored in localStorage:", data.user); // Vérifier si l'utilisateur est bien stocké
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Sign In failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while signing in. Please try again.");
    }
  };
  
  

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
          <div className="column is-8" style={{ textAlign: "center", margin: "0 auto" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "400", color: "black", marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>

            {/* White Box - Form Container */}
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "left",
                border: "1px solid #ccc",

                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {/* Sign In Title Inside Box */}
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "black", marginBottom: "5px" }}>
                Sign In
              </h2>
              <p style={{ fontSize: "14px", color: "#6a6a6a", marginBottom: "20px" }}>
                Enter your credentials to sign in.
              </p>

              {/* Error Message */}
              {error && (
                <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
                  {error}
                </p>
              )}

              {/* Email Field */}
              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ fontSize: "14px", padding: "8px" }}
                  />
                </div>
              </div>

              {/* Password Field with Show/Hide Toggle */}
              <div className="field">
                <label className="label" style={{ fontWeight: "500", fontSize: "14px" }}>Password</label>
                <div className="control" style={{ position: "relative" }}>
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{ fontSize: "14px", padding: "8px", paddingRight: "40px" }}
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
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
              </div>
              {/* Forgot Password Link in Red */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#ea3b15",
                  marginBottom: "7px",
                }}
              >
                <a href="#" style={{ color: "#ea3b15", fontWeight: "600" }}>
                  Forgot Password?
                </a>
              </p>
              {/* Keep me signed in Checkbox */}
              <div className="field" style={{ marginBottom: "20px" }}>
                <div className="control">
                  <label className="checkbox" style={{ fontSize: "14px", color: "#6a6a6a" }}>
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={toggleKeepSignedIn}
                      style={{ marginRight: "10px" }}
                    />
                    Keep me signed in
                  </label>
                </div>
              </div>
              {/* Accept & Sign In Button */}
              <button
                className="button"
                style={{
                  backgroundColor: "#ea3b15",
                  color: "white",
                  width: "100%",
                  borderRadius: "30px",
                  padding: "10px",
                  fontSize: "14px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#c83b15"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ea3b15"; }}
                onClick={handleSignIn}
              >
                Sign In
              </button>




              {/* Terms and Conditions */}
              <p style={{ color: "#6a6a6a", fontSize: "12px", marginBottom: "15px", textAlign: "center" }}>
              <br></br>

                By clicking accept, you agree to our{" "}
                <span style={{ color: "#ea3b15" }}>Terms of Use</span>,{" "}
                <span style={{ color: "#ea3b15" }}>Privacy Policy</span>, and{" "}
                <span style={{ color: "#ea3b15" }}>Cookie Policy</span>.
              </p>

              {/* Don't have an account? */}
              <p style={{ fontSize: "14px", color: "black", textAlign: "center", marginTop: "10px" }}>
                Don't have an account?{" "}
                <a href="/signup" style={{ color: "#ea3b15", fontWeight: "600" }}>
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
