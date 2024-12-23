import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AppointmentModal from '../Doctor/AppointmentModal';

export default function Slider({ doctor }) {
  if (!doctor) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 340 }} className="mt-4">
      <CardActionArea className="d-flex">
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.pixabay.com/photo/2017/01/31/03/23/pointer-2022862_1280.png"
          alt={doctor.doc_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {doctor.doc_name}
          </Typography>
          <Typography>{doctor.category}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {doctor.hospital} - Experienced: {doctor.experience || 'N/A'} years
          </Typography>
          <AppointmentModal />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
