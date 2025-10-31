import { SmileOutlined } from '@ant-design/icons'
import React from 'react'

// Nhận prop onAddToCart (có thể là undefined nếu ở trang /category)
const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
      {Array.isArray(products) &&
        products.map((product) => (
          // Thẻ sản phẩm
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
          >
            {/* Ảnh sản phẩm */}
            <div className="w-full h-32 sm:h-40 md:h-48 overflow-hidden">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name || 'Ảnh sản phẩm'}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="p-3 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm md:text-base text-gray-800 mb-1 truncate">
                  {product.name || 'N/A'}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description || ''}
                </p>
              </div>
              {/* Giá tiền */}
              <p className="text-red-500 font-bold text-sm md:text-base mt-1">
                {(product.price ?? 0).toLocaleString('vi-VN')} đ
              </p>
            </div>

            {/* Nút "+" Thêm vào giỏ */}
            {/* Chỉ hiển thị nút nếu có hàm onAddToCart được truyền xuống */}
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)} // Gọi hàm được truyền xuống
                className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-md w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-orange-600 transition shadow-sm"
                aria-label="Thêm vào giỏ"
                title="Thêm vào giỏ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        ))}

// const ProductCard = ({ product }) => {
//   return (
//     <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
//       <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
//       <div className="p-3">
//         <h3 className="font-semibold text-base">{product.name}</h3>
//         <p className="text-sm text-gray-500">{product.description}</p>
//         <p className="text-red-500 font-bold mt-1">{product.price}</p>
//         <button className="mt-2 flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
//           <SmileOutlined />
//           {/* <ShoppingCart size={16} /> Mua */}
//         </button>
//       </div>
//     </div>
  )
}

export default ProductGrid
