import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from '../Doctor/AppointmentModal';

export default function Slider() {
  const navigate = useNavigate()
  const handleNavigate = () =>{
    navigate("/AppointmentForm")
  }
  return (
    <Card sx={{maxWidth: 340 }} className='mt-4'>
      <CardActionArea className='d-flex'>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.pixabay.com/photo/2017/01/31/03/23/pointer-2022862_1280.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dr. JohnSon
          </Typography>
          <Typography>MBBS - General Medicine</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Apollo Hospital - Chennai
            Experianced - 5 years
          </Typography>
            <AppointmentModal/>
           {/* <Button onClick={handleNavigate} variant='contained'>Book</Button> */}
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
