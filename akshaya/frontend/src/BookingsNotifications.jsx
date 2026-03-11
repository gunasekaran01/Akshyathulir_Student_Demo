import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Paper,
    Typography,
    Stack,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    Alert,
    IconButton,
    TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

const COLORS = {
    dark: "#1B5E20",
    main: "#2E7D32",
    light: "#E8F5E9",
    mint: "#66BB6A",
    warning: "#FB8C00",
    danger: "#E53935",
    head: "#25544a",
    ehead: "#1f4d3a",
};
const BookingsNotifications = ({ expertEmail }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionMode, setActionMode] = useState(null); // 'view', 'edit'
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [rescheduleTime, setRescheduleTime] = useState("");
    const [meetingLink, setMeetingLink] = useState("");

    // Fetch bookings
    useEffect(() => {
        if (expertEmail) {
            fetchBookings();
        }
    }, [expertEmail]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8000/bookings/expert/${expertEmail}`
            );

            if (response.data.success) {
                // Auto-complete bookings that are past their scheduled date/time
                const now = new Date();
                const bookingsToComplete = response.data.data.filter((booking) => {
                    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
                    return bookingDateTime < now && booking.status !== "completed";
                });

                // Mark past bookings as completed
                for (const booking of bookingsToComplete) {
                    try {
                        await axios.delete(
                            `http://localhost:8000/bookings/delete/${booking._id}`
                        );
                    } catch (err) {
                        console.error("Error auto-completing booking:", err);
                    }
                }

                // Remove completed bookings from display
                const filteredBookings = response.data.data.filter((b) => {
                    const bookingDateTime = new Date(`${b.date}T${b.time}`);
                    return bookingDateTime >= now;
                });

                setBookings(filteredBookings);
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load booking requests");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (bookingId) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/bookings/update/${bookingId}/confirmed`
            );

            if (response.data.success) {
                // Update local state
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId ? { ...b, status: "confirmed" } : b
                    )
                );
                setOpenDialog(false);
                setSelectedBooking(null);
                setActionMode(null);
                alert("Booking confirmed successfully!");
            }
        } catch (err) {
            console.error("Error confirming booking:", err);
            alert("Failed to confirm booking");
        }
    };

    const handleReject = async (bookingId) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/bookings/update/${bookingId}/cancelled`
            );

            if (response.data.success) {
                // Update local state
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId ? { ...b, status: "cancelled" } : b
                    )
                );
                setOpenDialog(false);
                setSelectedBooking(null);
                setActionMode(null);
                alert("Booking rejected successfully!");
            }
        } catch (err) {
            console.error("Error rejecting booking:", err);
            alert("Failed to reject booking");
        }
    };

    const handleChangeStatus = async (bookingId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/bookings/update/${bookingId}/${newStatus}`
            );

            if (response.data.success) {
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId ? { ...b, status: newStatus } : b
                    )
                );
                if (selectedBooking?._id === bookingId) {
                    setSelectedBooking({ ...selectedBooking, status: newStatus });
                }
                alert(`Status changed to ${newStatus} successfully!`);
            }
        } catch (err) {
            console.error("Error updating booking status:", err);
            alert("Failed to update booking status");
        }
    };

    const handleReschedule = async (bookingId) => {
        // Validate date and time are provided
        if (!rescheduleDate || !rescheduleTime) {
            alert("Please select both date and time for rescheduling");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/bookings/request-reschedule/${bookingId}`,
                {
                    newDate: rescheduleDate,
                    newTime: rescheduleTime,
                }
            );

            if (response.data.success) {
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId
                            ? { ...b, status: "reschedule_pending" }
                            : b
                    )
                );
                if (selectedBooking?._id === bookingId) {
                    setSelectedBooking({
                        ...selectedBooking,
                        status: "reschedule_pending",
                    });
                }
                setRescheduleDate("");
                setRescheduleTime("");
                alert("Reschedule request sent to mentee. Waiting for acceptance.");
            }
        } catch (err) {
            console.error("Error requesting reschedule:", err);
            alert("Failed to request reschedule");
        }
    };

    const handleSendMeetingLink = async (bookingId) => {
        if (!meetingLink) {
            alert("Please enter a meeting link");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/bookings/send-link/${bookingId}`,
                {
                    meetingLink: meetingLink,
                }
            );

            if (response.data.success) {
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId
                            ? { ...b, meetingLink: meetingLink }
                            : b
                    )
                );
                if (selectedBooking?._id === bookingId) {
                    setSelectedBooking({
                        ...selectedBooking,
                        meetingLink: meetingLink,
                    });
                }
                setMeetingLink("");
                alert("Meeting link sent to mentee successfully!");
            }
        } catch (err) {
            console.error("Error sending meeting link:", err);
            alert("Failed to send meeting link");
        }
    };
    const handleRequestCompletion = async (bookingId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/bookings/request-complete/${bookingId}`
            );

            if (response.data.success) {
                setBookings(
                    bookings.map((b) =>
                        b._id === bookingId
                            ? { ...b, status: "completion_pending" }
                            : b
                    )
                );

                if (selectedBooking?._id === bookingId) {
                    setSelectedBooking({
                        ...selectedBooking,
                        status: "completion_pending",
                    });
                }

                alert("Completion request sent to mentee.");
            }
        } catch (err) {
            console.error("Error requesting completion:", err);
            alert("Failed to send completion request");
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "confirmed":
                return "success";
            case "cancelled":
                return "error";
            case "reschedule_pending":
                return "info";
            case "accepted":
                return "success";
            case "rejected":
                return "error";
            case "completion_pending":
                return "info";
            case "completed":
                return "success";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "confirmed":
            case "accepted":
            case "completed":
                return <CheckCircleIcon />;
            case "cancelled":
            case "rejected":
                return <CancelIcon />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Error Alert */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Loading State */}
            {loading ? (
                <Typography>Loading bookings...</Typography>
            ) : bookings.length === 0 ? (
                <Typography color="text.secondary">
                    No booking requests yet
                </Typography>
            ) : (
                <Stack spacing={3}>
                    {/* Unified Bookings Table */}
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        All Booking Requests ({bookings.length})
                    </Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                        <Table>
                            <TableHead sx={{
                                background: COLORS.ehead, "& .MuiTableCell-head": {
                                    color: "#fff",
                                    fontWeight: "bold",
                                },
                            }} >
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Client Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Client Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Topic</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                                        Status
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking._id} hover>
                                        <TableCell>{booking.menteeEmail}</TableCell>
                                        <TableCell>{booking.menteeName}</TableCell>
                                        <TableCell>{booking.topic}</TableCell>
                                        <TableCell>
                                            {new Date(booking.date).toLocaleDateString()} {booking.time}
                                        </TableCell>
                                        <TableCell>{booking.duration} mins</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={booking.status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                                color={getStatusColor(booking.status)}
                                                icon={getStatusIcon(booking.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    color: "#2e7d32",
                                                    borderRadius: 4,
                                                    borderColor: "#2e7d32",
                                                }}
                                                startIcon={<EditIcon />}
                                                onClick={() => {
                                                    setSelectedBooking(booking);
                                                    setActionMode("edit");
                                                    setOpenDialog(true);
                                                }}
                                            >
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Booking Details & Management Dialog */}
                    <Dialog
                        open={openDialog}
                        onClose={() => {
                            setOpenDialog(false);
                            setSelectedBooking(null);
                            setActionMode(null);
                        }}
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
                            {actionMode === "edit" ? "Manage Booking" : "Booking Details"}

                            <IconButton
                                onClick={() => {
                                    setOpenDialog(false);
                                    setSelectedBooking(null);
                                    setActionMode(null);
                                }}
                                sx={{ color: "white" }}
                            >
                                <CancelIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2 }}>
                            {selectedBooking && (
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Client Email
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {selectedBooking.menteeEmail}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Client Name
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {selectedBooking.menteeName}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Client Phone
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {selectedBooking.menteephone}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Topic
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {selectedBooking.topic}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Preferred Date & Time
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {new Date(selectedBooking.date).toLocaleDateString()} at{" "}
                                            {selectedBooking.time}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Duration
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {selectedBooking.duration} minutes
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Message
                                        </Typography>
                                        <Typography>{selectedBooking.description}</Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Current Status
                                        </Typography>
                                        <Chip
                                            label={selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                                            color={getStatusColor(selectedBooking.status)}
                                            icon={getStatusIcon(selectedBooking.status)}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>

                                    {actionMode === "edit" && (
                                        <Box sx={{ p: 2, borderRadius: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Change Status:
                                            </Typography>
                                            <Stack spacing={1}>
                                                {selectedBooking.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            size="small"
                                                            startIcon={<CheckCircleIcon />}
                                                            onClick={() =>
                                                                handleConfirm(selectedBooking._id)
                                                            }
                                                        >
                                                            Confirm Booking
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            size="small"
                                                            startIcon={<CancelIcon />}
                                                            onClick={() =>
                                                                handleReject(selectedBooking._id)
                                                            }
                                                        >
                                                            Reject Booking
                                                        </Button>
                                                    </>
                                                )}
                                                {selectedBooking.status === "accepted" && (
                                                    <Alert severity="success">
                                                        Reschedule request accepted by mentee
                                                    </Alert>
                                                )}

                                                {selectedBooking.status === "rejected" && (
                                                    <Alert severity="error">
                                                        Reschedule request rejected by mentee
                                                    </Alert>
                                                )}

                                                {["confirmed", "accepted", "rejected"].includes(selectedBooking.status) && (
                                                    <>
                                                        {/* Reschedule Section */}
                                                        <Box sx={{ mb: 2, p: 1.5, borderRadius: 1 }}>
                                                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                                                                Reschedule Session:
                                                            </Typography>
                                                            <Stack spacing={1}>
                                                                <TextField
                                                                    type="date"
                                                                    value={rescheduleDate}
                                                                    onChange={(e) => setRescheduleDate(e.target.value)}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    type="time"
                                                                    value={rescheduleTime}
                                                                    onChange={(e) => setRescheduleTime(e.target.value)}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleReschedule(selectedBooking._id)
                                                                    }
                                                                >
                                                                    Update Date & Time
                                                                </Button>

                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    size="small"
                                                                    startIcon={<CancelIcon />}
                                                                    onClick={() =>
                                                                        handleChangeStatus(selectedBooking._id, "cancelled")
                                                                    }
                                                                >
                                                                    Change to Rejected
                                                                </Button>
                                                            </Stack>
                                                        </Box>

                                                        {/* Send Meeting Link Section */}
                                                        <Box sx={{ mb: 2, p: 1.5, borderRadius: 1 }}>
                                                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                                                                Send Meeting Link:
                                                            </Typography>
                                                            <Stack spacing={1}>
                                                                <TextField
                                                                    label="Meeting Link"
                                                                    value={meetingLink}
                                                                    onChange={(e) => setMeetingLink(e.target.value)}
                                                                    placeholder="https://meet.google.com/... or Zoom link"
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleSendMeetingLink(selectedBooking._id)
                                                                    }
                                                                >
                                                                    Send Link to Mentee
                                                                </Button>
                                                            </Stack>
                                                            {selectedBooking.meetingLink && (
                                                                <Typography variant="body2" sx={{ mt: 1, p: 1, borderRadius: 2 }}>
                                                                    <strong>Link Sent:</strong> {selectedBooking.meetingLink}
                                                                </Typography>
                                                            )}
                                                            </Box>
                                                            {/* Request Completion Section */}
                                                            <Box sx={{ mb: 2, p: 1.5, borderRadius: 1 }}>
                                                                <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                                                                    Complete Session:
                                                                </Typography>

                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    size="small"
                                                                    startIcon={<CheckCircleIcon />}
                                                                    onClick={() => handleRequestCompletion(selectedBooking._id)}
                                                                >
                                                                    Mark Session Completed
                                                                </Button>
                                                            </Box>
                                                        
                                                    </>
                                                )}

                                                {selectedBooking.status === "cancelled" && (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            size="small"
                                                            startIcon={<CheckCircleIcon />}
                                                            onClick={() =>
                                                                handleChangeStatus(selectedBooking._id, "confirmed")
                                                            }
                                                        >
                                                            Change to Confirmed
                                                        </Button>
                                                    </>
                                                )}
                                                {selectedBooking.status === "reschedule_pending" && (
                                                    <>
                                                        <Typography variant="body2" color="error" fontWeight="bold">
                                                            This booking has been requested for rescheduling. Waiting for mentee's response.
                                                        </Typography>
                                                    </>
                                                )}
                                                {selectedBooking.status === "completion_pending" && (
                                                    <Alert severity="info">
                                                        Completion request sent. Waiting for verification.
                                                    </Alert>
                                                )}
                                            </Stack>
                                        </Box>
                                    )}
                                </Stack>
                            )}
                        </DialogContent>
                    </Dialog>
                </Stack>
            )
            }
        </Box >
    );
};

export default BookingsNotifications;