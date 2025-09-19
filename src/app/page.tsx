"use client";

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Grid,
  ListItemButton,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const drawerWidth = 220;

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: { mode: themeMode },
  });

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const navItems = [
    { label: "Home", icon: <HomeIcon color="primary" /> },
    { label: "Analytics", icon: <AnalyticsIcon color="primary" /> },
    { label: "Reports", icon: <AssessmentIcon color="primary" /> },
    { label: "Settings", icon: <SettingsIcon color="primary" /> },
  ];

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Dashboard
      </Typography>

      <List>
        {navItems.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.03 }}
            animate={
              activeNav === item.label
                ? { backgroundColor: "rgba(25,118,210,0.06)" }
                : { backgroundColor: "transparent" }
            }
            transition={{ duration: 0.18 }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveNav(item.label);
                  setMobileOpen(false);
                }}
              >
                {item.icon}
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: activeNav === item.label ? "bold" : "normal",
                    color: activeNav === item.label ? "primary.main" : "inherit",
                  }}
                  sx={{ ml: 2 }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "primary.main" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Pixel-Perfect Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Navigation drawers */}
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar navigation">
          {/* Mobile */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}
        >
          {activeNav === "Home" && <HomePage />}
          {activeNav === "Analytics" && <AnalyticsPage />}
          {activeNav === "Reports" && <ReportsPage />}
          {activeNav === "Settings" && (
            <SettingsPage setThemeMode={setThemeMode} themeMode={themeMode} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
  // ...existing code...

  /* --------------------- Home Page --------------------- */
  function HomePage() {
    const initialCards = [
      {
        id: "sales",
        title: "Sales",
        value: "$12,340",
        subtitle: "Sales Overview",
        motionDelay: 0.2,
      },
      {
        id: "users",
        title: "Active Users",
        value: "1,234",
        subtitle: "Active Users",
        motionDelay: 0.3,
      },
      {
        id: "health",
        title: "System Health",
        value: "All systems operational",
        subtitle: "System Health",
        motionDelay: 0.4,
      },
    ];

    // State for cards and drag
    const [cards, setCards] = useState(initialCards);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Custom drag cursor with '+' move effect
    React.useEffect(() => {
      // SVG cursor with plus sign
      const cursorSVG =
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect x='0' y='0' width='32' height='32' fill='none'/><text x='16' y='21' font-size='20' text-anchor='middle' fill='%231976d2'>+</text></svg>";
      if (isDragging) {
        document.body.style.cursor = 'move';
        const style = document.createElement('style');
        style.id = 'custom-drag-cursor';
        style.innerHTML = `* { cursor: url('${cursorSVG}') 16 16, move !important; }`;
        document.head.appendChild(style);
      } else {
        document.body.style.cursor = 'default';
        const style = document.getElementById('custom-drag-cursor');
        if (style) style.remove();
      }
      return () => {
        document.body.style.cursor = 'default';
        const style = document.getElementById('custom-drag-cursor');
        if (style) style.remove();
      };
    }, [isDragging]);

    // Drag event handlers
    const startDrag = (index: number) => {
      setDraggedIndex(index);
      setIsDragging(true);
    };

    const overDrag = (index: number) => {
      if (draggedIndex === null || draggedIndex === index) return;
      const updatedCards = [...cards];
      const [removed] = updatedCards.splice(draggedIndex, 1);
      updatedCards.splice(index, 0, removed);
      setCards(updatedCards);
      setDraggedIndex(index);
    };

    const endDrag = () => {
      setDraggedIndex(null);
      setIsDragging(false);
    };

    // Render dashboard cards
    return (
      <Grid container columns={12} columnSpacing={3}>
        {cards.map((card, index) => (
          <Box key={card.id} sx={{ gridColumn: { xs: 'span 12', md: 'span 6', lg: 'span 4' }, mb: 3 }}>
            <motion.div
              draggable
              onDragStart={() => startDrag(index)}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                overDrag(index);
              }}
              onDragEnd={endDrag}
              style={{ cursor: isDragging && draggedIndex === index ? "move" : "grab" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: draggedIndex === index && isDragging ? 1.12 : 1,
                boxShadow:
                  draggedIndex === index && isDragging
                    ? "0 16px 40px rgba(25, 118, 210, 0.28)"
                    : "0 2px 8px rgba(0,0,0,0.08)",
                zIndex: draggedIndex === index && isDragging ? 10 : 1,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18, duration: card.motionDelay }}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(25, 118, 210, 0.14)" }}
              whileTap={{ scale: 0.96 }}
            >
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 260, maxWidth: 320, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.value}
                </Typography>
              </Paper>
            </motion.div>
          </Box>
        ))}
      </Grid>
    );
  }

  /* --------------------- Analytics Page --------------------- */
  function AnalyticsPage() {
    const data = [
      { name: "Jan", users: 400 },
      { name: "Feb", users: 700 },
      { name: "Mar", users: 200 },
      { name: "Apr", users: 900 },
      { name: "May", users: 500 },
      { name: "Jun", users: 800 },
    ];

    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Analytics
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={3} />
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    );
  }

  /* --------------------- Reports Page --------------------- */
  function ReportsPage() {
    const reports = [
      { name: "Sales Q1", date: "2025-03-31", status: "Completed" },
      { name: "User Growth", date: "2025-04-15", status: "Pending" },
    ];

    const headerBg = themeMode === "dark" ? "#263238" : "#e3f2fd";
    const headerColor = themeMode === "dark" ? "#fff" : "#1976d2";
    const cellColor = themeMode === "dark" ? "#fff" : undefined;

    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Reports
        </Typography>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
          <thead>
            <tr style={{ background: headerBg }}>
              <th style={{ padding: 8, textAlign: "left", color: headerColor }}>Report Name</th>
              <th style={{ padding: 8, textAlign: "left", color: headerColor }}>Date</th>
              <th style={{ padding: 8, textAlign: "left", color: headerColor }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.name}>
                <td style={{ padding: 8, color: cellColor }}>{r.name}</td>
                <td style={{ padding: 8, color: cellColor }}>{r.date}</td>
                <td style={{ padding: 8, color: cellColor }}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    );
  }

  /* --------------------- Settings Page --------------------- */
  interface SettingsPageProps {
    setThemeMode: (mode: "light" | "dark") => void;
    themeMode: "light" | "dark";
  }
  function SettingsPage({ setThemeMode, themeMode }: SettingsPageProps) {
    // Local state for settings
    const [notifications, setNotifications] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState(themeMode);

    // Next.js router for query param updates
    const { useRouter } = require('next/navigation');
    const router = useRouter();

    // Handle theme dropdown change (local only)
    const handleThemeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedTheme(e.target.value as "light" | "dark");
    };

    // Save settings: update theme, query params
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setThemeMode(selectedTheme);
      const params = new URLSearchParams({
        theme: selectedTheme,
        notifications: notifications ? 'on' : 'off',
      });
      router.replace(`?${params.toString()}`);
      alert("Settings saved");
    };

    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 480 }}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Theme selection */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="theme" style={{ display: "block", marginBottom: 8 }}>
              Theme
            </label>
            <Box sx={{ minWidth: 120 }}>
              <ThemeDropdown value={selectedTheme} onChange={handleThemeChange} />
            </Box>
          </div>

          {/* Notifications toggle */}
          <div style={{ marginBottom: 16 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  name="notifications"
                />
              }
              label="Enable notifications"
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      </Paper>
    );

  }


  interface ThemeDropdownProps {
    value: "light" | "dark";
    onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  }
  function ThemeDropdown({ value, onChange }: ThemeDropdownProps) {
    return (
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={value}
          label="Theme"
          onChange={(event) => onChange(event as React.ChangeEvent<{ value: unknown }>)}
          sx={{ background: "background.paper" }}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
