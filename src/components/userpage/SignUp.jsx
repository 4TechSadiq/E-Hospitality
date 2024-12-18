import * as React from 'react';
import {
    FormControl,
    InputLabel,
    Typography,
    Container,
    Button,
    TextField,
    MenuItem,
    Select,
    Grid,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null); // State for file upload
    const navigate = useNavigate();

    const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Entered value is:", formData);

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match', {
                position: 'top-center',
                theme: 'colored',
            });
            return;
        }

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));
            if (file) {
                data.append("profile", file);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/create-user/",
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201) {
                const user_id = response.data.id; // Assuming the server response contains the user ID
                toast.success('User Created Successfully', {
                    position: 'top-center',
                    theme: 'colored',
                });
                navigate(`/UserDashboard/${user_id}`); // Navigate to the UserDashboard route
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
            className="d-flex rounded-5 shadow p-4 mb-5"
            sx={{ background: '#F7F9F2', marginTop: '10vh' }}
            maxWidth="lg"
        >
            <ToastContainer />
            <Grid container spacing={3}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <img
                        className="img-fluid mt-3 mb-3"
                        style={{ borderRadius: '10px', height: '30em', width: '100%' }}
                        src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg"
                        alt="SignUp Banner"
                    />
                </Grid>

                {/* Form Section */}
                <Grid item xs={12} md={6}>
                    <Typography className="text-center mt-4" variant="h2">
                        E-Hospitality
                    </Typography>
                    <div className="mt-3 p-4">
                        <Typography className="mb-3" variant="h6">
                            SignUp
                        </Typography>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* First Name and Last Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="first_name"
                                        onChange={handleInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="last_name"
                                        label="Last Name"
                                        onChange={handleInput}
                                    />
                                </Grid>

                                {/* Phone Number and Gender */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="phone"
                                        onChange={handleInput}
                                        label="Phone No"
                                        sx={{
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield',
                                            },
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                margin: 0,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Gender
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Gender"
                                            name="gender"
                                            onChange={handleInput}
                                        >
                                            <MenuItem value={"male"}>Male</MenuItem>
                                            <MenuItem value={"female"}>Female</MenuItem>
                                            <MenuItem value={"other"}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Address */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        onChange={handleInput}
                                        name="address"
                                        type="text"
                                        label="Address"
                                    />
                                </Grid>

                                {/* Profile Upload */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <input
                                            onChange={handleFileChange}
                                            name="profile"
                                            type="file"
                                            className="form-control"
                                        />
                                    </FormControl>
                                </Grid>

                                {/* Email */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        onChange={handleInput}
                                        name="email"
                                        type="email"
                                        label="Email ID"
                                    />
                                </Grid>

                                {/* Password and Confirm Password */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        onChange={handleInput}
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        onChange={handleInput}
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                    >
                                        SignUp
                                    </Button>
                                </Grid>

                                {/* Already Have an Account */}
                                <Grid item xs={12}>
                                    <Typography className="text-center">
                                        <a href="#">Already have an account?</a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
