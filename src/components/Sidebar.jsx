import { 
    Drawer, List, ListItem, ListItemButton, 
    ListItemIcon, ListItemText, Divider, Box, 
    Typography, Avatar, Card, CardContent 
  } from '@mui/material';
  import { 
    People, AttachMoney, PersonAdd, InsertChart, 
    Mail, Logout, Dashboard 
  } from '@mui/icons-material';
  import { Link } from 'react-router-dom';
  
  export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            width: 280,
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar sx={{ 
            width: 56, 
            height: 56, 
            mb: 2,
            bgcolor: 'primary.main',
            fontSize: '1.5rem'
          }}>
            SP
          </Avatar>
          <Typography variant="h6" color="text.primary">
            Student Portal
          </Typography>
        </Box>
  
        <Divider />
  
        <List sx={{ p: 2 }}>
          {/* Dashboard Metrics */}
          <Card sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Weekly Sales
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney fontSize="small" /> 7.4k
              </Typography>
            </CardContent>
          </Card>
  
          <Card sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                New Users
              </Typography>
              <Typography variant="h6">
                <PersonAdd fontSize="small" /> 1.35m
              </Typography>
            </CardContent>
          </Card>
  
          {/* Navigation Links */}
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/dashboard"
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
  
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/dashboard/students"
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
  
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/dashboard/analytics"
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon><InsertChart /></ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
  
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/dashboard/messages"
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon><Mail /></ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
        </List>
  
        <Divider />
  
        <List sx={{ p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              sx={{ borderRadius: 2, color: 'error.main' }}
              onClick={() => {/* Add logout logic here */}}
            >
              <ListItemIcon><Logout color="error" /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    );
  }