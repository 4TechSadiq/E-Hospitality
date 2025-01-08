import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample data for appointments
const initialAppointments = [
  { id: 1, doctor: 'Dr. John Doe', hospital: 'City Hospital', appointmentDate: new Date('2023-06-15'), paymentAmount: 150, paymentDate: new Date('2023-06-14') },
  { id: 2, doctor: 'Dr. Jane Smith', hospital: 'Central Clinic', appointmentDate: new Date('2023-06-16'), paymentAmount: 200, paymentDate: new Date('2023-06-16') },
];

function AppointmentManagement() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [open, setOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({ 
    id: '', doctor: '', hospital: '', appointmentDate: null, paymentAmount: '', paymentDate: null 
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentAppointment({ id: '', doctor: '', hospital: '', appointmentDate: null, paymentAmount: '', paymentDate: null });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAppointment({ ...currentAppointment, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setCurrentAppointment({ ...currentAppointment, [name]: date });
  };

  const handleSubmit = () => {
    if (isEditing) {
      setAppointments(appointments.map(appointment => 
        appointment.id === currentAppointment.id ? currentAppointment : appointment
      ));
    } else {
      setAppointments([...appointments, { ...currentAppointment, id: appointments.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (appointment) => {
    setCurrentAppointment(appointment);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
          Add New Appointment
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Payment Amount</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.hospital}</TableCell>
                  <TableCell>{appointment.appointmentDate.toLocaleDateString()}</TableCell>
                  <TableCell>${appointment.paymentAmount}</TableCell>
                  <TableCell>{appointment.paymentDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(appointment)} sx={{ mr: 1 }}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(appointment.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="doctor"
              label="Doctor"
              type="text"
              fullWidth
              variant="standard"
              value={currentAppointment.doctor}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="hospital"
              label="Hospital"
              type="text"
              fullWidth
              variant="standard"
              value={currentAppointment.hospital}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Appointment Date"
              value={currentAppointment.appointmentDate}
              onChange={(date) => handleDateChange('appointmentDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <TextField
              margin="dense"
              name="paymentAmount"
              label="Payment Amount"
              type="number"
              fullWidth
              variant="standard"
              value={currentAppointment.paymentAmount}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Payment Date"
              value={currentAppointment.paymentDate}
              onChange={(date) => handleDateChange('paymentDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>{isEditing ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}

export default AppointmentManagement;

