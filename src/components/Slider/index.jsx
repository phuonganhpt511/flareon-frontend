// src/components/BannerSlider.jsx

import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

// Dữ liệu mẫu cho các slide
const slideData = [
  {
    title: 'Fresh Pears for Your Delight',
    imageUrl: 'https://images.unsplash.com/photo-1604223521403-72a395690b95?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Discover Our New Collection',
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3b2a2553?q=80&w=2671&auto=format&fit=crop',
  },
  {
    title: 'Healthy Choices, Happy Life',
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2515&auto=format&fit=crop',
  },
];


const BannerSlider = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          '--swiper-pagination-color': '#000000',
          '--swiper-pagination-bullet-inactive-color': '#999999',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-size': '8px',
          '--swiper-pagination-bullet-horizontal-gap': '6px'
        }}
        className="h-32 sm:h-56 w-full rounded-lg"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide 
            key={index} 
            // === THAY ĐỔI 1: BIẾN SLIDE THÀNH NỀN VÀ LÀM CONTAINER VỊ TRÍ ===
            className="relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Lớp phủ tối để làm nổi bật chữ */}
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>

            {/* === THAY ĐỔI 2: ĐẶT TIÊU ĐỀ LÊN TRÊN VÀ CĂN CHỈNH === */}
            <div className="relative z-10 flex h-full items-center justify-start p-6 md:p-12">
              <h2 className="text-white text-3xl md:text-5xl font-bold max-w-sm">
                {slide.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;