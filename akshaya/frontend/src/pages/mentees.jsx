import React from "react";
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
};

/* ------------------ DATA ------------------ */
const kpis = [
  { label: "Total Startups", value: 18, icon: <BusinessIcon /> },
  { label: "Total Mentorships", value: 16, icon: <GroupsIcon /> },
  { label: "Avg Growth", value: "12%", icon: <TrendingUpIcon /> },
  { label: "On Track", value: 15, icon: <CheckCircleIcon /> },
  { label: "At Risk", value: 11, icon: <WarningAmberIcon /> },
  { label: "Sessions / Month", value: 12, icon: <EventAvailableIcon /> },
];

const progressData = [
  { month: "Mar", progress: 25 },
  { month: "May", progress: 38 },
  { month: "Jun", progress: 48 },
  { month: "Aug", progress: 55 },
  { month: "Oct", progress: 65 },
  { month: "Nov", progress: 75 },
  { month: "Dec", progress: 88 },
  { month: "Jan", progress: 75 },
];

const healthData = [
  { name: "On Track", value: 15 },
  { name: "Needs Attention", value: 2 },
  { name: "At Risk", value: 11 },
];

const startups = [
  {
    name: "AgroTech AI",
    founder: "Arun Kumar",
    stage: "MVP",
    progress: 72,
    growth: "+15%",
    status: "On Track",
  },
  {
    name: "FinSmart",
    founder: "Priya S",
    stage: "Ideation",
    progress: 38,
    growth: "+8%",
    status: "Needs Attention",
  },
  {
    name: "HealthPulse",
    founder: "Rahul Mehta",
    stage: "Traction",
    progress: 81,
    growth: "+18%",
    status: "On Track",
  },
  {
    name: "GreenLogix",
    founder: "Sneha Iyer",
    stage: "Scaling",
    progress: 64,
    growth: "+22%",
    status: "On Track",
  },
  {
    name: "EduNext",
    founder: "Karthik R",
    stage: "Early Revenue",
    progress: 56,
    growth: "+12%",
    status: "Needs Attention",
  },
];

const actions = [
  {
    startup: "AgroTech AI",
    task: "Investor pitch refinement",
    owner: "Founder",
    due: "20 Jan",
    impact: "High",
  },
  {
    startup: "FinSmart",
    task: "Finalize MVP feature list and product roadmap",
    owner: "Expert",
    due: "25 Jan",
    impact: "Medium",
  },
  {
    startup: "HealthPulse",
    task: "Conduct user validation interviews with 20 target customers",
    owner: "Founder",
    due: "30 Jan",
    impact: "High",
  },
  {
    startup: "EduNext",
    task: "Define monetization strategy and pricing model",
    owner: "Expert",
    due: "02 Feb",
    impact: "Medium",
  },
  {
    startup: "GreenLogix",
    task: "Prepare compliance and legal documentation for pilot launch",
    owner: "Founder",
    due: "05 Feb",
    impact: "High",
  },
];


/* ------------------ COMPONENT ------------------ */
export default function ExpertDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>
      {/* 🌱 HEADER */}
      <Box
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.main})`,
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
        {kpis.map((k, i) => (
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
                    {k.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {k.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: COLORS.main }}>
                      {k.value}
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
                <BarChart data={progressData}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="progress" fill={COLORS.mint} radius={[8, 8, 0, 0]} />
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
            background: COLORS.main, "& .MuiTableCell-head": {
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
