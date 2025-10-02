"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Props interface
interface CarouselProps {
  slides: string[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-64 w-full flex flex-col items-center justify-center 
                          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                          rounded-xl shadow-lg text-white text-center p-4"
          >
            <h2 className="text-2xl font-bold mb-2">{slide}</h2>
            <p className="text-sm opacity-90">
              This is a beautiful description for the slide.
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
