import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  CardContent,
  Chip,
  Stack,
  Avatar,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

import {
  EventAvailable,
  AccessTime,
  LaptopMac,
  CheckCircle,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  YAxis,
} from "recharts";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/* ------------------ THEME COLORS ------------------ */
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
/* ------------------ COMPONENT ------------------ */
export default function ExpertAvailability() {
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityKpis, setAvailabilityKpis] = useState({});
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [sessionDates, setSessionDates] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [sessionLoad, setSessionLoad] = useState([]);
  const [availabilityStatusData, setAvailabilityStatusData] = useState([]);
  const [monthlySessions, setMonthlySessions] = useState([]);
  const [upcomingSlots, setUpcomingSlots] = useState([]);
  const [sessionsCompleted, setSessionsCompleted] = useState([]);
  const email = localStorage.getItem("expertEmail");
  const [formEmail, setFormEmail] = useState(email);
  const completedDates = sessionsCompleted.map(s =>
    dayjs(s.date).format("YYYY-MM-DD")
  );

  const filteredSessionDates = sessionDates.filter(
    d => !completedDates.includes(d)
  );

  function CustomDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateStr = day.format("YYYY-MM-DD");

    const isBlocked = blockedDates.includes(dateStr);
    const hasSession = !isBlocked && filteredSessionDates.includes(dateStr);

    return (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        disableRipple
        sx={{
          borderRadius: "50%",
          fontSize: "0.9rem",
          cursor: "default",

          /* 🟢 SESSION DAY */
          ...(hasSession && {
            backgroundColor: COLORS.main,
            color: "#fff",
            fontWeight: "bold",
          }),

          /* 🔴 LEAVE / BLOCKED */
          ...(isBlocked && {
            backgroundColor: COLORS.danger,
            color: "#fff",
          }),
          "&:hover": {
            backgroundColor: hasSession
              ? COLORS.main
              : isBlocked
                ? COLORS.danger
                : "#eee",
          },
        }}
      />
    );
  }
  <StaticDatePicker
    value={selectedDate}
    onChange={(newValue) => setSelectedDate(newValue)}
    disablePast
    slots={{
      actionBar: () => null,
      day: CustomDay,
    }}
  />
  const handleAddSession = async () => {

    if (!selectedDate) {
      alert("Please select date");
      return;
    }

    try {

      await axios.put(
        "http://localhost:8000/availability/addSession",
        {
          email: formEmail,
          date: selectedDate.format("YYYY-MM-DD")
        }
      );

      alert("Availability updated");

      const newDate = selectedDate.format("YYYY-MM-DD");

      setSessionDates(prev => [...new Set([...prev, newDate])]);

      setBlockedDates(prev =>
        prev.filter(d => d !== newDate)
      );

      setOpenAvailability(false);

    } catch (error) {
      console.error(error);
    }
  };
  const handleBlockDate = async () => {

    if (!selectedDate) {
      alert("Please select date");
      return;
    }

    try {

      await axios.put(
        "http://localhost:8000/availability/blockDate",
        {
          email: formEmail,
          date: selectedDate.format("YYYY-MM-DD")
        }
      );

      alert("Date blocked");
      const newDate = selectedDate.format("YYYY-MM-DD");
      setBlockedDates(prev => [...new Set([...prev, newDate])]);

      setSessionDates(prev =>
        prev.filter(d => d !== newDate)
      );

      setOpenBlock(false);

    } catch (error) {
      console.error(error);
    }
  };
  const deleteDate = async (date) => {

    try {

      await axios.delete(
        "http://localhost:8000/availability/deleteDate",
        {
          data: {
            email: formEmail,
            date: date
          }
        }
      );
      alert(`Are you sure the date ${date} is deleted`);
      setSessionDates(prev => prev.filter(d => d !== date));
      setBlockedDates(prev => prev.filter(d => d !== date));

    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {

    axios.get(`http://localhost:8000/availability/kpi/${email}`)
      .then(res => setAvailabilityKpis(res.data));

    axios.get(`http://localhost:8000/availability/weeklyAvailability/${email}`)
      .then(res => setWeeklyAvailability(res.data));

    axios.get(`http://localhost:8000/availability/sessionDates/${email}`)
      .then(res => setSessionDates(res.data));

    axios.get(`http://localhost:8000/availability/blockedDates/${email}`)
      .then(res => setBlockedDates(res.data));

    axios.get(`http://localhost:8000/availability/sessionLoad/${email}`)
      .then(res => setSessionLoad(res.data));

    axios.get(`http://localhost:8000/availability/availabilityStatus/${email}`)
      .then(res => setAvailabilityStatusData(res.data));

    axios.get(`http://localhost:8000/availability/monthlySessions/${email}`)
      .then(res => setMonthlySessions(res.data));

    axios.get(`http://localhost:8000/availability/upcomingSlots/${email}`)
      .then(res => setUpcomingSlots(res.data));
    axios.get(`http://localhost:8000/availability/sessionsCompleted/${email}`)
      .then(res => setSessionsCompleted(res.data));

  }, [email]);
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>

      {/* 🌱 HEADER */}
      <Box
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${COLORS.ehead}, ${COLORS.head})`,
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Expert Availability
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Manage your mentoring schedule and session slots
        </Typography>
      </Box>

      {/* 📊 KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Available Days / Week", value: availabilityKpis.availableDays || 0, icon: <EventAvailable /> },
          { label: "Hours / Day", value: availabilityKpis.hoursPerDay || 0, icon: <AccessTime /> },
          { label: "Sessions / Week", value: availabilityKpis.sessionsPerWeek || 0, icon: <CheckCircle /> },
          { label: "Preferred Mode", value: availabilityKpis.preferredMode || "Online", icon: <LaptopMac /> },
          { label: "Upcoming Sessions", value: availabilityKpis.upcomingSessions || 0, icon: <EventAvailable /> },
        ].map((k, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar sx={{ bgcolor: COLORS.light, color: COLORS.main }}>
                    {k.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {k.label}
                    </Typography>
                    <Typography variant="h6"
                      fontWeight="bold"
                      sx={{ color: COLORS.main }} >
                      {k.value}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📅 WEEKLY AVAILABILITY */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Weekly Availability
      </Typography>

      <Grid container spacing={3} mb={4}>
        {weeklyAvailability.map((d, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{d.day}</Typography>
                <Typography color="text.secondary">
                  {d.time}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Mode: {d.mode}
                </Typography>

                <Chip
                  label={d.status}
                  size="small"
                  sx={{
                    mt: 2,
                    bgcolor:
                      d.status === "Available"
                        ? COLORS.main
                        : d.status === "Limited"
                          ? COLORS.warning
                          : COLORS.danger,
                    color: "#fff",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🗓️ AVAILABILITY CALENDAR */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Availability Calendar
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            borderRadius: 4, width: 420,
            height: 475
          }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Monthly Availability View
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  defaultValue={dayjs()}
                  displayStaticWrapperAs="desktop"
                  disableHighlightToday
                  slots={{
                    actionBar: () => null,
                    day: CustomDay,
                  }}
                />
              </LocalizationProvider>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 18, height: 18, bgcolor: COLORS.main }} />
                  <Typography>Days with Sessions</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 18, height: 18, bgcolor: COLORS.danger }} />
                  <Typography>Blocked / Leave</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* 📋 SESSION + LEAVE LIST */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>

            {/* 🟢 SESSION LIST */}
            <Card sx={{
              borderRadius: 4, width: 450,
              height: 475
            }}>
              <CardContent
                sx={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Typography fontWeight="bold" mb={2}>
                  Upcoming Session Dates
                </Typography>
                {filteredSessionDates.length === 0 ? (
                  <Typography color="text.secondary">
                    No upcoming sessions
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {filteredSessionDates.map((date, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: COLORS.light,
                          borderLeft: `4px solid ${COLORS.main}`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Typography fontWeight="bold">
                          {dayjs(date).format("DD MMM YYYY")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Mentoring Session
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteDate(date)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* 🔴 LEAVE LIST */}
            <Card sx={{
              borderRadius: 4, width: 450,
              height: 475
            }}>
              <CardContent
                sx={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Typography fontWeight="bold" mb={2}>
                  Leave / Blocked Dates
                </Typography>

                {blockedDates.length === 0 ? (
                  <Typography color="text.secondary">
                    No leave dates
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {blockedDates.map((date, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "#fdecea",
                          borderLeft: `4px solid ${COLORS.danger}`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Typography fontWeight="bold">
                          {dayjs(date).format("DD MMM YYYY")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Expert on Leave
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteDate(date)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* 📊 ADDITIONAL ANALYTICS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Availability Analytics
      </Typography>
      <Grid container spacing={3} mb={4}>

        {/* 🟢 Availability Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{
            borderRadius: 4,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 450,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Weekly Session Load
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionLoad}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill={COLORS.mint} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{
            borderRadius: 4,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 400,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Availability Distribution
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={availabilityStatusData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                  >
                    <Cell fill={COLORS.main} />
                    <Cell fill={COLORS.warning} />
                    <Cell fill={COLORS.danger} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{
            borderRadius: 4,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 450,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Monthly Mentoring Sessions
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySessions}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke={COLORS.main}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Sessions Completed
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead
            sx={{
              background: COLORS.ehead,
              "& .MuiTableCell-head": {
                color: "#fff",
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sessionsCompleted.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.clientName}</TableCell>
                <TableCell>{s.topic}</TableCell>
                <TableCell>{s.date}</TableCell>
                <TableCell>{s.time}</TableCell>
                <TableCell>{s.mode}</TableCell>
                <TableCell>{s.duration}</TableCell>
                <TableCell>
                  <Chip label={s.status} color="success" size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 📋 UPCOMING SLOTS */}
      <Typography variant="h6" fontWeight="bold" my={2}>
        Upcoming Available Slots
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead
            sx={{
              background: COLORS.ehead,
              "& .MuiTableCell-head": {
                color: "#fff",
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Mode</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {upcomingSlots.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.date}</TableCell>
                <TableCell>{s.day}</TableCell>
                <TableCell>{s.time}</TableCell>
                <TableCell>{s.mode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🟢 CTA */}
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${COLORS.ehead}, ${COLORS.main})`,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Keep Your Availability Updated
        </Typography>
        <Typography sx={{ opacity: 0.9, mb: 2 }}>
          Help startups plan mentoring sessions efficiently
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setOpenAvailability(true)}
          >
            Update Availability
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setOpenBlock(true)}
          >
            Block Time
          </Button>
        </Stack>
        <Dialog open={openAvailability} onClose={() => setOpenAvailability(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3e7cb 100%)",
            }
          }}>
          <DialogTitle
            sx={{
              bgcolor: "#2e7d32",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Add Availability
          </DialogTitle>

          <DialogContent>

            <TextField
              fullWidth
              label="Email"
              value={formEmail}
              margin="normal"
              onChange={(e) => setFormEmail(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Session Date"
                value={selectedDate}
                disablePast
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>

          </DialogContent>

          <DialogActions>

            <Button onClick={() => setOpenAvailability(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleAddSession}
            >
              Save
            </Button>

          </DialogActions>
        </Dialog>
        <Dialog open={openBlock} onClose={() => setOpenBlock(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3e7cb 100%)",
            }
          }}>
          <DialogTitle
            sx={{
              bgcolor: "#2e7d32",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >Block Date</DialogTitle>

          <DialogContent>

            <TextField
              fullWidth
              label="Email"
              value={formEmail}
              margin="normal"
              onChange={(e) => setFormEmail(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Block Date"
                value={selectedDate}
                disablePast
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>

            <Button onClick={() => setOpenBlock(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleBlockDate}
            >
              Block Date
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
