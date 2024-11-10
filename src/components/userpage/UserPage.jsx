import React from "react";
import Slider from "./Slider";
import { Typography } from "@mui/material";
import Pie from "./Pie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Bar from "./Bar";
import UserDetails from "./UserDetails";
import History from "./History";
import {Box} from "@mui/material";
// import { SwiperClass } from "swiper/react";

export default function UserPage(){
    // SwiperCore.use([Pagination, Navigation, Autoplay]);
    return(
        <>
        <div className="container">
                    <UserDetails />
        </div>

        <div className="container d-flex flex-wrap">
            <Box 
                sx={{ 
                    flexBasis: { xs: '100%', md: '50%' },
                    maxWidth: { xs: '100%', md: '50%' },
                }}
                className="mt-4 mb-2"
            >
                <Typography variant="h6">Health Status</Typography>
                <Pie />
            </Box>
            <Box 
                sx={{ 
                    flexBasis: { xs: '100%', md: '50%' },
                    maxWidth: { xs: '100%', md: '50%' },
                }}
                className="mt-4 mb-2"
            >
                <Typography variant="h6">Medication</Typography>
                <Bar />
            </Box>
        </div>

        <div className="container">
            <div className="col-12 mt-4 mb-2">
                <div className="col-lg-12 col-sm-12  d-flex justify-content-center">
                    <History/>
                </div>
            </div>
        </div>

        <div>
      <Typography className="text-center" variant="h4">BOOK APPOINTMENTS</Typography>
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
            // Adjust slidesPerView based on screen width
            320: { slidesPerView: 1 },    // Mobile devices
            640: { slidesPerView: 2 },    // Small tablets
            1024: { slidesPerView: 3 },   // Desktop and larger screens
          }}
        >
          <SwiperSlide><Slider /></SwiperSlide>
          <SwiperSlide><Slider /></SwiperSlide>
          <SwiperSlide><Slider /></SwiperSlide>
          <SwiperSlide><Slider /></SwiperSlide>
          <SwiperSlide><Slider /></SwiperSlide>
          <SwiperSlide><Slider /></SwiperSlide>
        </Swiper>
      </div>
    </div>
    </>
    )
}