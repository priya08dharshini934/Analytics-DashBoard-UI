/**
 * Sidebar navigation for Bytwind dashboard
 * Pixel-perfect, modular, responsive, and cross-browser compatible
 * Uses MUI for icons and layout, modern HTML5/CSS3/ES6+
 */
'use client';
import React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Image from 'next/image';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

const pageItems = [
  'User Profile', 'Overview', 'Projects', 'Campaigns', 'Documents', 'Followers', 'Account', 'Corporate', 'Blog', 'Social'
];

interface SidebarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Sidebar({ activeTab, onTabClick, darkMode, setDarkMode }: SidebarProps) {
  const mode = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: { default: '#18181b', paper: '#222' },
            text: { primary: '#fff', secondary: '#bfc3c8' },
          }
        : {
            background: { default: '#f5f6fa', paper: '#eaf6ff' },
            text: { primary: '#222', secondary: '#bbb' },
          }),
    },
  });

  const menuItems = [
    { text: 'Default', icon: <Image src={darkMode ? "/default-dark.svg" : "/default-light.svg"} alt="Default" width={24} height={24} />, disabled: false },
    { text: 'eCommerce', icon: <Image src={darkMode ? "/ecommerce-dark.svg" : "/ecommerce-light.svg"} alt="eCommerce" width={24} height={24} />, disabled: false },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="permanent"
        PaperProps={{
          style: {
            width: 260,
            boxSizing: 'border-box',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.background.paper}`,
          },
        }}
        style={{ width: 260, flexShrink: 0 }}
      >
        {/* Sidebar header without mode toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0 }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1, color: theme.palette.text.primary, flex: 1 }}>Bytwind</Typography>
        </Box>
        <Typography variant="body2" style={{ padding: '0 16px 8px', color: theme.palette.text.secondary, fontSize: 15 }}>Home Page</Typography>
        <Divider style={{ background: theme.palette.background.paper }} />
        <List style={{ marginTop: 8 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component="button"
              disabled={item.disabled}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                marginBottom: 4,
                opacity: item.disabled ? 0.5 : 1,
                pointerEvents: item.disabled ? 'none' : 'auto',
                background: activeTab === item.text ? theme.palette.background.paper : 'none',
                color: item.disabled ? '#888' : theme.palette.text.primary,
                fontWeight: activeTab === item.text ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                boxShadow: activeTab === item.text ? `0 0 0 2px ${theme.palette.text.primary}` : 'none',
              }}
              onClick={() => {
                if (!item.disabled) {
                  onTabClick(item.text);
                }
              }}
            >
              <ListItemIcon style={{ color: item.disabled ? '#888' : theme.palette.text.primary, minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ style: { fontWeight: activeTab === item.text ? 700 : 500, fontSize: 16, color: item.disabled ? '#888' : theme.palette.text.primary } }}
              />
            </ListItem>
          ))}
        </List>
        <Divider style={{ background: theme.palette.background.paper, margin: '16px 0' }} />
        <List>
          {pageItems.map((page) => (
            <ListItem key={page} component="button" style={{ padding: '8px 24px', borderRadius: 8 }}>
              <ListItemText primary={page} primaryTypographyProps={{ style: { fontSize: 15, color: theme.palette.text.secondary } }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
