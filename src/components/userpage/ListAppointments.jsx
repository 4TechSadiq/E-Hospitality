import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';

const ListAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.warn('No userId provided to ListAppointments');
      setLoading(false);
      return;
    }

    fetch('http://127.0.0.1:8000/list-appointment')
      .then(response => response.json())
      .then(data => {
        // Filter appointments for the current user
        const filteredAppointments = data.filter(
          appointment => appointment.user_id === userId
        );
        console.log('Filtered appointments:', filteredAppointments);
        setAppointments(filteredAppointments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card sx={{ width: '100%', maxWidth: '900px', margin: '1rem auto' }}>
      <CardHeader 
        title="Your Appointments"
        sx={{ textAlign: 'center' }}
      />
      <CardContent>
        {appointments.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Disease</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      {`${appointment.first_name} ${appointment.last_name}`}
                    </TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.disease}</TableCell>
                    <TableCell>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: appointment.payment_status === 'completed' ? '#e7f7e7' : '#fff3e0',
                        color: appointment.payment_status === 'completed' ? '#2e7d32' : '#ed6c02'
                      }}>
                        {appointment.payment_status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div style={{ textAlign: 'center', color: '#666' }}>
            No appointments found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ListAppointments;