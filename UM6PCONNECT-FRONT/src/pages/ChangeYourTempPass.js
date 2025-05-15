import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Grid,
    Box,
    Container,
} from "@mui/material";

const ChangeYourTempPass = () => {
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        const strengthCriteria = [
            { regex: /[a-z]/ },
            { regex: /[A-Z]/ },
            { regex: /[0-9]/ },
            { regex: /[^A-Za-z0-9]/ },
        ];
        let strength = 0;
        strengthCriteria.forEach(({ regex }) => {
            if (regex.test(password)) strength++;
        });

        if (strength === 4) setPasswordStrength("Strong");
        else if (strength === 3) setPasswordStrength("Medium");
        else setPasswordStrength("Weak");
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMismatch(newPassword !== e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMismatch) return;

        try {
            const response = await axios.post("https://um6pconnectv2-production.up.railway.app/api/change-password", {
                tempPassword,
                newPassword,
                confirmPassword,
                email,
            });

            if (response.status === 200) {
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/complete-profile");
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: { xs: 6, sm: 10 },
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    boxShadow: { xs: "none", sm: 3 },
                    backgroundColor: "#fff",
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight={550}
                    mb={2}
                    color="black"
                >
                    Change Your Password
                </Typography>

                <Typography fontSize={14} color="textSecondary" mb={2}>
                    Please enter the temporary password sent to your email and set a new password.
                </Typography>

                {error && (
                    <Typography color="error" textAlign="center" mb={2}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Temporary Password"
                                type="password"
                                value={tempPassword}
                                onChange={(e) => setTempPassword(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    checkPasswordStrength(e.target.value);
                                    setPasswordMismatch(confirmPassword !== "" && confirmPassword !== e.target.value);
                                }}
                                required
                            />
                            {newPassword && (
                                <Typography
                                    fontSize={14}
                                    mt={1}
                                    color={
                                        passwordStrength === "Strong"
                                            ? "green"
                                            : passwordStrength === "Medium"
                                            ? "orange"
                                            : "red"
                                    }
                                >
                                    Strength: {passwordStrength}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            {passwordMismatch && (
                                <Typography color="error" fontSize={14} mt={1}>
                                    Passwords do not match.
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="error"
                                disabled={passwordMismatch}
                            >
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                        Your password has been successfully changed!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default ChangeYourTempPass;
