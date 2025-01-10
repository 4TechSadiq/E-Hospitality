import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DoctorList from './DoctorList'; // Import DoctorList component

// Sample data for users and appointments
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Patient' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'Admin' },
];

const appointments = [
  { id: 1, doctor: 'Dr. John Doe', patient: 'Alice Johnson', date: '2023-06-15', time: '10:00 AM' },
  { id: 2, doctor: 'Dr. Jane Smith', patient: 'Bob Williams', date: '2023-06-16', time: '2:00 PM' },
];

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4,  }}>
      <Box sx={{ display: 'flex', gap: 4,flexWrap: 'wrap' }}>
        {/* Left container: Doctors list */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Doctors</Typography>
          <Paper sx={{ overflow: 'hidden' }}>
            <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
              <DoctorList compact={true} /> {/* Pass compact prop to indicate this is a summary view */}
            </Box>
          </Paper>
        </Box>

        {/* Right container: Users list */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ p: 2 }}>Users</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Bottom container: Latest appointments */}
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Latest Appointments</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;