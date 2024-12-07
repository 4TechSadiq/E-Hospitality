import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Appointments({ onOpenPatient }) {
  const appointments = [
    { id: 1, name: 'John Doe', date: '2024-12-07', time: '10:00 AM' },
    { id: 2, name: 'Jane Smith', date: '2024-12-08', time: '11:30 AM' },
  ];

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => onOpenPatient(appointment.id)}>
                  Open
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Appointments;
