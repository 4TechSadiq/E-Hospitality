import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import Slider from './Slider';
import Pie from './Pie';
import Bar from './Bar';
import UserDetails from './UserDetails';
import History from './History';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ListAppointments from './ListAppointments';

export default function UserPage() {
  const { userId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/create-doctor');
        console.log('Doctors API response:', response.data);
        setDoctors(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setError('Failed to load doctor data.');
      }
    };

    fetchDoctors();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <div className="container">
        <UserDetails userId={userId} />
      </div>

      <div className="container">
        <div className="col-12 mt-4 mb-2">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-center">
            <History />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-12 mt-4 mb-2">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-center">
            <ListAppointments userId={userId}/>
          </div>
        </div>
      </div>
      <div>
        
        <Typography className="text-center" variant="h4">
          BOOK APPOINTMENTS
        </Typography>
        <div className="mt-4 p-1 mb-4">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {doctors.map((doctor) => {
              console.log('Doctor in map:', doctor);
              return (
                <SwiperSlide key={doctor.id}>
                  <Slider user_id={userId} doctor={doctor} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
