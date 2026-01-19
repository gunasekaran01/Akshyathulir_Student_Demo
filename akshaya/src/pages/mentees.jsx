import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  TableContainer,
  LinearProgress,
  Table,
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
  { label: "Total Startups", value: 8 },
  { label: "Active Mentorships", value: 6 },
  { label: "Avg Growth", value: "12%" },
  { label: "On Track", value: 5 },
  { label: "At Risk", value: 1 },
  { label: "Sessions / Month", value: 9 },
];
   


const progressData = [
  { month: "Oct", progress: 45 },
  { month: "Nov", progress: 55 },
  { month: "Dec", progress: 68 },
  { month: "Jan", progress: 75 },
];

const healthData = [
  { name: "On Track", value: 5 },
  { name: "Needs Attention", value: 2 },
  { name: "At Risk", value: 1 },
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
];

const actions = [
  {
    startup: "AgroTech AI",
    task: "Investor pitch refinement",
    owner: "Founder",
    due: "20 Jan",
    impact: "High",
  },
];

/* ------------------ COMPONENT ------------------ */
export default function ExpertDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light}}>
      
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
          Expert Mentorship Dashboard
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
              sx={{height: "100%",
                borderRadius: 4,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}>
                    {kpi.icon}
                  </Avatar>
                <Typography variant="body2" color="text.secondary">
                  {k.label}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: COLORS.main }}
                >
                  {k.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📈 CHARTS */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Startup Progress Trend
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
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
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Portfolio Health
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={healthData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    <Cell fill={COLORS.main} />
                    <Cell fill={COLORS.warning} />
                    <Cell fill={COLORS.danger} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Sessions Growth
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={progressData}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="progress" fill={COLORS.mint} radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🚀 STARTUP PORTFOLIO */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Startup Portfolio
      </Typography>

      <Grid container spacing={3} mb={4}>
        {startups.map((s, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderRadius: 4 }}>
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

      {/* 📋 ACTION ITEMS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Action Items
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ background: COLORS.light }}>
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
