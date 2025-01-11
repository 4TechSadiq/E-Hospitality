import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);

  // Fetch pending appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-appointment');
      const data = await response.json();
      setAppointments(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch approved appointments
  const fetchApprovedAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-approved-appointment');
      const data = await response.json();
      setApprovedAppointments(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error fetching approved appointments:', error);
    }
  };

  // Approve an appointment
  const handleApprove = async (appointment) => {
    try {
      // Send approved appointment to the approved appointments API
      const approvedAppointment = { ...appointment, payment_status: 'confirmed' };
      await fetch('http://127.0.0.1:8000/approved-appointment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(approvedAppointment),
      });

      // Delete the approved appointment from the pending list
      await fetch(`http://127.0.0.1:8000/delete-appointment/${appointment.id}/`, {
        method: 'DELETE',
      });

      // Fetch updated lists
      fetchAppointments();
      fetchApprovedAppointments();
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  // Delete an appointment
  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/delete-appointment/${id}/`, {
        method: 'DELETE',
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchApprovedAppointments();
  }, []);

  const renderTable = (data, isApproved = false) => (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Disease</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.ap_id}</TableCell>
              <TableCell>
                {`${appointment.first_name} ${appointment.mid_name} ${appointment.last_name}`.trim()}
              </TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>{appointment.disease}</TableCell>
              <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
              <TableCell>{appointment.payment_status}</TableCell>
              <TableCell>
                {!isApproved && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleApprove(appointment)}
                    style={{ marginRight: '8px' }}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
       Appointments Status Verification
      </Typography>
      {renderTable(appointments)}

      {/* <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
        Approved Appointments
      </Typography>
      {renderTable(approvedAppointments, true)} */}
    </div>
  );
};

export default AppointmentManagement;
