import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventIcon from "@mui/icons-material/Event";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupsIcon from "@mui/icons-material/Groups";

/* ------------------ COLORS ------------------ */
const COLORS = {
  dark: "#1B5E20",
  main: "#2E7D32",
  light: "#E8F5E9",
  mint: "#66BB6A",
  warning: "#FB8C00",
  danger: "#E53935",
};

/* ------------------ KPI DATA ------------------ */
const revenueKpis = [
  { label: "Total Revenue", value: "₹4,80,000", icon: <CurrencyRupeeIcon /> },
  { label: "This Month", value: "₹72,000", icon: <AccountBalanceWalletIcon /> },
  { label: "Avg / Session", value: "₹3,000", icon: <EventIcon /> },
  { label: "Revenue Growth", value: "+18%", icon: <TrendingUpIcon /> },
  { label: "Total Sessions", value: "160", icon: <GroupsIcon /> },
   { label: "Pending Payout", value: "₹38,000", icon: <AccountBalanceIcon /> },
];

/* ------------------ CHART DATA ------------------ */
const revenueTrend = [
  { month: "Aug", revenue: 35000 },
  { month: "Sep", revenue: 42000 },
  { month: "Oct", revenue: 51000 },
  { month: "Nov", revenue: 60000 },
  { month: "Dec", revenue: 68000 },
  { month: "Jan", revenue: 72000 },
];

const revenueSources = [
  { name: "Mentorship Sessions", value: 55 },
  { name: "Startup Retainers", value: 30 },
  { name: "Workshops", value: 15 },
];

const transactions = [
  { startup: "AgroTech AI", amount: "₹15,000", date: "10 Jan", status: "Paid" },
  { startup: "HealthPulse", amount: "₹18,000", date: "14 Jan", status: "Pending" },
  { startup: "FinSmart", amount: "₹12,000", date: "18 Jan", status: "Paid" },
  { startup: "GreenLogix", amount: "₹20,000", date: "20 Jan", status: "Pending" },
];

/* ------------------ COMPONENT ------------------ */
export default function ExpertRevenue() {
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2}}>

      {/* 💰 HEADER */}
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
          Expert Revenue
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Track your earnings and financial growth
        </Typography>
      </Box>

      {/* 📊 KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {revenueKpis.map((k, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
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
                    <Typography  variant="h6"
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

      {/* 📈 CHARTS */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4,transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
                },
            width: 450,
            height: 400}}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Monthly Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    dataKey="revenue"
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
          <Card sx={{ borderRadius: 4, transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
                },
            width: 400,
            height: 400 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Revenue Sources
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueSources}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={130}
                  >
                    <Cell fill={COLORS.main} />
                    <Cell fill={COLORS.warning} />
                    <Cell fill={COLORS.mint} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4, transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
                },
            width: 450,
            height: 400 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Revenue Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueTrend}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill={COLORS.mint} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 📋 TRANSACTIONS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Transactions
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ background: COLORS.main, "& .MuiTableCell-head": {
              color: "#fff",
              fontWeight: "bold",
            }, }}>
            <TableRow>
              <TableCell>Startup</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t, i) => (
              <TableRow key={i}>
                <TableCell>{t.startup}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>
                  <Chip
                    label={t.status}
                    color={t.status === "Paid" ? "success" : "warning"}
                    size="medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
