/**
 * Sidebar navigation for Bytwind dashboard
 * Pixel-perfect, modular, responsive, and cross-browser compatible
 * Uses MUI for icons and layout, modern HTML5/CSS3/ES6+
 */
'use client';
import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import Image from 'next/image';

const pageItems = [
  'User Profile', 'Overview', 'Projects', 'Campaigns', 'Documents', 'Followers', 'Account', 'Corporate', 'Blog', 'Social'
];

interface SidebarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  darkMode: boolean;
}

export default function Sidebar({ activeTab, onTabClick, darkMode }: SidebarProps) {
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
          sx: {
            width: { xs: 70, sm: 200, md: 260 },
            boxSizing: 'border-box',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.background.paper}`,
            transition: 'width 0.3s',
          },
        }}
        sx={{ width: { xs: 70, sm: 200, md: 260 }, flexShrink: 0 }}
      >
        {/* Sidebar header */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: { xs: 1, sm: 2 }, pb: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 16, sm: 20, md: 22 },
              letterSpacing: 1,
              color: theme.palette.text.primary,
              flex: 1,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Bytwind
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            px: { xs: 1, sm: 2 },
            pb: 1,
            color: theme.palette.text.secondary,
            fontSize: { xs: 12, sm: 14, md: 15 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Home Page
        </Typography>
        <Divider sx={{ background: theme.palette.background.paper }} />
        <List sx={{ mt: 1, p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component="button"
              disabled={item.disabled}
              sx={{
                p: { xs: '8px 8px', sm: '10px 24px' },
                borderRadius: 2,
                mb: 0.5,
                opacity: item.disabled ? 0.5 : 1,
                pointerEvents: item.disabled ? 'none' : 'auto',
                background: activeTab === item.text ? theme.palette.background.paper : 'none',
                color: item.disabled ? '#888' : theme.palette.text.primary,
                fontWeight: activeTab === item.text ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                boxShadow: activeTab === item.text ? `0 0 0 2px ${theme.palette.text.primary}` : 'none',
                minHeight: { xs: 48, sm: 40 },
                transition: 'background 0.2s',
              }}
              onClick={() => {
                if (!item.disabled) {
                  onTabClick(item.text);
                }
              }}
            >
              <ListItemIcon sx={{ color: item.disabled ? '#888' : theme.palette.text.primary, minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: activeTab === item.text ? 700 : 500,
                    fontSize: { xs: 13, sm: 15, md: 16 },
                    color: item.disabled ? '#888' : theme.palette.text.primary,
                    display: { xs: 'none', sm: 'block' },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: theme.palette.background.paper, my: 2 }} />
        <List sx={{ p: 0 }}>
          {pageItems.map((page) => (
            <ListItem
              key={page}
              component="button"
              sx={{
                p: { xs: '6px 8px', sm: '8px 24px' },
                borderRadius: 2,
                minHeight: { xs: 36, sm: 32 },
                transition: 'background 0.2s',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <ListItemText
                primary={page}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: 12, sm: 14, md: 15 },
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
