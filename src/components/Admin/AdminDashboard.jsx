import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppBar from './AppBar';
import Sidebar from './SideBar';
import DoctorList from './DoctorList';
import UserList from './UserList';
import FacilityManagement from './FacilityManagement';
import AppointmentManagement from './AppointmentManagement';
import Home from './Home';
import SendNotification from './SendNotification';

const theme = createTheme();

function AdminDashboard() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'doctors':
        return <DoctorList />;
      case 'users':
        return <UserList />;
      case 'facilities':
        return <FacilityManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'sendnotification':
        return <SendNotification />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        <Sidebar onViewChange={setCurrentView} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {renderView()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;

