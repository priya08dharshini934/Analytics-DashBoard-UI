import React from 'react';
import { Box, Typography, IconButton, InputBase } from '@mui/material';
import Image from 'next/image';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 1.5,
        background: darkMode ? '#18181b' : '#f5f6fa',
        borderBottom: darkMode ? '1px solid #222' : '1px solid #eaf6ff',
        minHeight: 56,
        gap: 2,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Star icon */}
      <Image src={darkMode ? '/default-dark.svg' : '/default-light.svg'} alt="Home" width={24} height={24} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#222', ml: 1 }}>
        Dashboards
      </Typography>
      <Typography variant="subtitle1" sx={{ color: darkMode ? '#bfc3c8' : '#bbb', mx: 1 }}>/</Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#222' }}>
        Default
      </Typography>
      <Box sx={{ flex: 1 }} />
      {/* Search bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', background: darkMode ? '#222' : '#fff', borderRadius: 2, px: 2, py: 0.5, mr: 2, minWidth: 180 }}>
        <InputBase
          placeholder="Search"
          sx={{ color: darkMode ? '#fff' : '#222', fontSize: 15, width: '100%' }}
        />
        <Typography variant="caption" sx={{ color: darkMode ? '#bfc3c8' : '#bbb', ml: 1 }}>⌘/</Typography>
      </Box>
      {/* Mode toggle */}
      <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ mx: 0.5 }}>
        <Image src={darkMode ? '/dark-mode-button.svg' : '/light-mode.svg'} alt="Mode" width={28} height={28} />
      </IconButton>
      {/* Reset icon */}
      <IconButton sx={{ mx: 0.5 }}>
        <Image src={darkMode ? '/reset-button.svg' : '/light-reset.svg'} alt="Reset" width={28} height={28} />
      </IconButton>
      {/* Notifications icon */}
      <IconButton sx={{ mx: 0.5 }}>
        <Image src={darkMode ? '/notifications-button.svg' : '/light-notifications.svg'} alt="Notifications" width={28} height={28} />
      </IconButton>
    </Box>
  );
}
