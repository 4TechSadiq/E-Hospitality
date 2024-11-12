import React from "react";
import { Container, Grid2, Typography } from "@mui/material";
import {Box} from "@mui/material";
import { Grid } from "swiper/modules";
import { TextField } from "@mui/material";
import PrescriptionTable from "./PrescriptionTable";
import Barchart from "./Barchart";

export default function PatientModule() {
    return(
        <>
        <Container>
        <h1>Patient Detail</h1>
            <Box sx={{
                
                width: '100%', 
                height: '250px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                padding: '30px',

            }}>
                <Grid2 container spacing={2}>
                    <Grid2 item size={3} sx={{padding:'2px'}}>
                    <img  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="Patient" style={{width: '180px', height: '180px', borderRadius: '50%', border: 'solid 1px black'}}/>
                    </Grid2>
                    <Grid2 item xs={9}>
                        <Typography variant="h6" gutterBottom component="div">Patient Name: John Doe</Typography>
                        <Typography variant="h6" gutterBottom component="div">Patient Age: John Doe</Typography>
                        <Typography variant="h6" gutterBottom component="div">Patient Address: John Doe</Typography>
                        <Typography variant="h6" gutterBottom component="div">Blood Group: John Doe</Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>   
        <Container className="mt-4">
            <Typography variant="h5">Disease </Typography>
            <Box sx={{
                width: '40%',
                height: '50px',
                borderRadius: '10px',
                boxShadow: '0 1px 1px #ccc',
                border: '1px solid #ccc',
                padding: '10px',
                marginTop: '10px',
                ":hover": {
                    backgroundColor: '#ccc',
                    width: '42%',
                    transition: '0.5s'
                }
                }}>
                <Typography variant="subtitle1" gutterBottom component="div">Disease Name: John Doe</Typography>
            </Box>
            <Box sx={{
                width: '40%',
                height: '50px',
                borderRadius: '10px',
                boxShadow: '0 1px 1px #ccc',
                border: '1px solid #ccc',
                padding: '10px',
                marginTop: '10px',
                ":hover": {
                    backgroundColor: '#ccc',
                    width: '42%',
                    transition: '0.5s'
                }
                }}>
                <Typography variant="subtitle1" gutterBottom component="div">Disease Description: John Doe</Typography>
            </Box>
        </Container> 
        <Container>
                <Grid2 container spacing={2}>
                    <Grid2 item size={6}>
                        <Typography className="mt-3" variant="h5">Health Index</Typography>
                        <Barchart/>
                    </Grid2>

                    <Grid2 item size={6}>
                        <Typography className="mt-3" variant="h5">Health Index</Typography>
                        <Barchart/>
                    </Grid2>
                </Grid2>
        </Container>   
        <Container className="mt-4">
            <Typography variant="h5" className="mb-3">Prescription Table</Typography>
            <PrescriptionTable />
        </Container>   
          
        </>
    )
}
