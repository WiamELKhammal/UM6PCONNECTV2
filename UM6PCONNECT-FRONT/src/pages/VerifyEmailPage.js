import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "bulma/css/bulma.min.css";

const VerifyEmailPage = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [resendSuccess, setResendSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const otpToken = localStorage.getItem("pendingToken");

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const email = localStorage.getItem("pendingEmail");

    const handleVerify = async () => {
        if (!email || !otp) return setError("Email and code are required.");
        setLoading(true);
        setError("");
        setResendSuccess("");

        try {
            // On the frontend (VerifyEmailPage.jsx)
            const response = await fetch("http://localhost:5000/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    otpToken: localStorage.getItem("pendingToken"), // <- IMPORTANT!
                    otpInput: otp,
                }),
            });


            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.removeItem("pendingEmail");

                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/complete-profile");
            } else {
                setError(data.error || "Invalid or expired OTP.");
            }
        } catch (err) {
            setError("Server error");
        }

        setLoading(false);
    };

    const handleResendOtp = async () => {
        setError("");
        setResendSuccess("");
        setResendDisabled(true);
        setResendCountdown(60); // ⏱ Lock for 30s

        try {
            const response = await fetch("http://localhost:5000/api/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // Store it again in localStorage after resend
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("pendingToken", data.otpToken);
                setResendSuccess("A new code has been sent to your email.");
            }

            else {
                setError(data.error || "Failed to resend code.");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    // Countdown for resend
    useEffect(() => {
        if (resendCountdown === 0) {
            setResendDisabled(false);
            return;
        }

        const timer = setTimeout(() => {
            setResendCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendCountdown]);

    return (
        <section className="section" style={{ padding: "0 40px" }}>
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-8" style={{ textAlign: "center", margin: "0 auto" }}>
                        <h1 style={{ fontSize: "30px", fontWeight: "400", color: "black", marginBottom: "20px" }}>
                            Verify Your Email
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
                                Enter the code sent to your email
                            </h2>

                            <p style={{ fontSize: "14px", color: "#6a6a6a", marginBottom: "20px" }}>
                                Check your inbox at <strong>{email}</strong>.
                            </p>

                            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                            {resendSuccess && <p style={{ color: "green", fontSize: "14px" }}>{resendSuccess}</p>}

                            <div className="field">
                                <label className="label" style={{ fontSize: "14px" }}>Verification Code</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                className="button"
                                onClick={handleVerify}
                                disabled={loading}
                                style={{
                                    backgroundColor: "#ea3b15",
                                    color: "white",
                                    width: "100%",
                                    marginTop: "15px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    padding: "10px",
                                    cursor: loading ? "not-allowed" : "pointer",
                                }}
                                onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = "#c83b15")}
                                onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = "#ea3b15")}
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </button>

                            <p style={{ fontSize: "14px", marginTop: "20px", textAlign: "center" }}>
                                Didn't receive the code?{" "}
                                <span
                                    onClick={!resendDisabled ? handleResendOtp : null}
                                    style={{
                                        color: resendDisabled ? "#aaa" : "#ea3b15",
                                        fontWeight: 600,
                                        cursor: resendDisabled ? "not-allowed" : "pointer",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Resend {resendDisabled && `(${resendCountdown}s)`}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmailPage;
