// context/ThemeContext.jsx
import { createContext, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';


export const ThemeContext = createContext();



export const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#d81b60',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

export const useThemeContext = () => useContext(ThemeContext);