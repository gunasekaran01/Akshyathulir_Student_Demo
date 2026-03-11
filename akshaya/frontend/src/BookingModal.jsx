import React, { useState } from "react";
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
    const [formData, setFormData] = useState({
        menteeEmail: "",
        menteeName: "",
        menteephone: "",
        date: "",
        time: "",
        topic: "",
        description: "",
        duration: "30",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.menteeEmail || !formData.date || !formData.time || !formData.topic || !formData.menteephone || !formData.menteeName) {
            setError("Please fill all required fields");
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.menteeEmail)) {
            setError("Please enter a valid email address");
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
                expertId: expert.expertId,
                expertEmail: expert.email,
                expertName: expert.name,
                date: formData.date,
                time: formData.time,
                topic: formData.topic,
                description: formData.description,
                duration: formData.duration,
                status: "pending",
                createdAt: new Date().toISOString(),
            };

            // Send booking request to backend
            const response = await axios.post(
                "http://localhost:8000/bookings/create",
                menteeData
            );

            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setFormData({
                    menteeEmail: "",
                    menteeName: "",
                    menteephone: "",
                    date: "",
                    time: "",
                    topic: "",
                    description: "",
                    duration: "30",
                });

                // Auto close modal after 2 seconds
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                }, 1000);
            }
        } catch (err) {
            console.error("Booking error:", err);
            setError(err.response?.data?.message || "Failed to create booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get minumum date (today)
    const today = new Date().toISOString().split("T")[0];

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
                    {/* Email Field */}
                    <TextField
                        label="Your Email"
                        name="menteeEmail"
                        type="email"
                        value={formData.menteeEmail}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
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
                    {/* Name Field */}
                    <TextField
                        label="Your Name"
                        name="menteeName"
                        type="name"
                        value={formData.menteeName}
                        onChange={handleInputChange}
                        placeholder="Your Full Name"
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
                    {/* Phone Field */}
                    <TextField
                        label="Your Phone Number"
                        name="menteephone"
                        type="tel"
                        value={formData.menteephone}
                        onChange={handleInputChange}
                        placeholder="10-digit phone number"
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
