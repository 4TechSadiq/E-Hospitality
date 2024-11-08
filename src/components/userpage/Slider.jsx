import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';

export default function Slider() {
  return (
    <Card sx={{ maxWidth: 340 }}>
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
          <Button variant='contained'>Book</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
