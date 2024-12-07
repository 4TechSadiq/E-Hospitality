import { Button, Container, Grid2, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


function AppointmentForm() {
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
    
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        /* firefox */
        &:focus-visible {
          outline: 0;
        }
      `,
      );
  return (
    <Container>
        <Typography className='mb-4 mt-4' variant='h4'>Appointment details</Typography>
        <Box sx={{ flexGrow: 1 }} className='p-1' component="form">
            <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    <TextField fullWidth required label="Firstname"/>
                </Grid2>
                <Grid2 size={4}>
                    <TextField fullWidth label="Middle Name"/>
                </Grid2>
                <Grid2 size={4}>
                    <TextField fullWidth required label="Last Name"/>
                </Grid2>
                <Grid2 className="mt-3" size={3}>
                    <TextField fullWidth required label="Phone Number"/>
                </Grid2>
                <Grid2 className="mt-3" size={9}>
                    <TextField fullWidth required label="Email ID"/>
                </Grid2>
                <Grid2 className="mt-3" size={4}>
                    <TextField fullWidth  label="Disease"/>
                </Grid2>
                <Grid2 className="mt-3" size={12}>
                <Textarea
                    sx={{width:"100%",minHeight:"100px"}}
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Disease Description"
                    defaultValue=""
                />
                </Grid2>
                <Container className='d-flex justify-content-end gap-2'>
                    <Grid2 size={1}>
                        <Button type='reset' sx={{background:"#FD1919FF"}} variant='contained'>Clear</Button>
                    </Grid2>
                    <Grid2 size={1}>
                        <Button variant='contained'>Submit</Button>
                    </Grid2>
                </Container>
                
            </Grid2>
        </Box>
    </Container>
  )
}

export default AppointmentForm