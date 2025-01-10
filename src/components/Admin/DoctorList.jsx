import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Avatar, Grid
} from '@mui/material';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    doc_name: '',
    doc_email: '',
    hospital: '',
    category: '',
    price: '',
    phone: '',
    profile: '',
    experiance: '',
    doc_id: '',
    password: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/list-doctor');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newDoctor,
          price: parseFloat(newDoctor.price)
        }),
      });
      
      if (response.ok) {
        const newDoctorData = await response.json();
        setDoctors([...doctors, newDoctorData]);
        setOpen(false);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/list-doctor/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Doctors Directory</h1>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add New Doctor
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <Avatar src={doctor.profile} alt={doctor.doc_name} />
                </TableCell>
                <TableCell>{doctor.doc_id}</TableCell>
                <TableCell>{doctor.doc_name}</TableCell>
                <TableCell>{doctor.doc_email}</TableCell>
                <TableCell>{doctor.hospital}</TableCell>
                <TableCell>{doctor.category}</TableCell>
                <TableCell>{doctor.experiance}</TableCell>
                <TableCell>${doctor.price}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: '0.5rem' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Doctor ID"
                name="doc_id"
                value={newDoctor.doc_id}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="doc_name"
                value={newDoctor.doc_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="doc_email"
                type="email"
                value={newDoctor.doc_email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hospital"
                name="hospital"
                value={newDoctor.hospital}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={newDoctor.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fees"
                name="price"
                type="number"
                value={newDoctor.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={newDoctor.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Profile Image URL"
                name="profile"
                value={newDoctor.profile}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience"
                name="experiance"
                value={newDoctor.experiance}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={newDoctor.password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DoctorList;