import React from 'react';

const Banner = () => (
  <div className="w-full h-40 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden mb-4">
    <div className="relative w-full h-full">
      <img src="/images/banner.png" alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute left-8 top-8 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
        Banner title
      </div>
    </div>
  </div>
);

export default Banner;
