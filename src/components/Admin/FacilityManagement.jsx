import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

// Sample data for hospitals
const initialHospitals = [
  { id: 1, name: 'City Hospital', services: 'General, Emergency', address: '123 Main St, City', contactNumber: '123-456-7890' },
  { id: 2, name: 'Central Clinic', services: 'Pediatrics, Orthopedics', address: '456 Oak Ave, Town', contactNumber: '098-765-4321' },
];

function FacilityManagement() {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [open, setOpen] = useState(false);
  const [currentHospital, setCurrentHospital] = useState({ id: '', name: '', services: '', address: '', contactNumber: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentHospital({ id: '', name: '', services: '', address: '', contactNumber: '' });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHospital({ ...currentHospital, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      setHospitals(hospitals.map(hospital => hospital.id === currentHospital.id ? currentHospital : hospital));
    } else {
      setHospitals([...hospitals, { ...currentHospital, id: hospitals.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (hospital) => {
    setCurrentHospital(hospital);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = (id) => {
    setHospitals(hospitals.filter(hospital => hospital.id !== id));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Add New Hospital
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.id}</TableCell>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.services}</TableCell>
                <TableCell>{hospital.address}</TableCell>
                <TableCell>{hospital.contactNumber}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(hospital)} sx={{ mr: 1 }}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(hospital.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Hospital' : 'Add New Hospital'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Hospital Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="services"
            label="Hospital Services"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.services}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Hospital Address"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="contactNumber"
            label="Contact Number"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.contactNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FacilityManagement;

