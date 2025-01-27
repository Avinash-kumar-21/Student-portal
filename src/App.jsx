import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContext, createAppTheme } from './context/ThemeContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useMemo } from 'react';

// Pages & Components
import Login from './pages/Login';
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
                {/* Public Routes */}
                <Route path="/login" element={<LoginRoute />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Students />} />
                    <Route path="students" element={<Students />} />
                    {/* Add more nested dashboard routes here */}
                  </Route>
                </Route>

                {/* Root Redirect */}
                <Route path="/" element={<InitialRoute />} />

                {/* Catch-all 404 Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
}

// Route Components
function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function LoginRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard/students" replace /> : <Login />;
}

function InitialRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard/students" replace /> : <Navigate to="/login" replace />;
}

export default App;