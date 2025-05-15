import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const getPasswordStrength = (password) => {
  if (!password) return "";
  const strength = /(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/.test(password)
    ? "strong"
    : password.length >= 6
    ? "medium"
    : "weak";
  return strength;
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");

  useEffect(() => {
    setStrength(getPasswordStrength(password));
  }, [password]);

  const handleSubmit = async () => {
    if (strength === "weak") {
      setError("Password is too weak.");
      return;
    }

    try {
      const res = await fetch(`https://um6pconnectv2-production.up.railway.app/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        setError("");
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        setError(data.error || "Reset failed.");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>
        Reset Your Password
      </h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {password && (
        <div style={{ fontSize: "13px", marginBottom: 10 }}>
          Strength:{" "}
          <span
            style={{
              color:
                strength === "strong"
                  ? "green"
                  : strength === "medium"
                  ? "orange"
                  : "red",
            }}
          >
            {strength}
          </span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#ea3b15",
          color: "#fff",
          border: "none",
          padding: "10px",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        Set New Password
      </button>

      {message && <p style={{ color: "green", marginTop: 10 }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
