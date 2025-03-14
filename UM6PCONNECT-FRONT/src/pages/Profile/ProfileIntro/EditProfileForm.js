import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, TextField, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../../context/UserContext";

const EditProfileForm = ({ open, onClose, onSave }) => {
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        headline: "",
        bio: "",
        location: "",
        address: "",
        birthDate: "",
        url: "",
        department: "",
        header: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user?.Prenom || "",
                lastName: user?.Nom || "",
                email: user?.Email || "",
                phone: user?.telephone || "",
                headline: user?.headline || "",
                bio: user?.bio || "",
                location: user?.location || "",
                address: user?.address || "",
                birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
                url: user?.url || "",
                department: user?.Departement || "",
                header: user?.header || "",
            });
        }
    }, [user]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "bio") {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount > 200) return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setError("");
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");

        console.log("User before update:", user); // Debugging

        if (!user?._id) {
            setError("User ID is missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/profile/${String(user._id)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update profile.");

            const updatedUser = await response.json();

            // Update UserContext and localStorage
            setUser(updatedUser.user);
            localStorage.setItem("user", JSON.stringify(updatedUser.user));

            onSave();
        } catch (error) {
            console.error("Update error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "800px",
                    height: "95vh",
                    margin: "2.5vh auto",
                    textAlign: "center",
                    position: "relative",
                    overflowY: "auto",
                }}
            >
                <IconButton
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        color: "#000",
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "30px" }}>Edit Profile</h2>
                <p style={{ color: "#777", fontSize: "16px", marginBottom: "24px", textAlign: "left" }}>
                    Update your personal information below.
                </p>

                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Email" name="email" value={formData.email} fullWidth variant="outlined" disabled sx={{ marginBottom: "20px", backgroundColor: "#f5f5f5" }} />
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Headline" name="headline" value={formData.headline} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />

                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <TextField
                        label="Biography"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                    <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "12px", color: "#666" }}>
                        {formData.bio.trim().split(/\s+/).length}/200
                    </span>
                </div>

                <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Date of Birth" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} fullWidth variant="outlined" InputLabelProps={{ shrink: true }} sx={{ marginBottom: "20px" }} />
                <TextField label="URL" name="url" value={formData.url} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />
                <TextField label="Department" name="department" value={formData.department} onChange={handleChange} fullWidth variant="outlined" sx={{ marginBottom: "20px" }} />

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button variant="contained" onClick={handleSave} style={{ backgroundColor: "#d84b2b", color: "#fff", width: "100%" }} disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileForm;
