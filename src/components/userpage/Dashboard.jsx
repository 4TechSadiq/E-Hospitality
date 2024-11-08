import React from "react";
import Appbar from "./Appbar";
import Slider from "./Slider";
import { Typography } from "@mui/material";


export default function Dashboard() {
    return(
    <>
    <Appbar/>
    
    <div className=' mt-5'>
    <Typography className="text-center" variant='h4'>Book Appointments</Typography>
    <div className="d-flex justify-content-center mt-4 gap-5">
    <Slider/>
    <Slider/>
    <Slider/>
    </div>
    </div>
    </>

    )
}