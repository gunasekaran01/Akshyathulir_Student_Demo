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
} from "@mui/material";

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
};

const growthData = [
  { month: "Aug", value: 20 },
  { month: "Sep", value: 35 },
  { month: "Oct", value: 55 },
  { month: "Nov", value: 70 },
  { month: "Dec", value: 85 },
  { month: "Jan", value: 95 },
];

const revenueData = [
  { month: "Aug", value: 8000 },
  { month: "Sep", value: 11000 },
  { month: "Oct", value: 14000 },
  { month: "Nov", value: 16500 },
  { month: "Dec", value: 17500 },
  { month: "Jan", value: 18000 },
];

const stageData = [
  { name: "Idea", value: 10 },
  { name: "MVP", value: 15 },
  { name: "Growth", value: 25 },
  { name: "Validation", value: 50 },
];

const colors = ["#aed581", "#81c784", "#4caf50", "#2e7d32"];

export default function Dashboard() {
  return (
    <Box>
      {/* HEADER */}
      <Box  sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.main})`,
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
          { label: "Active Mentees", value: "12", icon: <GroupsIcon /> },
          { label: "Sessions Conducted", value: "28", icon: <EventIcon /> },
          { label: "Avg. Rating", value: "4.8 / 5", icon: <StarIcon /> },
          { label: "Monthly Revenue", value: "₹18,000", icon: <CurrencyRupeeIcon /> },
          { label: "Growth Impact", value: "+32%", icon: <TrendingUpIcon /> },
          { label: "Session Utilization", value: "82%", icon: <InsightsIcon /> },
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}>
                    {kpi.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Typography fontWeight="bold">
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
      <Card sx={{ mt: 2, mb: 2 }}>
        <CardContent>
          <Typography fontWeight="bold" mb={1}>
            Performance Summary
          </Typography>

          <Table size="medium">
            <TableHead >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", variant: "h5" }}>Startup</TableCell>
                <TableCell sx={{ fontWeight: "bold", variant: "h5" }}>Stage</TableCell>
                <TableCell sx={{ fontWeight: "bold", variant: "h5" }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: "bold", variant: "h5" }}>Last Session</TableCell>
                <TableCell sx={{ fontWeight: "bold", variant: "h5" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { name: "AgroTech AI", stage: "MVP", progress: 70, status: "Healthy" },
                { name: "FinPay", stage: "Idea", progress: 40, status: "Needs Attention" },
                { name: "HealthSync", stage: "Growth", progress: 85, status: "Excellent" },
                { name: "EduChain", stage: "Validation", progress: 55, status: "Stable" },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.stage}</TableCell>
                  <TableCell>
                    <LinearProgress
                      value={row.progress}
                      variant="determinate" color="success" 
                    />
                  </TableCell>
                  <TableCell>3 days ago</TableCell>
                  <TableCell >{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
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

              <Typography mt={2}>Session Utilization: 82%</Typography>
              <LinearProgress value={82} variant="determinate" color="success"  />

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

              <Typography mt={2}>Monthly Revenue: ₹18,000</Typography>
              <Typography>Growth Contribution: +32%</Typography>

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
                      data={stageData}
                      dataKey="value"
                      outerRadius={120}
                    >
                      {stageData.map((_, i) => (
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
