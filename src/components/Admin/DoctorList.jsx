import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Avatar, Grid, Alert, Snackbar, CircularProgress
} from '@mui/material';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/list-doctor');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      showSnackbar('Error fetching doctors: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newDoctor.doc_name) errors.doc_name = 'Name is required';
    if (!newDoctor.doc_email) {
      errors.doc_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newDoctor.doc_email)) {
      errors.doc_email = 'Invalid email format';
    }
    if (!newDoctor.hospital) errors.hospital = 'Hospital is required';
    if (!newDoctor.category) errors.category = 'Category is required';
    if (!newDoctor.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(newDoctor.phone)) {
      errors.phone = 'Invalid phone number format';
    }
    if (!editMode && !newDoctor.password) errors.password = 'Password is required';
    if (!newDoctor.doc_id) errors.doc_id = 'Doctor ID is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      showSnackbar('Please select an image file', 'error');
      return;
    }
    setSelectedFile(file);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar('Please fill in all required fields correctly', 'error');
      return;
    }
  
    setLoading(true);
    try {
      let endpoint;
      const formData = new FormData();
      
      // Prepare base doctor data
      const doctorData = {
        doc_id: newDoctor.doc_id,
        doc_name: newDoctor.doc_name,
        doc_email: newDoctor.doc_email,
        hospital: newDoctor.hospital,
        category: newDoctor.category,
        price: parseFloat(newDoctor.price) || null,
        phone: newDoctor.phone,
        experiance: newDoctor.experiance
      };
  
      Object.entries(doctorData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
  
      if (!editMode || newDoctor.password) {
        formData.append('password', newDoctor.password);
      }
  
      if (selectedFile) {
        formData.append('profile', selectedFile);
      }
  
      if (editMode) {
        endpoint = `http://127.0.0.1:8000/update-doctor/${selectedDoctor.id}/`;
      } else {
        endpoint = 'http://127.0.0.1:8000/create-doctor';
      }
  
      const response = await fetch(endpoint, {
        method: editMode ? 'PUT' : 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle validation errors
        if (data.fields) {
          setFormErrors(data.fields);
          throw new Error('Please correct the highlighted fields');
        }
        throw new Error(data.detail || 'Operation failed');
      }
  
      setDoctors(prevDoctors => {
        if (editMode) {
          return prevDoctors.map(doctor =>
            doctor.id === selectedDoctor.id ? data : doctor
          );
        } else {
          return [...prevDoctors, data];
        }
      });
  
      showSnackbar(`Doctor successfully ${editMode ? 'updated' : 'added'}!`);
      handleCloseDialog();
    } catch (error) {
      console.error('Error details:', error);
      showSnackbar(error.message || 'An error occurred while saving', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete-doctor/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }

      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      showSnackbar('Doctor successfully deleted');
    } catch (error) {
      showSnackbar('Error deleting doctor: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setNewDoctor({
      doc_name: doctor.doc_name,
      doc_email: doctor.doc_email,
      hospital: doctor.hospital,
      category: doctor.category,
      price: doctor.price,
      phone: doctor.phone,
      profile: doctor.profile,
      experiance: doctor.experiance,
      doc_id: doctor.doc_id,
      password: ''
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedDoctor(null);
    setNewDoctor({
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
    setSelectedFile(null);
    setFormErrors({});
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Doctors Directory</h1>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          Add New Doctor
        </Button>
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      )}

      {!loading && (
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
                      onClick={() => handleEdit(doctor)}
                      disabled={loading}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(doctor.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Doctor ID"
                name="doc_id"
                value={newDoctor.doc_id}
                onChange={handleInputChange}
                disabled={editMode}
                error={!!formErrors.doc_id}
                helperText={formErrors.doc_id}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="doc_name"
                value={newDoctor.doc_name}
                onChange={handleInputChange}
                error={!!formErrors.doc_name}
                helperText={formErrors.doc_name}
                required
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
                error={!!formErrors.doc_email}
                helperText={formErrors.doc_email}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hospital"
                name="hospital"
                value={newDoctor.hospital}
                onChange={handleInputChange}
                error={!!formErrors.hospital}
                helperText={formErrors.hospital}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={newDoctor.category}
                onChange={handleInputChange}
                error={!!formErrors.category}
                helperText={formErrors.category}
                required
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
                error={!!formErrors.price}
                helperText={formErrors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={newDoctor.phone}
                onChange={handleInputChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="file"
                inputProps={{
                  accept: 'image/*'
                }}
                onChange={handleFileChange}
                error={!!formErrors.profile}
                helperText={formErrors.profile}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience"
                name="experiance"
                value={newDoctor.experiance}
                onChange={handleInputChange}
                error={!!formErrors.experiance}
                helperText={formErrors.experiance}
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
                error={!!formErrors.password}
                helperText={formErrors.password}
                required={!editMode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {editMode ? 'Update Doctor' : 'Add Doctor'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DoctorList;