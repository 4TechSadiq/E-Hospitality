import { Container, Grid2, TextField, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'




function AppointmentForm() {
  return (
    <Container>
        <Typography className='mb-4 mt-4' variant='h4'>Appointment details</Typography>
        <Box sx={{ flexGrow: 1 }} className='p-1' component="form">
            <Grid2 container >
                <Grid2 size={4}>
                    <TextField sx={{width:"95%"}} required label="Firstname"/>
                </Grid2>
                <Grid2 size={4}>
                    <TextField sx={{width:"95%"}} label="Middle Name"/>
                </Grid2>
                <Grid2 size={4}>
                    <TextField sx={{width:"95%"}} required label="Last Name"/>
                </Grid2>
                <Grid2 className="mt-3" size={3}>
                    <TextField sx={{width:"95%"}} required label="Phone Number"/>
                </Grid2>
                <Grid2 className="mt-3" size={9}>
                    <TextField sx={{width:"95%"}} required label="Email ID"/>
                </Grid2>
                <Grid2 className="mt-3" size={3}>
                    <TextField sx={{width:"95%"}} label="Disease"/>
                </Grid2>
                
            </Grid2>
        </Box>
    </Container>
  )
}

export default AppointmentForm