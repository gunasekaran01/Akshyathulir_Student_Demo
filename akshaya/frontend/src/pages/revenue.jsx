import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
  head: "#25544a",
  ehead: "#1f4d3a",
};
/* ------------------ COMPONENT ------------------ */
export default function ExpertRevenue() {
  const email = localStorage.getItem("expertEmail");

  const [kpi, setKpi] = useState({});
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [revenueSources, setRevenueSources] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/revenue/kpi/${email}`)
      .then(res => setKpi(res.data));

    axios.get(`http://127.0.0.1:8000/revenue/trend/${email}`)
      .then(res => setRevenueTrend(res.data));

    axios.get(`http://127.0.0.1:8000/revenue/sources/${email}`)
      .then(res => setRevenueSources(res.data));

    axios.get(`http://127.0.0.1:8000/revenue/transactions/${email}`)
      .then(res => setTransactions(res.data));

  }, [email]);
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>

      {/* 💰 HEADER */}
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
          Expert Revenue
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Track your earnings and financial growth
        </Typography>
      </Box>

      {/* 📊 KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total Revenue", value: `₹${kpi.totalRevenue || 0}`, icon: <CurrencyRupeeIcon /> },
          { label: "This Month", value: `₹${kpi.thisMonth || 0}`, icon: <AccountBalanceWalletIcon /> },
          { label: "Avg / Session", value: `₹${kpi.avgPerSession || 0}`, icon: <EventIcon /> },
          { label: "Revenue Growth", value: `+${kpi.revenueGrowth || 0}%`, icon: <TrendingUpIcon /> },
          { label: "Total Sessions", value: kpi.totalSessions || 0, icon: <GroupsIcon /> },
          { label: "Pending Payout", value: `₹${kpi.pendingPayout || 0}`, icon: <AccountBalanceIcon /> },
        ].map((kpi, i) => (
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
                    {kpi.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Typography variant="h6"
                      fontWeight="bold"
                      sx={{ color: COLORS.main }} >
                      {kpi.value}
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
          <Card sx={{
            borderRadius: 4, transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 450,
            height: 400
          }}>
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
          <Card sx={{
            borderRadius: 4, transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 400,
            height: 400
          }}>
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
          <Card sx={{
            borderRadius: 4, transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            },
            width: 450,
            height: 400
          }}>
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
          <TableHead sx={{
            background: COLORS.ehead, "& .MuiTableCell-head": {
              color: "#fff",
              fontWeight: "bold",
            },
          }}>
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
