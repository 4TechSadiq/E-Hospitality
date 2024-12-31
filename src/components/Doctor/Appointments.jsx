import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

function Appointments({ docId }) {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/list-appointment');
        const data = response.data;
        console.log(data);
        console.log(docId);

        // Set appointments and filter based on docId
        setAppointments(data);
        const filtered = data.filter((appointment) => appointment.doc_id === docId);
        setFilteredAppointments(filtered);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [docId]);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Disease</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {appointment.first_name} {appointment.mid_name} {appointment.last_name}
              </TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.disease}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => alert(`Opening details for Appointment ID: ${appointment.ap_id}`)}
                >
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
