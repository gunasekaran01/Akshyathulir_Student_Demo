import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress,
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const BookingModal = ({ open, onClose, expert }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState(null);

    const [formData, setFormData] = useState(() => {
        // load stored mentee data (fallback in case fetch fails)
        const email = localStorage.getItem("menteeEmail") || "";
        const name = localStorage.getItem("menteeName") || "";
        const phone = localStorage.getItem("menteephone") || localStorage.getItem("menteePhone") || "";
        return {
            menteeEmail: email,
            menteeName: name,
            menteephone: phone,
            date: "",
            time: "",
            topic: "",
            description: "",
            duration: "30",
            sessionType: "individual",
        };
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        // ensure stored mentee data exists
        if (!formData.menteeEmail || !formData.menteeName || !formData.menteephone) {
            setError("User information missing. Please login or update your profile.");
            return false;
        }
        if (!formData.date || !formData.time || !formData.topic) {
            setError("Please fill all required fields");
            return false;
        }

        if (!formData.sessionType || !["individual", "group"].includes(formData.sessionType)) {
            setError("Please select a valid session type");
            return false;
        }

        // Validate email format even if loaded from storage
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.menteeEmail)) {
            setError("Stored email address is not valid");
            return false;
        }

        // Validate date is not in the past
        const selectedDate = new Date(formData.date);
        const today = new Date();
        if (selectedDate < today) {
            setError("Please select a future date");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(false);

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const menteeData = {
                menteeEmail: formData.menteeEmail,
                menteeName: formData.menteeName,
                menteephone: formData.menteephone,
                expertId: expert.expertId || expert._id || "",
                expertEmail: expert.email,
                expertName: expert.name,
                date: formData.date,
                time: formData.time,
                topic: formData.topic,
                description: formData.description,
                duration: formData.duration,
                sessionType: formData.sessionType || "individual",
                status: "pending",
                createdAt: new Date().toISOString(),
            };

            const response = await axios.post("http://localhost:8000/bookings/create", menteeData);

            if (response.data?.success) {
                setSuccess(true);
                setFormData((prev) => ({
                    ...prev,
                    date: "",
                    time: "",
                    topic: "",
                    description: "",
                    duration: "30",
                }));
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                }, 1000);
            } else {
                setError(response.data?.message || "Failed to create booking. Please try again.");
            }
        } catch (err) {
            console.error("Booking create error:", err);
            setError("Unable to create booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get minumum date (today)
    const today = new Date().toISOString().split("T")[0];

    // when modal opens, fetch user info from backend if email exists in localStorage
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const email = localStorage.getItem("userEmail");
                if (!email) {
                    setError("User not logged in, please login to book.");
                    return;
                }

                const res = await axios.get(
                    `http://localhost:8000/users/getByEmail/${email}`
                );

                const user = res.data.data || res.data;
                if (user) {
                    setUserData(user);
                    setFormData((prev) => ({
                        ...prev,
                        menteeEmail: user.email || email,
                        menteeName: user.name || user.fullName || "",
                        menteephone: user.phone || user.mobile || "",
                    }));
                    localStorage.setItem("menteeEmail", user.email || email);
                    localStorage.setItem("menteeName", user.name || user.fullName || "");
                    localStorage.setItem("menteephone", user.phone || user.mobile || "");
                }
            } catch (err) {
                console.error("User fetch error:", err);
                setError("Unable to fetch mentee profile. Please try again.");
            }
        };

        if (open) {
            fetchUser();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3e7cb 100%)",
                }
            }}
        >
            <DialogTitle
                sx={{
                    bgcolor: "#2e7d32",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                Book Session with {expert?.name || "Expert"}
                <IconButton
                    onClick={onClose}
                    sx={{ color: "white" }}
                >
                    <CancelIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {/* General Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Success Message */}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Booking request sent successfully! The expert will review and confirm shortly.
                    </Alert>
                )}

                {/* Expert Info */}
                <Box sx={{ mb: 3, p: 2, bgcolor: "#f0f8f0", borderRadius: 2 }}>
                    <Typography variant="body2" color="#2e7d32" fontWeight="bold">
                        Expert Details
                    </Typography>
                    <Typography variant="body2">
                        <strong>Name:</strong> {expert?.name}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Expertise:</strong> {expert?.expertise}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Rate:</strong> ₹{expert?.rate}/hr
                    </Typography>
                </Box>

                {/* Booking Form */}
                <Stack spacing={2}>
                    {/* user info is auto-filled, no input fields shown */}
                    <Typography variant="body2" color="text.secondary">
                        Booking as {formData.menteeName} ({formData.menteeEmail})
                    </Typography>

                    {/* Date Field */}
                    <TextField
                        label="Preferred Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        inputProps={{ min: today }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#2e7d32",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2e7d32",
                                },
                            },
                        }}
                    />

                    {/* Time Field */}
                    <TextField
                        label="Preferred Time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#2e7d32",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2e7d32",
                                },
                            },
                        }}
                    />

                    {/* Session Type */}
                    <FormControl fullWidth>
                        <InputLabel>Session Type</InputLabel>
                        <Select
                            name="sessionType"
                            value={formData.sessionType}
                            label="Session Type"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="individual">Individual</MenuItem>
                            <MenuItem value="group">Group</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Duration */}
                    <FormControl fullWidth>
                        <InputLabel>Session Duration</InputLabel>
                        <Select
                            name="duration"
                            value={formData.duration}
                            label="Session Duration"
                            onChange={handleInputChange}
                            sx={{
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2e7d32",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2e7d32",
                                },
                            }}
                        >
                            <MenuItem value="30">30 minutes</MenuItem>
                            <MenuItem value="60">1 hour</MenuItem>
                            <MenuItem value="90">1.5 hours</MenuItem>
                            <MenuItem value="120">2 hours</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Topic */}
                    <TextField
                        label="Topic / Subject"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        placeholder="What would you like to discuss?"
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#2e7d32",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2e7d32",
                                },
                            },
                        }}
                    />

                    {/* Description */}
                    <TextField
                        label="Additional Details"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Provide more context about your request..."
                        multiline
                        rows={3}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#2e7d32",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2e7d32",
                                },
                            },
                        }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: "#2e7d32",
                        borderColor: "#2e7d32",
                        "&:hover": {
                            bgcolor: "rgba(46, 125, 50, 0.05)",
                        },
                    }}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ bgcolor: "#2e7d32" }}
                    disabled={loading || success}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? "Booking..." : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookingModal;
