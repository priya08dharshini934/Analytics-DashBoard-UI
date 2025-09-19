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

  const navItems = ["Home", "Analytics", "Reports", "Settings"];

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Dashboard
      </Typography>

      <List>
        {navItems.map((text) => (
          <motion.div
            key={text}
            whileHover={{ scale: 1.03 }}
            animate={
              activeNav === text
                ? { backgroundColor: "rgba(25,118,210,0.06)" }
                : { backgroundColor: "transparent" }
            }
            transition={{ duration: 0.18 }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveNav(text);
                  setMobileOpen(false);
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontWeight: activeNav === text ? "bold" : "normal",
                    color: activeNav === text ? "primary.main" : "inherit",
                  }}
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
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid
          item={true}
          xs={12}
          md={6}
          lg={4}
          key={card.id}
          draggable={true}
          onDragStart={() => startDrag(index)}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            overDrag(index);
          }}
          onDragEnd={endDrag}
          style={{ cursor: isDragging && draggedIndex === index ? "move" : "grab" }}
        >
          <motion.div
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
        </Grid>
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

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Reports
      </Typography>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ background: "#e3f2fd" }}>
            <th style={{ padding: 8, textAlign: "left" }}>Report Name</th>
            <th style={{ padding: 8, textAlign: "left" }}>Date</th>
            <th style={{ padding: 8, textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.name}>
              <td style={{ padding: 8 }}>{r.name}</td>
              <td style={{ padding: 8 }}>{r.date}</td>
              <td style={{ padding: 8 }}>{r.status}</td>
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
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setThemeMode(e.target.value as "light" | "dark");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // you can persist settings here
    alert("Settings saved");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 480 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="theme" style={{ display: "block", marginBottom: 8 }}>
            Theme
          </label>
          {/* MUI Select for better dropdown UI */}
          <Box sx={{ minWidth: 120 }}>
            <ThemeDropdown value={themeMode} onChange={handleThemeChange} />
          </Box>
        </div>

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
        onChange={onChange}
        sx={{ background: "background.paper" }}
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </FormControl>
  );
}
}
