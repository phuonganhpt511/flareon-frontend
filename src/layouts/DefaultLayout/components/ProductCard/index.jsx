// src/layouts/DefaultLayout/components/ProductCard/index.jsx

import { SmileOutlined } from '@ant-design/icons'
import React from 'react'

// Đây mới là code đúng cho ProductCard (component hiển thị 1 thẻ sản phẩm)
const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name || 'Ảnh sản phẩm'}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-base">{product.name || 'N/A'}</h3>
        <p className="text-sm text-gray-500">{product.description || ''}</p>
        <p className="text-red-500 font-bold mt-1">
          {(product.price ?? 0).toLocaleString('vi-VN')} đ
        </p>
        <button className="mt-2 flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
          <SmileOutlined />
          {/* <ShoppingCart size={16} /> Mua */}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
