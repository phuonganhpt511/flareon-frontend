// src/components/ProductList/index.jsx

import React from 'react';
import ProductCard from '../ProductCard'; // Import card component

// Dữ liệu mẫu
const productsData = [
  { id: 1, name: 'Dưa hấu', description: 'Ruột đỏ, không hạt', price: '25.000đ/kg', imageUrl: 'https://images.unsplash.com/photo-1582281298055-e24e9d63d823?q=80&w=300' },
  { id: 2, name: 'Củ cải đỏ', description: 'Tươi ngon, VietGAP', price: '15.000đ/bó', imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300' },
  { id: 3, name: 'Nấm hương', description: 'Nấm khô loại 1', price: '45.000đ/lạng', imageUrl: 'https://images.unsplash.com/photo-1574975005128-3610271375d3?q=80&w=300' },
  { id: 4, name: 'Cherry vàng', description: 'Nhập khẩu Mỹ', price: '350.000đ/kg', imageUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479703592?q=80&w=300' },
];

const ProductList = ({ title, products = productsData }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* TIÊU ĐỀ */}
      <div className="flex items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">{title}</h2>
        <a href="#" className="ml-2 text-orange-500 transition hover:text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* LƯỚI SẢN PHẨM RESPONSIVE */}
      {/* 1 cột trên mobile, 2 cột trên tablet (`sm:`), 3 cột trên PC (`md:`) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;