import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContext, createAppTheme } from './context/ThemeContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useMemo } from 'react';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginRoute />} />
                <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Students />} />
                  <Route path="/dashboard/students" element={<Students />} />
                </Route>
                <Route path="/" element={<InitialRoute />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function LoginRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard/students" replace /> : <Login />;
}

function InitialRoute() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Navigate to="/dashboard/students" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;