import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

function FacilityManagement() {
  const [hospitals, setHospitals] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentHospital, setCurrentHospital] = useState({
    name: '',
    services: '',
    address: '',
    contact: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch hospitals on component mount
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-hospital');
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentHospital({ name: '', services: '', address: '', contact: '', location: '' });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHospital({ ...currentHospital, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await fetch(`http://127.0.0.1:8000/update-hospital/${currentHospital.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentHospital),
        });
        
        if (response.ok) {
          fetchHospitals(); // Refresh the list
        }
      } else {
        const response = await fetch('http://127.0.0.1:8000/create-hospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentHospital),
        });
        
        if (response.ok) {
          fetchHospitals(); // Refresh the list
        }
      }
      handleClose();
    } catch (error) {
      console.error('Error saving hospital:', error);
    }
  };

  const handleEdit = (hospital) => {
    setCurrentHospital(hospital);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete-hospital/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchHospitals(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
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
              <TableCell>Name</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.services}</TableCell>
                <TableCell>{hospital.address}</TableCell>
                <TableCell>{hospital.contact}</TableCell>
                <TableCell>{hospital.location}</TableCell>
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
            name="contact"
            label="Contact Number"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.contact}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            value={currentHospital.location}
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