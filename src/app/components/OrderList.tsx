/**
 * OrderList - Pixel-perfect order table for Default dashboard
 * Matches screenshot: top header, filter/search, table, avatars, status, pagination
 * Uses MUI, modern HTML5/CSS3/ES6+, and Framer Motion for micro-interactions
 */
'use client';
import React, { useState } from 'react';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Chip, IconButton, InputBase, Divider, Pagination, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

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

import Sidebar from './Sidebar';

export default function OrderList() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Default');
  const mode = darkMode ? 'dark' : 'light';
  const [search, setSearch] = useState('');
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: { default: '#18181b', paper: '#222' },
            text: { primary: '#fff', secondary: '#bfc3c8' },
          }
        : {
            background: { default: '#f7f8fa', paper: '#fff' },
            text: { primary: '#222', secondary: '#555' },
          }),
    },
  });

  // Pagination logic
  const rowsPerPage = 8;
  const [page, setPage] = useState(1);

  // Filter orders by search query
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

  // Calculate paginated orders
  const paginatedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / rowsPerPage));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.palette.background.default }}>
        <Sidebar activeTab={activeTab} onTabClick={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ flex: 1 }}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box sx={{ p: 3, background: theme.palette.background.default, minHeight: '100vh' }}>
            {/* Main Header */}
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={order.avatar} sx={{ width: 32, height: 32 }} />
                        <Typography sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>{order.user}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.project}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.address}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.secondary, background: mode === 'dark' ? '#222' : theme.palette.background.paper, fontWeight: 500, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>{order.date}</TableCell>
                    <TableCell sx={{ background: mode === 'dark' ? '#222' : theme.palette.background.paper, borderBottom: `1px solid ${mode === 'dark' ? '#333' : theme.palette.background.default}`, height: 56 }}>
                      <Chip label={order.status} size="small" sx={{ fontWeight: 700, color: '#fff', px: 2.5, borderRadius: 3, fontSize: 15, background:
                        order.status === 'In Progress' ? '#1976d2' :
                        order.status === 'Complete' ? '#43a047' :
                        order.status === 'Pending' ? '#fb8c00' :
                        order.status === 'Approved' ? '#1976d2' :
                        order.status === 'Rejected' ? '#d32f2f' : theme.palette.background.paper
                      }} />
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
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

