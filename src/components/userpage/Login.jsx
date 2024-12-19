import * as React from 'react'
import { FormControl,Input, FormLabel, InputLabel, FormHelperText } from '@mui/material'
import {Typography} from '@mui/material'
import {Container, Button} from '@mui/material'
import {Grid2} from '@mui/material'
import {Box} from '@mui/material'
import {TextField } from '@mui/material'
import {MenuItem, Select} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login(){
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleInput = (e) => {
        e.preventDefault();
        const{name, value}= e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://127.0.0.1:8000/list-users",{
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                }
                body: JSON.stringify(formData)
            })
        }
    }
    return(
        <Container className='d-flex rounded-5 shadow p-4 ' sx={{background:'#F7F9F2', marginTop: '10vh'}} maxWidth="lg">
            <Container className=''>
                <img className='img-fluid mt-3 mb-3' style={{borderRadius: '10px', height:'30em'}} src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg" alt="" />
            </Container>
            <Container className=''>
                <Typography className='text-center mt-4' variant='h2'>E-Hospitality</Typography>
                <div className='mt-3 p-4'>
                <Typography className='text-' variant='h5'>Login</Typography>
                <form>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField onChange={handleInput} name='email' type='email' sx={{width: '100%'}} label="Email ID"></TextField>
                    </FormControl>
                </div>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField onChange={handleInput} name='password' type='password' sx={{width: '100%'}} label="Password"></TextField>
                    </FormControl>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                <Button size='medium' variant="contained">Login</Button>
                </div>
                <div className='mt-2'>
                    <a href='signup'>
                        <Typography className='text-center'>Don't have Account? SignUp</Typography>
                    </a>
                </div>
                <div className='mt-2'>
                    <a href='#'>
                        <Typography className='text-center'><Link to='/Doc-login'>DoctorDashboard</Link></Typography>
                    </a>
                </div>
                </form>
                </div>
            </Container>
        </Container>
    )

}
