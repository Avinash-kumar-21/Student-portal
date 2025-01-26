import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemText, CssBaseline, Box } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault(); // Add preventDefault for safety
    try {
      console.log("Logout initiated");
      await signOut(auth);
      console.log("User signed out successfully");
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <Box sx={{ overflow: 'auto', mt: 8 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard/students">
                <ListItemText primary="Students Page" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              {/* Add button role and test ID for debugging */}
              <ListItemButton 
                onClick={handleLogout}
                role="button"
                data-testid="logout-button"
                sx={{ 
                  color: 'error.main', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    cursor: 'pointer' 
                  } 
                }}
              >
                <Logout sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />

              </ListItemButton>
             
            </ListItem>
          </List>
         
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}