import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function History() {
  const { doc_id } = useParams(); // Extract doc_id from the URL
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the API
    fetch('http://127.0.0.1:8000/list-appointment')
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        filterAppointments(data, selectedDate); // Initial filter
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  }, [doc_id]);

  const filterAppointments = (data, date) => {
    const filtered = data.filter(
      (appointment) => appointment.doc_id === doc_id && appointment.date === date
    );
    setFilteredAppointments(filtered);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    filterAppointments(appointments, newDate);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <TextField
          id="date"
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" onClick={() => filterAppointments(appointments, selectedDate)}>
          Filter
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="appointment table">
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.ap_id}</TableCell>
                <TableCell>{`${appointment.first_name} ${appointment.mid_name} ${appointment.last_name}`}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>{appointment.disease}</TableCell>
                <TableCell>{appointment.description}</TableCell>
                <TableCell>{appointment.payment_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
