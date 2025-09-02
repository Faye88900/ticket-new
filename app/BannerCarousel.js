"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerCarousel({ events }) {
  return (
    <div className="w-screen h-screen">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="relative w-full h-full">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h2 className="text-2xl font-bold">{event.title}</h2>
                <p className="text-sm">
                  {event.start_time} · {event.location}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}