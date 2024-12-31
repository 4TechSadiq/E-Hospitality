import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";

function Appointments({ docId, onOpenPatient }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-appointment");
        const data = response.data;

        // Filter appointments by doctor ID
        const filtered = data.filter((appointment) => appointment.doc_id === docId);
        setAppointments(filtered);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [docId]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Appointments
      </Typography>
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
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {appointment.first_name} {appointment.mid_name} {appointment.last_name}
                </TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.disease}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => onOpenPatient(appointment.user_id)} // Trigger parent handler
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Appointments Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Appointments;
