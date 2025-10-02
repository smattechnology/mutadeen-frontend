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
      spaceBetween={20}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform scale-105 hover:scale-110 transition-transform duration-500"></div>

            {/* Slide Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-white text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                {slide}
              </h2>
              <p className="text-sm sm:text-base md:text-lg opacity-90">
                This is a beautiful description for the slide.
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
