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
import Bar from "./Bar";
import UserDetails from "./UserDetails";
import History from "./History";
import Footer from "./Footer";

export default function Dashboard() {
    return (
        <>
            <Appbar />
            <div className='container '>
                <div className="container">
                    <UserDetails />
                </div>

                <div className="container d-flex">
                    <div className="col-6 mt-4 mb-2">
                        <Typography variant="h6">Health Status</Typography>
                        <Pie />
                    </div>
                    <div className="col-6 mt-4 mb-2">
                        <Typography variant="h6">Medication</Typography>
                        <Bar />
                    </div>
                </div>
                <div className="container">
                    <div className="col-12 mt-4 mb-2">
                        <Typography className="text-center" variant="h6">Medical History</Typography>
                        <div className="col-12 p-5 d-flex justify-content-center">
                            <History/>
                        </div>
                    </div>
                </div>

                <div>
                    <Typography className="text-center" variant='h4'>BOOK APPOINTMENTS</Typography>
                    <div className="mt-4 p-5">
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
            <Footer/>
        </>
    );
}
