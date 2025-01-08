import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Avatar
} from '@mui/material';

// Sample data for doctors
const initialDoctors = [
  { id: 1, name: 'Dr. John Doe', hospital: 'City Hospital', category: 'Cardiologist', fees: 100, phone: '123-456-7890', image: 'https://example.com/doctor1.jpg' },
  { id: 2, name: 'Dr. Jane Smith', hospital: 'Central Clinic', category: 'Pediatrician', fees: 80, phone: '098-765-4321', image: 'https://example.com/doctor2.jpg' },
];

function DoctorList() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [open, setOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    hospital: '',
    category: '',
    fees: '',
    phone: '',
    image: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewDoctor({
      name: '',
      hospital: '',
      category: '',
      fees: '',
      phone: '',
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleSubmit = () => {
    const id = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    setDoctors([...doctors, { ...newDoctor, id, fees: Number(newDoctor.fees) }]);
    handleClose();
  };

  return (
    <div className="space-y-4">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Doctor
      </Button>
      <TableContainer component={Paper}>
        <Table>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Doctor Name"
            type="text"
            fullWidth
            variant="standard"
            value={newDoctor.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hospital"
            label="Hospital"
            type="text"
            fullWidth
            variant="standard"
            value={newDoctor.hospital}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newDoctor.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="fees"
            label="Fees"
            type="number"
            fullWidth
            variant="standard"
            value={newDoctor.fees}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="tel"
            fullWidth
            variant="standard"
            value={newDoctor.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="url"
            fullWidth
            variant="standard"
            value={newDoctor.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DoctorList;

