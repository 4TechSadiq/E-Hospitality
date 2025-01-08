import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AppointmentModal from './AppointmentModal';

export default function Slider({ doctor, user_id }) {
  if (!doctor || Object.keys(doctor).length === 0) {
    console.error('Invalid doctor object:', doctor);
    return <Typography>No doctor information provided.</Typography>;
  }

  console.log('Doctor in Slider:', doctor);

  return (
    <Card sx={{ maxWidth: 340 }} className="mt-4">
      <CardActionArea className="d-flex">
        <CardMedia
          component="img"
          height="140"
          image={doctor.image || 'https://cdn.vectorstock.com/i/500p/95/88/sign-symbol-health-logo-hospital-red-cross-vector-35679588.jpg'}
          alt={doctor.doc_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {doctor.doc_name}
          </Typography>
          <Typography>{doctor.category}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {doctor.hospital} - Experienced: {doctor.experiance || 'N/A'} years
          </Typography>
          <AppointmentModal user_id={user_id} doc_id={doctor.doc_id} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Slider.propTypes = {
  doctor: PropTypes.shape({
    doc_name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
    experience: PropTypes.number,
    image: PropTypes.string,
    doc_id: PropTypes.string.isRequired,
  }).isRequired,
  user_id: PropTypes.string.isRequired,
};
