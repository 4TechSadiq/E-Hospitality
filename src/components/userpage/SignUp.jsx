import * as React from 'react';
import { FormControl, InputLabel, Typography, Container, Button, TextField, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [formData, setFormData] = useState({});

    const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Entered value is:", formData);

        // Check if password and confirm_password match
        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match', {
                position: 'top-center',
                theme: 'colored',
            });
            return; // Exit the function without submitting
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/create-user/",
                formData,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                toast.success('User Created Successfully', {
                    position: 'top-center',
                    theme: 'colored',
                });
            } else {
                toast.error('User Creation Failed', {
                    position: 'top-center',
                    theme: 'colored',
                });
            }
        } catch (error) {
            console.log("Error is: ", error);
            toast.error('An error occurred while creating the user', {
                position: 'top-center',
                theme: 'colored',
            });
        }
    };

    return (
        <Container
            className="d-flex rounded-5 shadow p-4"
            sx={{ background: '#F7F9F2', marginTop: '10vh' }}
            maxWidth="lg"
        >
            <Container>
                <img
                    className="img-fluid mt-3 mb-3"
                    style={{ borderRadius: '10px', height: '30em' }}
                    src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg"
                    alt=""
                />
            </Container>
            <Container>
                <Typography className="text-center mt-4" variant="h2">
                    E-Hospitality
                </Typography>
                <div className="mt-3 p-4">
                    <Typography variant="h6">Create an Account</Typography>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <FormControl fullWidth>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="First Name"
                                    name="first_name"
                                    onChange={handleInput}
                                    fullWidth
                                />
                                <TextField
                                    onChange={handleInput}
                                    sx={{ width: '100%', marginTop: '1rem' }}
                                    name="last_name"
                                    label="Last Name"
                                    fullWidth
                                />
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-4">
                            <FormControl fullWidth>
                                <TextField
                                    type="number"
                                    name="phone"
                                    onChange={handleInput}
                                    label="Phone No"
                                    sx={{
                                        width: '100%',
                                        '& input[type=number]': {
                                            MozAppearance: 'textfield',
                                        },
                                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                    }}
                                />
                                <FormControl sx={{ width: '100%', marginTop: '1rem' }}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Gender"
                                        name="gender"
                                        onChange={handleInput}
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-4">
                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    onChange={handleInput}
                                    name="address"
                                    type="text"
                                    sx={{ width: '100%' }}
                                    label="Address"
                                />
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-4">
                            <FormControl sx={{ width: '100%' }}>
                                <input
                                    onChange={handleInput}
                                    name="profile"
                                    type="file"
                                    className="form-control"
                                />
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-4">
                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    name="email"
                                    onChange={handleInput}
                                    type="email"
                                    sx={{ width: '100%' }}
                                    label="Email ID"
                                />
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-3">
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleInput}
                                    sx={{ width: '100%', marginBottom: '1rem' }}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                                <TextField
                                    onChange={handleInput}
                                    sx={{ width: '100%' }}
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                />
                            </FormControl>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button size="medium" type="submit" variant="contained">
                                SignUp
                            </Button>
                        </div>
                        <div className="mt-2">
                            <a href="#">
                                <Typography className="text-center">
                                    Already have an account?
                                </Typography>
                            </a>
                        </div>
                    </form>
                </div>
            </Container>
        </Container>
    );
}
