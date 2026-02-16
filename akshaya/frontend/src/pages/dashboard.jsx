import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
const colors = ["#aed581", "#81c784", "#4caf50", "#2e7d32"];


export default function Dashboard() {

  const [kpi_dashboard, setKpiDashboard] = useState({});
  const [growthData, setGrowthData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [StageDistribution, setStageDistribution] = useState([]);
  const [PerformanceSummary, setPerformanceSummary] = useState([]);
  useEffect(() => {

    axios.get("http://127.0.0.1:8000/dashboard/kpi_dashboard")
      .then(res => setKpiDashboard(res.data));

    axios.get("http://127.0.0.1:8000/dashboard/growth")
      .then(res => setGrowthData(res.data));

    axios.get("http://127.0.0.1:8000/dashboard/revenue")
      .then(res => setRevenueData(res.data));

    axios.get("http://127.0.0.1:8000/dashboard/PerformanceSummary")
      .then(res => setPerformanceSummary(res.data));

    axios.get("http://127.0.0.1:8000/dashboard/StageDistribution")
      .then(res => setStageDistribution(res.data));

  }, []);
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>
      {/* HEADER */}
      <Box sx={{
        p: 4,
        mb: 4,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${COLORS.ehead}, ${COLORS.head})`,
        color: "#fff",
      }}>
        <Typography variant="h4" fontWeight="bold">
          Expert Dashboard
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Expert performance, startup impact & analytics overview
        </Typography>
      </Box>
      {/* KPI BAND */}
      <Grid container spacing={3} mb={2}>
        {[
          { label: "Total Mentees", value: kpi_dashboard.totalMentees || 0, icon: <GroupsIcon /> },
          { label: "Sessions Conducted", value: kpi_dashboard.totalSessions || 0, icon: <EventIcon /> },
          { label: "Avg. Rating", value: kpi_dashboard.averageRating || 0, icon: <StarIcon /> },
          { label: "Monthly Revenue", value: `₹${kpi_dashboard.monthlyRevenue || 0}`, icon: <CurrencyRupeeIcon /> },
          { label: "Growth Impact", value: `${kpi_dashboard.growthImpact || 0}%`, icon: <TrendingUpIcon /> },
          { label: "Session Utilization", value: `${kpi_dashboard.sessionUtilization || 0}%`, icon: <InsightsIcon /> },
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Card sx={{
              height: "100%",
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
              },
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
            }}>
              <CardContent>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}>
                    {kpi.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Typography variant="h6"
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
      {/* TABLE SECTION */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Performance Summary
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
              <TableCell>Startup</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Last Session</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PerformanceSummary.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell>
                  <LinearProgress
                    value={row.progress}
                    variant="determinate" color="success"
                  />
                </TableCell>
                <TableCell>{row.lastSession}</TableCell>
                <TableCell >{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} my={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
              },
              width: 450,
              height: 180,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold">Session Effectiveness</Typography>

              <Typography mt={2}>Session Utilization: {kpi_dashboard.sessionUtilization}%</Typography>
              <LinearProgress value={kpi_dashboard.sessionUtilization} variant="determinate" color="success" />

              <Typography mt={2}>Action Item Closure: 67%</Typography>
              <LinearProgress value={67} variant="determinate" color="success" />

              <Typography variant="body2" mt={2} color="text.secondary">
                Structured sessions show higher impact than open discussions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
              },
              width: 450,
              height: 180,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold">Revenue & Value Contribution</Typography>

              <Typography mt={2}>Monthly Revenue: ₹{kpi_dashboard.monthlyRevenue}</Typography>
              <Typography>Growth Contribution: +{kpi_dashboard.growthImpact}%</Typography>

              <Typography variant="body2" mt={2} color="text.secondary">
                Revenue growth aligns with startup success, indicating value-driven
                mentoring.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
              },
              width: 450,
              height: 180,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold">
                System Recommendations
              </Typography>

              <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                <Typography>✔ Prioritize at-risk startups</Typography>
                <Typography>✔ Standardize mentoring templates</Typography>
                <Typography>✔ Focus on investor readiness</Typography>
                <Typography>✔ Maintain quality while scaling</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ANALYTICS ZONE */}
      <Grid container spacing={2} my={2}>
        {/* GROWTH CHART */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
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
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold" mb={1}>
                Startup Growth Trend (6 Months)
              </Typography>

              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      dataKey="value"
                      stroke="#2e7d32"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* REVENUE CHART */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
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
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold" mb={1}>
                Revenue Trend Analysis
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2e7d32" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
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
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight="bold" mb={1}>
                Startup Stage Distribution
              </Typography>

              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={StageDistribution}
                      dataKey="value"
                      outerRadius={120}
                    >
                      {StageDistribution.map((_, i) => (
                        <Cell key={i} fill={colors[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
