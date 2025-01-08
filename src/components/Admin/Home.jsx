import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar } from '@mui/material';

// Sample data for doctors, users, and appointments
const doctors = [
  { id: 1, name: 'Dr. John Doe', hospital: 'City Hospital', category: 'Cardiologist', fees: 100, phone: '123-456-7890', image: 'https://example.com/doctor1.jpg' },
  { id: 2, name: 'Dr. Jane Smith', hospital: 'Central Clinic', category: 'Pediatrician', fees: 80, phone: '098-765-4321', image: 'https://example.com/doctor2.jpg' },
];

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left container: Doctors list */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ p: 2 }}>Doctors</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Fees</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.hospital}</TableCell>
                  <TableCell>{doctor.category}</TableCell>
                  <TableCell>${doctor.fees}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>
                    <Avatar alt={doctor.name} src={doctor.image} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

