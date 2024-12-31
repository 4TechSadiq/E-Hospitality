import React, { useState } from 'react';
import { 
  FormControl,
  Typography,
  Container,
  Button,
  TextField,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/list-doctor');
      const doctors = await response.json();

      // Find doctor with matching credentials
      const doctor = doctors.find(
        doc => doc.doc_email.toLowerCase() === formData.email.toLowerCase() && 
               doc.password === formData.password
      );

      if (doctor) {
        // Store doctor info in sessionStorage
        sessionStorage.setItem('doctorId', doctor.doc_id);
        sessionStorage.setItem('doctorName', doctor.doc_name);
        
        // Navigate to doctor dashboard
        navigate(`/DoctorDashboard/${doctor.doc_id}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='d-flex rounded-5 shadow p-4' 
      sx={{background:'#F7F9F2', marginTop: '10vh'}} 
      maxWidth="lg">
      <Container>
        <img 
          className='img-fluid mt-3 mb-3' 
          style={{borderRadius: '10px', height:'30em'}} 
          src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg" 
          alt="Doctor login" 
        />
      </Container>
      <Container>
        <Typography className='text-center mt-4' variant='h2'>
          E-Hospitality
        </Typography>
        <div className='mt-3 p-4'>
          <Typography variant='h5'>Doctor-Login</Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-3 mt-4'>
              <FormControl sx={{width: '100%'}}>
                <TextField 
                  type='email' 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email ID"
                  required
                />
              </FormControl>
            </div>
            <div className='mb-3 mt-4'>
              <FormControl sx={{width: '100%'}}>
                <TextField 
                  type='password'
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  required
                />
              </FormControl>
            </div>
            <div className='d-flex justify-content-center gap-2 mt-5'>
              <Button 
                size='medium' 
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className='mt-2'>
              <a href='#'>
                <Typography className='text-center'>
                  Forgot Password?
                </Typography>
              </a>
            </div>
          </form>
        </div>
      </Container>
    </Container>
  );
}