import { Container, Typography } from "@mui/material";
import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from "./Slider";


export default function Consult(){
    return(
        <>
            <Container>
                <Container className="mt-4">
                    <Typography variant="h3">Consult Doctor</Typography>
                    <Container className="d-flex mt-4 justify-content-start">
                        <Autocomplete 
                        disablePortal
                        options={['a','b','c']}
                        sx={{ width: '50%' }}
                        renderInput={(params) => <TextField {...params} label="Search Category or Doctor" />}
                        />
                    </Container>
                </Container>
                <Container className="d-flex justify-content-evenly mt-4 mb-5 flex-wrap">
                    <Slider/>
                    <Slider/>
                    <Slider/>
                    <Slider/>
                    <Slider/>
                    <Slider/>

                </Container>
            </Container>
        </>
    )
}