import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
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
} from "@mui/material";

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

/* ------------------ THEME COLORS ------------------ */
const COLORS = {
  dark: "#1B5E20",
  main: "#2E7D32",
  light: "#E8F5E9",
  mint: "#66BB6A",
  warning: "#FB8C00",
  danger: "#E53935",
  head:"#25544a",
  ehead:"#1f4d3a",
};

/* ------------------ KPI DATA ------------------ */
const availabilityKpis = [
  { label: "Available Days / Week", value: "5 Days", icon: <EventAvailable /> },
  { label: "Hours / Day", value: "4 – 6 hrs", icon: <AccessTime /> },
  { label: "Sessions / Week", value: 8, icon: <CheckCircle /> },
  { label: "Preferred Mode", value: "Online", icon: <LaptopMac /> },
  { label: "Upcoming Sessions", value: 3, icon: <EventAvailable /> },

];
/* ------------------ CALENDAR AVAILABILITY ------------------ */
// 🟢 Dates where expert HAS mentoring sessions
const sessionDates = [
  // January 2026
  "2026-01-20",
  "2026-01-25",
  "2026-01-27",

  // February 2026
  "2026-02-03",
  "2026-02-10",
  "2026-02-18",

  // March 2026
  "2026-03-05",
  "2026-03-12",
  "2026-03-26",

  // April 2026
  "2026-04-08",
  "2026-04-22",
];

// 🔴 Dates where expert is on LEAVE / BLOCKED
const blockedDates = [
  // January 2026
  "2026-01-22",
  "2026-01-29",

  // February 2026
  "2026-02-14",
  "2026-02-21",

  // March 2026
  "2026-03-08",
  "2026-03-19",

  // April 2026
  "2026-04-01",
  "2026-04-15",

  // May 2026
  "2026-05-06",
  "2026-05-20",
];


function CustomDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;
  const dateStr = day.format("YYYY-MM-DD");

  const hasSession = sessionDates.includes(dateStr);
  const isBlocked = blockedDates.includes(dateStr);

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
/* ------------------ WEEKLY AVAILABILITY ------------------ */
const weeklyAvailability = [
  { day: "Monday", time: "10:00 AM – 4:00 PM", mode: "Online", status: "Available" },
  { day: "Tuesday", time: "2:00 PM – 6:00 PM", mode: "Online", status: "Limited" },
  { day: "Wednesday", time: "10:00 AM – 4:00 PM", mode: "Online", status: "Available" },
  { day: "Thursday", time: "11:00 AM – 3:00 PM", mode: "Online", status: "Available" },
  { day: "Friday", time: "10:00 AM – 1:00 PM", mode: "Online", status: "Available" },
  { day: "Saturday", time: "2:00 PM – 6:00 PM", mode: "Online", status: "Limited" },
];

/* ------------------ CHART DATA ------------------ */
const sessionLoad = [
  { day: "Mon", sessions: 4 },
  { day: "Tue", sessions: 2 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 2 },
  { day: "Fri", sessions: 1 },
];
/* ------------------ AVAILABILITY PIE DATA ------------------ */
const availabilityStatusData = [
  { name: "Available", value: 3 },
  { name: "Limited", value: 1 },
  { name: "Unavailable", value: 1 },
];

/* ------------------ MONTHLY SESSION TREND ------------------ */
const monthlySessions = [
  { month: "Aug", sessions: 6 },
  { month: "Sep", sessions: 8 },
  { month: "Oct", sessions: 10 },
  { month: "Nov", sessions: 9 },
  { month: "Dec", sessions: 12 },
  { month: "Jan", sessions: 14 },
];

/* ------------------ UPCOMING SLOTS ------------------ */
const upcomingSlots = [
  { date: "20 Jan", day: "Monday", time: "11:00 AM", mode: "Online" },
  { date: "22 Jan", day: "Wednesday", time: "2:00 PM", mode: "Online" },
  { date: "24 Jan", day: "Friday", time: "10:30 AM", mode: "Online" },
];

/* ------------------ COMPONENT ------------------ */
export default function ExpertAvailability() {
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
        {availabilityKpis.map((k, i) => (
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
          <Card sx={{ borderRadius: 4,width: 420,
            height: 475}}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Monthly Availability View
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  defaultValue={dayjs("2026-01-01")}
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
            <Card sx={{ borderRadius: 4,width: 450,
            height: 475}}>
              <CardContent
                sx={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Typography fontWeight="bold" mb={2}>
                  Upcoming Session Dates
                </Typography>

                <Stack spacing={1}>
                  {sessionDates.map((date, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: COLORS.light,
                        borderLeft: `4px solid ${COLORS.main}`,
                      }}
                    >
                      <Typography fontWeight="bold">
                        {dayjs(date).format("DD MMM YYYY")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Mentoring Session
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* 🔴 LEAVE LIST */}
            <Card sx={{ borderRadius: 4,width: 450,
            height: 475 }}>
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
                        }}
                      >
                        <Typography fontWeight="bold">
                          {dayjs(date).format("DD MMM YYYY")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Expert on Leave
                        </Typography>
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

      {/* 📋 UPCOMING SLOTS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
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
          <Button variant="outlined" color="inherit">
            Update Availability
          </Button>
          <Button variant="outlined" color="inherit">
            Block Time
          </Button>
        </Stack>
      </Box>
    </Box >
  );
}
