import React, { useState, useEffect } from 'react';
import { Button, Container, Grid2, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

function AppointmentForm({ doc_id,user_id }) {
  const [formData, setFormData] = useState({
    first_name: '',
    mid_name: '',
    last_name: '',
    phone: '',
    email: '',
    disease: '',
    description: '',
    doc_id: '', // Default to an empty string
    user_id: '', // Default to an empty string
  });

  useEffect(() => {
    if (doc_id) {
      // Set the doc_id once it is available
      setFormData((prev) => ({
        ...prev,
        doc_id, // Update doc_id if it's passed as a prop
      }));
    }
  }, [doc_id]); // Re-run this effect if doc_id changes

  useEffect(() => {
    if (user_id) {
      // Set the doc_id once it is available
      setFormData((prev) => ({
        ...prev,
        user_id, // Update doc_id if it's passed as a prop
      }));
    }
  }, [user_id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ap_id = `AP-${Math.floor(1000 + Math.random() * 9000)}`; // Generate appointment ID

    try {
      const response = await axios.post('http://127.0.0.1:8000/create-appointment', {
        ...formData,
        ap_id,
      });
      alert('Appointment submitted successfully!');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      mid_name: '',
      last_name: '',
      phone: '',
      email: '',
      disease: '',
      description: '',
      doc_id: '', // Reset doc_id as well
      user_id: '', // Reset user_id as well
    });
  };

  return (
    <Container>
      <Typography className="mb-4 mt-4" variant="h4">Appointment Details</Typography>
      <Box
        sx={{ flexGrow: 1 }}
        padding={2}
        className="p-1"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <TextField
              fullWidth
              required
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label="Middle Name"
              name="mid_name"
              value={formData.mid_name}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              required
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={3}>
            <TextField
              fullWidth
              required
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={9}>
            <TextField
              fullWidth
              required
              label="Email ID"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label="Disease"
              name="disease"
              value={formData.disease}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Disease Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid2>
          <Container className="d-flex justify-content-end gap-2">
            <Grid2 size={2}>
              <Button
                type="reset"
                sx={{ background: '#FD1919FF' }}
                variant="contained"
                onClick={handleReset}
              >
                Clear
              </Button>
            </Grid2>
            <Grid2 size={2}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid2>
          </Container>
        </Grid2>
      </Box>
    </Container>
  );
}

export default AppointmentForm;
