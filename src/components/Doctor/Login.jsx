import * as React from 'react'
import { FormControl,Input, FormLabel, InputLabel, FormHelperText } from '@mui/material'
import {Typography} from '@mui/material'
import {Container, Button} from '@mui/material'
import {Grid2} from '@mui/material'
import {Box} from '@mui/material'
import {TextField } from '@mui/material'
import {MenuItem, Select} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';

export default function Login(){
    return(
        <Container className='d-flex rounded-5 shadow p-4 ' sx={{background:'#F7F9F2', marginTop: '10vh'}} maxWidth="lg">
            <Container className=''>
                <img className='img-fluid mt-3 mb-3' style={{borderRadius: '10px', height:'30em'}} src="https://media.licdn.com/dms/image/C5612AQGJi9QozuNXHQ/article-cover_image-shrink_720_1280/0/1595043879529?e=2147483647&v=beta&t=pTPR5LKSljMEzYk8QHzT5Oqq9u0xekAVWKLL6mip_Jg" alt="" />
            </Container>
            <Container className=''>
                <Typography className='text-center mt-4' variant='h2'>E-Hospitality</Typography>
                <div className='mt-3 p-4'>
                <Typography className='text-' variant='h5'>Login-Doctor Portal</Typography>
                <form>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField type='email' sx={{width: '100%'}} label="Email ID"></TextField>
                    </FormControl>
                </div>
                <div className='mb-3 mt-4'>
                    <FormControl sx={{width: '100%'}}>
                        <TextField type='password' sx={{width: '100%'}} label="Password"></TextField>
                    </FormControl>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                <Button size='medium' variant="contained">Login</Button>
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
