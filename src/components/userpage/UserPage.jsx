import React from "react";
import { useParams } from "react-router-dom";
import Slider from "./Slider";
import { Typography, Box } from "@mui/material";
import Pie from "./Pie";
import Bar from "./Bar";
import UserDetails from "./UserDetails";
import History from "./History";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function UserPage() {
  const { userId } = useParams(); // Extract userId from URL

  return (
    <>
      <div className="container">
        <UserDetails userId={userId} />
      </div>

      <div className="container d-flex flex-wrap">
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "50%" },
            maxWidth: { xs: "100%", md: "50%" },
          }}
          className="mt-4 mb-2"
        >
          <Typography variant="h6">Health Status</Typography>
          <Pie />
        </Box>
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "50%" },
            maxWidth: { xs: "100%", md: "50%" },
          }}
          className="mt-4 mb-2"
        >
          <Typography variant="h6">Medication</Typography>
          <Bar />
        </Box>
      </div>

      <div className="container">
        <div className="col-12 mt-4 mb-2">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-center">
            <History />
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
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
            <SwiperSlide>
              <Slider />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
