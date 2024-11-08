import React from "react";
import Appbar from "./Appbar";
import Slider from "./Slider";
import { Typography } from "@mui/material";
import Pie from "./Pie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Dashboard() {
    return (
        <>
            <Appbar />
            <div className='container mt-5'>
                <div className="container">
                    <div>
                        <Typography className="" variant='h4'>HEALTH</Typography>
                        <Pie />
                    </div>
                </div>

                <div>
                    <Typography className="text-center" variant='h4'>BOOK APPOINTMENTS</Typography>
                    <div className="d-flex flex-wrap justify-content-center mt-4 gap-5 p-5">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={3}
                            pagination={{ clickable: true }}
                            navigation
                            autoplay={{ delay: 3000 }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
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
            </div>
        </>
    );
}
