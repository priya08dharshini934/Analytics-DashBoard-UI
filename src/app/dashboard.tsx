// DashboardRevamped.tsx
"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  InputBase,
  Pagination,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

export default function DashboardContent() {
  // Orders data and statusColor for Default tab table
  const orders = [
    { id: '#CM9801', user: 'Natali Craig', avatar: 'https://i.pravatar.cc/40?img=1', project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
    { id: '#CM9802', user: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=2', project: 'CRM Admin pages', address: 'Larry Son Francisco', date: 'A minute ago', status: 'Complete' },
    { id: '#CM9803', user: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=3', project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
    { id: '#CM9804', user: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=4', project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' },
    { id: '#CM9805', user: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=5', project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' },
    { id: '#CM9806', user: 'Sam Lee', avatar: 'https://i.pravatar.cc/40?img=6', project: 'Mobile App', address: 'Pine Street Seattle', date: 'Feb 3, 2023', status: 'Complete' },
    { id: '#CM9807', user: 'Linda Park', avatar: 'https://i.pravatar.cc/40?img=7', project: 'Web Portal', address: 'Elm Road Dallas', date: 'Feb 4, 2023', status: 'Pending' },
    { id: '#CM9808', user: 'Mike Chen', avatar: 'https://i.pravatar.cc/40?img=8', project: 'API Integration', address: 'Maple Ave Boston', date: 'Feb 5, 2023', status: 'Approved' },
    { id: '#CM9809', user: 'Sara Kim', avatar: 'https://i.pravatar.cc/40?img=9', project: 'E-commerce', address: 'Oak Lane Miami', date: 'Feb 6, 2023', status: 'Rejected' },
    { id: '#CM9810', user: 'Tom Ford', avatar: 'https://i.pravatar.cc/40?img=10', project: 'Landing Page', address: 'Cedar St Denver', date: 'Feb 7, 2023', status: 'In Progress' },
    { id: '#CM9811', user: 'Emily Stone', avatar: 'https://i.pravatar.cc/40?img=11', project: 'CRM Admin pages', address: 'Birch Blvd Houston', date: 'Feb 8, 2023', status: 'Complete' },
    { id: '#CM9812', user: 'Chris Paul', avatar: 'https://i.pravatar.cc/40?img=12', project: 'Client Project', address: 'Spruce Ct Atlanta', date: 'Feb 9, 2023', status: 'Pending' },
    { id: '#CM9813', user: 'Anna Bell', avatar: 'https://i.pravatar.cc/40?img=13', project: 'Admin Dashboard', address: 'Willow Dr Chicago', date: 'Feb 10, 2023', status: 'Approved' },
    { id: '#CM9814', user: 'James Dean', avatar: 'https://i.pravatar.cc/40?img=14', project: 'App Landing Page', address: 'Aspen Way Phoenix', date: 'Feb 11, 2023', status: 'Rejected' },
    { id: '#CM9815', user: 'Olivia King', avatar: 'https://i.pravatar.cc/40?img=15', project: 'Mobile App', address: 'Magnolia St Orlando', date: 'Feb 12, 2023', status: 'Complete' },
    { id: '#CM9816', user: 'Lucas Gray', avatar: 'https://i.pravatar.cc/40?img=16', project: 'Web Portal', address: 'Dogwood Rd Charlotte', date: 'Feb 13, 2023', status: 'Pending' },
    { id: '#CM9817', user: 'Mia Clark', avatar: 'https://i.pravatar.cc/40?img=17', project: 'API Integration', address: 'Hickory Ave Tampa', date: 'Feb 14, 2023', status: 'Approved' },
    { id: '#CM9818', user: 'Ethan Hall', avatar: 'https://i.pravatar.cc/40?img=18', project: 'E-commerce', address: 'Sycamore Lane Austin', date: 'Feb 15, 2023', status: 'Rejected' },
    { id: '#CM9819', user: 'Zoe Adams', avatar: 'https://i.pravatar.cc/40?img=19', project: 'Landing Page', address: 'Juniper St Portland', date: 'Feb 16, 2023', status: 'In Progress' },
  ];
  const statusColor: Record<string, 'info' | 'success' | 'warning' | 'primary' | 'error'> = {
    'In Progress': 'info',
    'Complete': 'success',
    'Pending': 'warning',
    'Approved': 'primary',
    'Rejected': 'error',
  };
  // Table search and pagination logic
  const [search, setSearch] = useState('');
  const rowsPerPage = 8;
  const [page, setPage] = useState(1);
  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.user.toLowerCase().includes(q) ||
      order.project.toLowerCase().includes(q) ||
      order.address.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q)
    );
  });
  const paginatedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / rowsPerPage));
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Default');
  const mode = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: { default: '#18181b', paper: '#18181b' },
            text: { primary: '#fff', secondary: '#bfc3c8' },
          }
        : {
            background: { default: '#f7f8fa', paper: '#fff' },
            text: { primary: '#222', secondary: '#555' },
          }),
    },
  });
  const CardPaper = (props: any) => <Paper elevation={0} {...props} />;

  // Stat cards in correct order: Customers, Orders, Revenue, Growth
  const stats = [
    { label: "Customers", value: "3,781", delta: "+11.01%", color: "#6fb3ff" },
    { label: "Orders", value: "1,219", delta: "-0.03%", color: "#ffd06b" },
    { label: "Revenue", value: "$695", delta: "+15.03%", color: "#9ef0c7" },
    { label: "Growth", value: "30.1%", delta: "+6.08%", color: "#ff6b6b" },
  ];

  const topProducts = [
    ["ASOS Ridley High Waist", "$79.49", 82, "$4,518.18"],
    ["Marco Lightweight Shirt", "$128.50", 37, "$4,754.50"],
    ["Half Sleeve Shirt", "$39.99", 64, "$2,559.36"],
    ["Lightweight Jacket", "$20.00", 32, "$3,480.00"],
    ["Marco Shoes", "$79.49", 44, "$1,965.81"],
  ];

  // Chart data for projections/actuals
  const projData = [
    { proj: 16, act: 3 }, // Jan
    { proj: 22, act: 5 }, // Feb
    { proj: 18, act: 4 }, // Mar
    { proj: 26, act: 6 }, // Apr
    { proj: 14, act: 2 }, // May
    { proj: 22, act: 4 }, // Jun
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.palette.background.default }}>
        <Sidebar activeTab={activeTab} onTabClick={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ flex: 1 }}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box sx={{ p: 3, width: '100%', minHeight: '100vh', borderRight: '4px solid rgba(255,87,34,0.85)', borderRadius: 2, background: theme.palette.background.default, transition: 'background 0.3s' }}>
            {activeTab === 'eCommerce' ? (
              <>
                {/* Dashboard content as before */}
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 800, flex: 1 }}>
                    eCommerce
                  </Typography>
                </Box>
                {/* Top row: Stat cards and Projections vs Actuals */}
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      {stats.map((stat, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                          <CardPaper sx={{ p: 3, borderRadius: 2.5 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 800, color: theme.palette.text.secondary }}>{stat.label}</Typography>
                            <Typography sx={{ fontSize: 28, fontWeight: 900, mt: 0.5, color: theme.palette.text.primary }}>{stat.value}</Typography>
                            <Typography sx={{ fontSize: 12, color: stat.color, mt: 0.5 }}>{stat.delta}</Typography>
                          </CardPaper>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardPaper
                      sx={{
                        px: 4.5,
                        py: 3.5,
                        background: mode === 'dark' ? '#232326' : '#fff',
                        borderRadius: 2.2,
                        minWidth: 340,
                        maxWidth: 420,
                        width: '100%',
                        height: 230,
                        color: mode === 'dark' ? '#fff' : '#222',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, color: mode === 'dark' ? '#fff' : '#222', fontWeight: 800, fontSize: 22, letterSpacing: 0.1 }}
                      >
                        Projections vs Actuals
                      </Typography>
                      <Box sx={{ flex: 1, position: 'relative', minHeight: 0 }}>
                        <svg width="100%" height="100%" viewBox="0 0 380 160" preserveAspectRatio="none">
                          {/* Horizontal grid lines */}
                          {[0, 1, 2, 3].map((i) => {
                            const y = 38 + i * 32;
                            return (
                              <line
                                key={i}
                                x1="32"
                                x2="350"
                                y1={y}
                                y2={y}
                                stroke={mode === 'dark' ? '#3a3a3d' : '#eaeaea'}
                                strokeWidth="1.2"
                              />
                            );
                          })}
                          {/* Y-axis labels */}
                          {['0', '10M', '20M', '30M'].map((label, i) => (
                            <text
                              key={label}
                              x={36}
                              y={42 + i * 32}
                              fill={mode === 'dark' ? '#7c7c81' : '#888'}
                              fontSize="12"
                              fontWeight="600"
                              fontFamily="inherit"
                              textAnchor="start"
                            >
                              {label}
                            </text>
                          ))}
                          {/* Bars - straight rectangles, no border radius */}
                          {projData.map((d, idx) => {
                            const colWidth = 32;
                            const gap = 22;
                            const x = 70 + idx * (colWidth + gap);
                            const scale = 4.2;
                            const projHeight = Math.max(12, d.proj * scale);
                            const actHeight = Math.max(7, d.act * scale);
                            const baseY = 130;
                            const projY = baseY - projHeight;
                            const actY = projY - actHeight;
                            return (
                              <g key={idx}>
                                {/* Projection bar */}
                                <rect
                                  x={x}
                                  y={projY}
                                  width={colWidth}
                                  height={projHeight}
                                  fill={mode === 'dark' ? '#b7d3ee' : '#bfd9f9'}
                                />
                                {/* Actuals cap */}
                                <rect
                                  x={x}
                                  y={actY}
                                  width={colWidth}
                                  height={actHeight}
                                  fill={mode === 'dark' ? '#b39ddb' : '#95a0a7'}
                                  opacity={0.92}
                                />
                                {/* Month label */}
                                <text
                                  x={x + colWidth / 2}
                                  y={baseY + 20}
                                  textAnchor="middle"
                                  fill={mode === 'dark' ? '#bfc3c8' : '#888'}
                                  fontSize="13"
                                  fontWeight="600"
                                  fontFamily="inherit"
                                >
                                  {months[idx]}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </Box>
                    </CardPaper>
                  </Grid>
                </Grid>
                {/* Middle row: Revenue chart (left), Revenue by Location and Total Sales (right) */}
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12} md={8}>
                    <CardPaper sx={{ p: 3.5, minHeight: 220, background: mode === 'dark' ? '#18181b' : '#fff', borderRadius: 2.2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontWeight: 700, fontSize: 17 }}>
                          Revenue
                        </Typography>
                        <Box sx={{ ml: 2, fontSize: 13, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: 2 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: mode === 'dark' ? '#b7d3ee' : '#1976d2', mr: 0.7 }} />
                            Current Week <span style={{ fontWeight: 700, marginLeft: 4 }}>$58,211</span>
                          </Box>
                          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: mode === 'dark' ? '#b39ddb' : '#b39ddb', mr: 0.7 }} />
                            Previous Week <span style={{ fontWeight: 700, marginLeft: 4 }}>$68,768</span>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ position: 'relative', height: 180, width: '100%' }}>
                        <svg viewBox="0 0 420 160" width="100%" height="100%" preserveAspectRatio="none">
                          {/* Grid lines */}
                          {[0, 1, 2, 3].map((i) => {
                            const y = 40 + i * 30;
                            return (
                              <line
                                key={i}
                                x1="40"
                                x2="400"
                                y1={y}
                                y2={y}
                                stroke={mode === 'dark' ? '#2c2c2e' : '#eaeaea'}
                                strokeWidth="1"
                              />
                            );
                          })}
                          {/* Y-axis labels */}
                          {['0', '10M', '20M', '30M'].map((label, i) => (
                            <text
                              key={label}
                              x={10}
                              y={44 + i * 30}
                              fill={mode === 'dark' ? '#7c7c81' : '#888'}
                              fontSize="12"
                              fontWeight="600"
                              fontFamily="inherit"
                              textAnchor="start"
                            >
                              {label}
                            </text>
                          ))}
                          {/* X-axis labels */}
                          {months.map((month, i) => (
                            <text
                              key={month}
                              x={60 + i * 60}
                              y={145}
                              fill={mode === 'dark' ? '#bfc3c8' : '#888'}
                              fontSize="13"
                              fontWeight="500"
                              fontFamily="inherit"
                              textAnchor="middle"
                            >
                              {month}
                            </text>
                          ))}
                          {/* Current Week curve */}
                          <path d="M40,120 C80,60 160,140 220,80 C280,20 340,120 400,60" fill="none" stroke={mode === 'dark' ? '#b7d3ee' : '#1976d2'} strokeWidth="3" strokeLinecap="round" />
                          {/* Previous Week curve (dotted) */}
                          <path d="M40,100 C80,130 160,60 220,120 C280,180 340,80 400,140" fill="none" stroke={mode === 'dark' ? '#b39ddb' : '#b39ddb'} strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" />
                        </svg>
                      </Box>
                    </CardPaper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardPaper sx={{ p: 2, borderRadius: 3, mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 700 }}>
                        Revenue by Location
                      </Typography>
                      <img src="/World Map.svg" alt="World Map" width={160} height={60} style={{ marginBottom: 8 }} />
                      <Box sx={{ width: '100%' }}>
                        {[
                          { city: 'New York', value: '72K', bar: 0.95 },
                          { city: 'San Francisco', value: '39K', bar: 0.55 },
                          { city: 'Sydney', value: '25K', bar: 0.35 },
                          { city: 'Singapore', value: '61K', bar: 0.8 },
                        ].map((row, idx) => (
                          <Box key={row.city} sx={{ mb: idx < 3 ? 1.5 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15 }}>
                              <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>{row.city}</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>{row.value}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 3, bgcolor: mode === 'dark' ? '#23272b' : '#eaf6ff', borderRadius: 2, mt: 0.5 }}>
                              <Box sx={{ width: `${row.bar * 100}%`, height: '100%', bgcolor: mode === 'dark' ? '#6fb3ff' : '#1976d2', borderRadius: 2 }} />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardPaper>
                  </Grid>
                </Grid>
                {/* Bottom row: Top Selling Products (left), Total Sales (right) */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={8}>
                    <CardPaper sx={{ p: 3, mt: 0 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 700 }}>
                        Top Selling Products
                      </Typography>
                      <Divider sx={{ mb: 1, borderColor: theme.palette.divider }} />
                      <Box component="table" sx={{ width: '100%', fontSize: 14 }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left', padding: 8, color: theme.palette.text.secondary }}>Name</th>
                            <th style={{ textAlign: 'left', padding: 8, color: theme.palette.text.secondary }}>Price</th>
                            <th style={{ textAlign: 'left', padding: 8, color: theme.palette.text.secondary }}>Quantity</th>
                            <th style={{ textAlign: 'left', padding: 8, color: theme.palette.text.secondary }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topProducts.map((row, idx) => (
                            <tr key={idx} style={{ background: 'none' }}>
                              <td style={{ padding: 8, color: theme.palette.text.primary, fontWeight: 500 }}>{row[0]}</td>
                              <td style={{ padding: 8, color: mode === 'dark' ? '#ffd06b' : '#fbc02d', fontWeight: 500 }}>{row[1]}</td>
                              <td style={{ padding: 8, color: mode === 'dark' ? '#9ef0c7' : '#388e3c', fontWeight: 500 }}>{row[2]}</td>
                              <td style={{ padding: 8, color: theme.palette.text.primary, fontWeight: 700 }}>{row[3]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Box>
                    </CardPaper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardPaper sx={{ p: 2.5, borderRadius: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 700 }}>
                        Total Sales
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative', width: 90, height: 90, mb: 2 }}>
                          <svg width="90" height="90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill={mode === 'dark' ? '#222' : '#eaf6ff'} />
                            {/* Direct */}
                            <path d="M18 2 a 16 16 0 0 1 10 28" fill="none" stroke={mode === 'dark' ? '#6fb3ff' : '#388e3c'} strokeWidth="4" />
                            {/* Affiliate */}
                            <path d="M28 30 a 16 16 0 0 1 -20 0" fill="none" stroke={mode === 'dark' ? '#b39ddb' : '#7c6ff9'} strokeWidth="4" />
                            {/* Sponsored */}
                            <path d="M8 30 a 16 16 0 0 1 -6 -12" fill="none" stroke={mode === 'dark' ? '#ffd06b' : '#fbc02d'} strokeWidth="4" />
                            {/* E-mail */}
                            <path d="M2 18 a 16 16 0 0 1 6 -12" fill="none" stroke={mode === 'dark' ? '#9ef0c7' : '#388e3c'} strokeWidth="4" />
                          </svg>
                          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'transparent', px: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 15, color: mode === 'dark' ? '#fff' : '#222' }}>38.6%</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: mode === 'dark' ? '#6fb3ff' : '#388e3c', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#388e3c' : '#388e3c', fontWeight: 700, mr: 1 }}>Direct</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 400 }}>$300.56</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: mode === 'dark' ? '#b39ddb' : '#7c6ff9', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#7c6ff9' : '#7c6ff9', fontWeight: 700, mr: 1 }}>Affiliate</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 400 }}>$135.18</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: mode === 'dark' ? '#ffd06b' : '#fbc02d', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#fbc02d' : '#fbc02d', fontWeight: 700, mr: 1 }}>Sponsored</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 400 }}>$154.02</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: mode === 'dark' ? '#9ef0c7' : '#388e3c', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#388e3c' : '#388e3c', fontWeight: 700, mr: 1 }}>E-mail</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 400 }}>$48.96</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardPaper>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                {/* Pixel-perfect order table for Default dashboard (copied from OrderList.tsx) */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" fontWeight={900} sx={{ color: theme.palette.text.primary, letterSpacing: 0.5 }}>
                    Orders
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mt: 0.5 }}>
                    Recent orders and project status
                  </Typography>
                </Box>
                {/* Top breadcrumbs */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>Dashboards</Typography>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>/</Typography>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>Default</Typography>
                  <Box sx={{ flex: 1 }} />
                  {/* Top right icons row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton sx={{ color: theme.palette.text.secondary, bgcolor: theme.palette.background.paper, borderRadius: 2 }}><FilterListIcon /></IconButton>
                    <IconButton sx={{ color: theme.palette.text.secondary, bgcolor: theme.palette.background.paper, borderRadius: 2 }}><AddIcon /></IconButton>
                    <InputBase
                      placeholder="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      sx={{ background: theme.palette.background.paper, borderRadius: 2, px: 2, py: 0.5, width: 180, color: theme.palette.text.primary, ml: 2 }}
                      startAdornment={<SearchIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />}
                    />
                  </Box>
                </Box>
                {/* Table */}
                <Table sx={{ borderCollapse: 'separate', borderSpacing: 0, background: theme.palette.background.paper, borderRadius: 3, overflow: 'hidden', boxShadow: mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.24)' : '0 2px 8px rgba(0,0,0,0.04)', width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ background: theme.palette.background.paper, height: 48 }}>
                      <TableCell padding="checkbox" sx={{ background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>
                        <Checkbox sx={{ color: theme.palette.text.secondary, p: 0 }} />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>Project</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>Address</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: theme.palette.text.secondary, background: theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 48 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOrders.map((order, idx) => (
                      <motion.tr key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} style={{ background: mode === 'dark' ? '#222' : theme.palette.background.paper, height: 56 }}>
                        <TableCell padding="checkbox" sx={{ background: mode === 'dark' ? '#222' : theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>
                          <Checkbox sx={{ color: theme.palette.text.secondary, p: 0 }} />
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 600, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.id}</TableCell>
                        <TableCell sx={{ background: mode === 'dark' ? '#222' : theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <img src={order.avatar} alt={order.user} width={32} height={32} style={{ borderRadius: '50%', marginRight: 8, border: `2px solid ${mode === 'dark' ? '#333' : '#eee'}` }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>{order.user}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.project}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.address}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.date}</TableCell>
                        <TableCell sx={{ background: mode === 'dark' ? '#222' : theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 13, color: '#fff', background: theme.palette[statusColor[order.status]]?.main || '#888', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                              {order.status}
                            </Box>
                          </Box>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    sx={{ '& .MuiPaginationItem-root': { color: theme.palette.text.primary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, borderRadius: 2, border: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, fontWeight: 700 } }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}