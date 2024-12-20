import * as React from 'react'
import { FormControl, TextField, Typography, Container, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle Input Change
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/login-user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                toast.success("Login Successful: " + formData.email, {
                    position: 'top-center',
                    theme: "colored"
                });
                navigate(`/UserDashboard/${result.id}`);
            } else {
                const error = await response.json();
                toast.error(error.error || "Invalid credentials", {
                    position: 'top-center',
                    theme: "colored"
                });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Server Error. Please try again later.", {
                position: 'top-center',
                theme: "colored"
            });
        }
    };

    return (
        <Container className='d-flex rounded-5 shadow p-4' sx={{ background: '#F7F9F2', marginTop: '10vh' }} maxWidth="lg">
            <ToastContainer />
            <Container className=''>
                <img 
                    className='img-fluid mt-3 mb-3' 
                    style={{ borderRadius: '10px', height: '30em' }} 
                    src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg" 
                    alt="E-Hospitality" 
                />
            </Container>

            <Container className=''>
                <Typography className='text-center mt-4' variant='h2'>E-Hospitality</Typography>
                <div className='mt-3 p-4'>
                    <Typography variant='h5'>Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 mt-4'>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField 
                                    onChange={handleInput} 
                                    name='email' 
                                    type='email' 
                                    label="Email ID" 
                                    required 
                                    sx={{ width: '100%' }} 
                                />
                            </FormControl>
                        </div>

                        <div className='mb-3 mt-4'>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField 
                                    onChange={handleInput} 
                                    name='password' 
                                    type='password' 
                                    label="Password" 
                                    required 
                                    sx={{ width: '100%' }} 
                                />
                            </FormControl>
                        </div>

                        <div className='d-flex justify-content-center mt-5'>
                            <Button size='medium' type='submit' variant="contained">Login</Button>
                        </div>

                        <div className='mt-2'>
                            <Typography className='text-center'>
                                Don't have an account? <Link to='/signup'>SignUp</Link>
                            </Typography>
                        </div>

                        <div className='mt-2'>
                            <Typography className='text-center'>
                                <Link to='/Doc-login'>Doctor Dashboard</Link>
                            </Typography>
                        </div>
                    </form>
                </div>
            </Container>
        </Container>
    );
}
