import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  TableContainer,
  LinearProgress,
  Table,
  Avatar,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

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
export default function ExpertDashboard() {
  const email = localStorage.getItem("expertEmail");

  const [kpi, setKpi] = useState({});
  const [progressData, setProgressData] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [startups, setStartups] = useState([]);
  const [actions, setActions] = useState([]);
  const [sessionGrowth, setSessionGrowth] = useState([]);
  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/mentees/kpi/${email}`)
      .then(res => setKpi(res.data));

    axios.get(`http://127.0.0.1:8000/mentees/progress/${email}`)
      .then(res => setProgressData(res.data));

    axios.get(`http://127.0.0.1:8000/mentees/health/${email}`)
      .then(res => setHealthData(res.data));

    axios.get(`http://127.0.0.1:8000/mentees/startups/${email}`)
      .then(res => setStartups(res.data));

    axios.get(`http://127.0.0.1:8000/mentees/actions/${email}`)
      .then(res => setActions(res.data));
    axios.get(`http://127.0.0.1:8000/mentees/sessions/${email}`)
      .then(res => setSessionGrowth(res.data));

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
          Expert Mentorship
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Driving startup growth through strategic mentoring
        </Typography>
      </Box>

      {/* 📊 KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total Startups", value: kpi.totalStartups || 0, icon: <BusinessIcon /> },
          { label: "Total Mentorships", value: kpi.totalMentorships || 0, icon: <GroupsIcon /> },
          { label: "Avg Growth", value: kpi.avgGrowth || "0%", icon: <TrendingUpIcon /> },
          { label: "On Track", value: kpi.onTrack || 0, icon: <CheckCircleIcon /> },
          { label: "At Risk", value: kpi.atRisk || 0, icon: <WarningAmberIcon /> },
          { label: "Sessions / Month", value: kpi.sessionsPerMonth || 0, icon: <EventAvailableIcon /> },
        ].map((kpi, i) => (
          <Grid itemxs={12} sm={6} md={2.4} key={i}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
                },
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: COLORS.light, color: COLORS.main }}>
                    {kpi.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: COLORS.main }}>
                      {kpi.value}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🚀 STARTUP PORTFOLIO */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Startup Portfolio
      </Typography>

      <Grid container spacing={3} mb={4}>
        {startups.map((s, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
              },
              width: 250,
              height: 200,
              display: "flex",
              flexDirection: "column",
            }}>
              <CardContent>
                <Typography variant="h6">{s.name}</Typography>
                <Typography color="text.secondary">
                  {s.founder} • {s.stage}
                </Typography>

                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={s.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: COLORS.light,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: COLORS.main,
                      },
                    }}
                  />
                  <Typography variant="caption">
                    {s.progress}% • Growth {s.growth}
                  </Typography>
                </Box>

                <Chip
                  label={s.status}
                  color="success"
                  size="small"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📈 CHARTS */}
      <Grid container spacing={3} mb={4}>
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
                Startup Progress Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    dataKey="progress"
                    stroke={COLORS.main}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
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
            width: 420,
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}  >
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Portfolio Health
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthData}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={130}
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
                Sessions Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionGrowth}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill={COLORS.mint} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 📋 ACTION ITEMS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Action Items
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{
            background: COLORS.ehead, "& .MuiTableCell-head": {
              color: "#fff",
              fontWeight: "bold",
            },
          }}>
            <TableRow>
              <TableCell>Startup</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Due</TableCell>
              <TableCell>Impact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.startup}</TableCell>
                <TableCell>{a.task}</TableCell>
                <TableCell>{a.owner}</TableCell>
                <TableCell>{a.due}</TableCell>
                <TableCell>
                  <Chip label={a.impact} color="error" size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}
