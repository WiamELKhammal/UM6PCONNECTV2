
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangeYourTempPass = () => {
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    // Password strength check function
    const checkPasswordStrength = (password) => {
        const strengthCriteria = [
            { regex: /[a-z]/, label: "Lowercase" },
            { regex: /[A-Z]/, label: "Uppercase" },
            { regex: /[0-9]/, label: "Number" },
            { regex: /[^A-Za-z0-9]/, label: "Special character" },
        ];

        let strength = 0;
        strengthCriteria.forEach(({ regex }) => {
            if (regex.test(password)) {
                strength++;
            }
        });

        if (strength === 4) {
            setPasswordStrength("Strong");
        } else if (strength === 3) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak");
        }
    };

    // Real-time validation for password match
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMismatch(newPassword !== e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordMismatch) return; // Prevent submission if passwords don't match

        try {
            const response = await axios.post("http://localhost:5000/api/change-password", {
                tempPassword,
                newPassword,
                email,
                confirmPassword,
            });
            if (response.status === 200) {
                navigate("/signin");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        
        <div
            style={{
                padding: "20px",
                maxWidth: "450px",
                margin: "70px auto 0",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "28px",
                    marginBottom: "20px",fontWeight: "550" ,color:"black"
                }}
            >
                Change Your Password
            </h2>

            {/* Explanation Message */}
            <p style={{ fontSize: "14px", marginBottom: "15px",color:"black" }}>
                Please enter the temporary password sent to your email and set a new password.
            </p>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
                    <label
                        style={{
                            display: "block",
                            fontSize: "14px",
                            marginBottom: "5px",
                            fontWeight: "550",
                            color: "black",
                        }}
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{
                        display: "block",
                        fontSize: "14px",
                        marginBottom: "5px",
                        fontWeight: "550" ,color:"black"
                    }}>
                        Temporary Password:
                    </label>
                    <input
                        type="password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        required
                        placeholder="Enter your temporary password"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontSize: "14px", marginBottom: "5px",fontWeight: "550",color:"black"  }}>
                        New Password:
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            checkPasswordStrength(e.target.value);
                            setPasswordMismatch(confirmPassword !== "" && confirmPassword !== e.target.value);
                        }}
                        required
                        placeholder="Enter your new password"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                    {newPassword && (
                        <p style={{ fontSize: "14px", marginTop: "5px", color: passwordStrength === "Strong" ? "green" : passwordStrength === "Medium" ? "orange" : "red" }}>
                            Strength: {passwordStrength}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontSize: "14px", marginBottom: "5px",fontWeight: "550" ,color:"black" }}>
                        Confirm New Password:
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        placeholder="Confirm your new password"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                </div>

                {/* Show Password Mismatch Error Immediately */}
                {passwordMismatch && (
                    <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
                        Passwords do not match.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={passwordMismatch} // Disable button if passwords don't match
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: passwordMismatch ? "#ea3b15" : "#ea3b15",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: passwordMismatch ? "not-allowed" : "pointer",
                    }}
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangeYourTempPass;
