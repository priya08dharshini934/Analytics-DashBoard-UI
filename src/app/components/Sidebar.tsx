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
            width: { xs: 76, sm: 220, md: 260 },
            boxSizing: 'border-box',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.background.paper}`,
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
            transition: 'width 0.3s',
          },
        }}
        sx={{ width: { xs: 76, sm: 220, md: 260 }, flexShrink: 0 }}
      >
        {/* Sidebar header */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: { xs: 1.5, sm: 2.5 }, pb: 0, mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 18, sm: 22, md: 24 },
              letterSpacing: 1,
              color: theme.palette.text.primary,
              flex: 1,
              textAlign: { xs: 'center', sm: 'left' },
              textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            Bytwind
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            px: { xs: 1.5, sm: 2.5 },
            pb: 1,
            color: theme.palette.text.secondary,
            fontSize: { xs: 13, sm: 15, md: 16 },
            textAlign: { xs: 'center', sm: 'left' },
            fontWeight: 500,
          }}
        >
          Home Page
        </Typography>
        <Divider sx={{ background: theme.palette.background.paper, mx: 2 }} />
        <List sx={{ mt: 2, p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component="button"
              disabled={item.disabled}
              sx={{
                p: { xs: '10px 10px', sm: '14px 28px' },
                borderRadius: 3,
                mb: 1.5,
                opacity: item.disabled ? 0.5 : 1,
                pointerEvents: item.disabled ? 'none' : 'auto',
                background: activeTab === item.text ? (darkMode ? '#232326' : '#eaf6ff') : 'none',
                color: item.disabled ? '#888' : theme.palette.text.primary,
                fontWeight: activeTab === item.text ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                boxShadow: activeTab === item.text ? '0 2px 12px 0 rgba(0,0,0,0.10)' : 'none',
                minHeight: { xs: 52, sm: 44 },
                border: activeTab === item.text ? `2px solid ${darkMode ? '#6fb3ff' : '#1976d2'}` : '2px solid transparent',
                transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                '&:hover': {
                  background: activeTab === item.text ? (darkMode ? '#232326' : '#eaf6ff') : (darkMode ? '#232326' : '#f5faff'),
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                },
              }}
              onClick={() => {
                if (!item.disabled) {
                  onTabClick(item.text);
                }
              }}
            >
              <ListItemIcon sx={{ color: item.disabled ? '#888' : theme.palette.text.primary, minWidth: 32, mr: { xs: 0, sm: 1 } }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: activeTab === item.text ? 700 : 500,
                    fontSize: { xs: 15, sm: 17, md: 18 },
                    color: item.disabled ? '#888' : theme.palette.text.primary,
                    display: { xs: 'none', sm: 'block' },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: theme.palette.background.paper, my: 2, mx: 2 }} />
        <List sx={{ p: 0 }}>
          {pageItems.map((page) => (
            <ListItem
              key={page}
              component="button"
              sx={{
                p: { xs: '8px 10px', sm: '10px 28px' },
                borderRadius: 2,
                minHeight: { xs: 38, sm: 34 },
                transition: 'background 0.2s',
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 500,
                color: theme.palette.text.secondary,
                '&:hover': {
                  background: darkMode ? '#232326' : '#f5faff',
                  color: darkMode ? '#6fb3ff' : '#1976d2',
                },
              }}
            >
              <ListItemText
                primary={page}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: 13, sm: 15, md: 16 },
                    color: 'inherit',
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
