import * as React from 'react'
import { FormControl,Input, FormLabel, InputLabel, FormHelperText } from '@mui/material'
import {Typography} from '@mui/material'
import {Container, Button} from '@mui/material'
import {Grid2} from '@mui/material'
import {Box} from '@mui/material'
import {TextField } from '@mui/material'
import {MenuItem, Select} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react'

export default function SignUp(){

    const[formData,setFormData] = useState({})
    const handleInput = (e) => {
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return(
        <Container className='d-flex rounded-5 shadow p-4 ' sx={{background:'#F7F9F2', marginTop: '10vh'}} maxWidth="lg">
            <Container className=''>
                <img className='img-fluid mt-3 mb-3' style={{borderRadius: '10px', height:'30em'}} src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg" alt="" />
            </Container>
            <Container className=''>
                <Typography className='text-center mt-4' variant='h2'>E-Hospitality</Typography>
                <div className='mt-3 p-4'>
                <Typography variant='h6'>Create an Account</Typography>
                <form>
                <div className='mb-3 mt-3'>
                <Grid2 container spacing={2} alignItems="center">
                <FormControl fullWidth>
                    <Grid2 container item xs={12} spacing={2}>
                    <Grid2 item size={{xs:6}}>
                        <TextField sx={{width: '100%'}} label="First Name" onChange={handleInput} fullWidth />
                    </Grid2>
                    <Grid2 item size={{xs:6}}>
                        <TextField onChange={handleInput} sx={{width: '100%'}} label="Last Name" fullWidth />
                    </Grid2>
                    </Grid2>
                </FormControl>
                </Grid2>
                </div>
                <div className='mb-3 mt-4'>
                    <Grid2 container spacing={2}>
                    <Grid2 item size={{xs:7}}>
                    <TextField
                        type="number"
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
                    </Grid2>
                        <Grid2 size={{xs:5}}>
                        <FormControl fullWidth>
                        <InputLabel onChange={handleInput} id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            onChange={handleInput}
                        >
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                            <MenuItem value={30}>Other</MenuItem>
                        </Select>
                        </FormControl>
                        </Grid2>
                    </Grid2>
                </div>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField onChange={handleInput} type='email' sx={{width: '100%'}} label="Address"></TextField>
                    </FormControl>
                </div>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        {/* <TextField type='file' className='form-control' sx={{width: '100%'}} label=""></TextField> */}
                        <input onChange={handleInput} type='file' className='form-control' />
                    </FormControl>
                </div>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField onChange={handleInput} type='email' sx={{width: '100%'}} label="Email ID"></TextField>
                    </FormControl>
                </div>
                <div className='mb-3 mt-3'>
                <Grid2 container spacing={2} alignItems="center">
                <FormControl fullWidth>
                    <Grid2 container item xs={12} spacing={2}>
                    <Grid2 item size={{xs:6}}>
                        <TextField onChange={handleInput} sx={{width: '100%'}} label="Password" fullWidth />
                    </Grid2>
                    <Grid2 item size={{xs:6}}>
                        <TextField onChange={handleInput} sx={{width: '100%'}} label="Confirm Password" fullWidth />
                    </Grid2>
                    </Grid2>
                </FormControl>
                </Grid2>
                </div>
                <div className='d-flex justify-content-center'>
                <Button size='medium' variant="contained">SignUp</Button>
                </div>
                <div className='mt-2'>
                    <a href='#'>
                        <Typography className='text-center'>Already have an account?</Typography>
                    </a>
                </div>
                </form>
                </div>
            </Container>
        </Container>
    )

}
