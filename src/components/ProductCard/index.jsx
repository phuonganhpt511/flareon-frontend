// src/components/ProductCard/index.jsx

import React, { useState } from 'react';

const sampleProduct = {
  name: 'Củ cải đỏ',
  description: 'Tươi ngon, đạt chuẩn VietGAP',
  price: '15.000đ/bó',
  imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300',
};

const ProductCard = ({ product = sampleProduct }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="flex md:flex-col gap-4 bg-white rounded-xl p-4">
      {/* PHẦN HÌNH ẢNH */}
      <div className="w-22 h-22 md:w-full md:h-auto flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg md:aspect-square"
        />
      </div>

      {/* Container thông tin sản phẩm */}
      <div className="flex-grow flex flex-col justify-between">
        
        {/* Phần trên: Tên và mô tả */}
        <div>
          <h3 className="font-bold text-gray-800 text-base">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 h-10">{product.description}</p>
        </div>

        {/* Phần dưới: Hàng chứa Giá và Nút bấm */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-base font-semibold text-gray-900">{product.price}</p>
          
          {/* === THAY ĐỔI CHÍNH NẰM Ở ĐÂY: justify-center -> justify-end === */}
          <div className="flex justify-end items-center w-24 h-8">
            {quantity === 0 ? (
              <button
                onClick={handleIncrease}
                className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-lg transition hover:bg-orange-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={handleDecrease}
                  className="flex items-center justify-center w-7 h-7 bg-transparent border border-orange-500 text-orange-500 rounded-md transition hover:bg-orange-50"
                >
                  -
                </button>
                <span className="font-bold text-center">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-md transition hover:bg-orange-600"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;