// src/components/CategoryList/index.jsx

import React from 'react';

// Dữ liệu mẫu
const categoryData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: 'Trái cây',
  imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=300',
}));

const CategoryList = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">
        Danh mục
      </h2>

      <div className="grid grid-cols-5 gap-x-4 gap-y-6 md:gap-x-6">
        {categoryData.map((category) => (
          <div key={category.id} className="text-center">
            <a href="#" className="block group">
              {/* === THAY ĐỔI KÍCH THƯỚC Ở ĐÂY === */}
              <div 
                className="
                  relative mx-auto w-11 h-11 sm:w-22 sm:h-22 rounded-full bg-slate-100 
                  overflow-hidden transition-transform duration-300 group-hover:scale-105
                "
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="mt-3 text-sm sm:text-base font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                {category.name}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;