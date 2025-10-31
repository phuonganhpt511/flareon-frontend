import React from 'react'

// Giả sử component cha sẽ truyền xuống prop onAddToCart: (product) => void
const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
      {' '}
      {/* Điều chỉnh gap */}
      {Array.isArray(products) &&
        products.map((product) => (
          // Thẻ sản phẩm
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
          >
            {' '}
            {/* Thêm relative */}
            {/* Ảnh sản phẩm */}
            <div className="w-full h-32 sm:h-40 md:h-48 overflow-hidden">
              {' '}
              {/* Chiều cao ảnh */}
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name || 'Ảnh sản phẩm'}
                className="w-full h-full object-cover" // Bỏ hover effect nếu không cần
              />
            </div>
            {/* Thông tin sản phẩm */}
            <div className="p-3 flex-grow flex flex-col justify-between">
              {' '}
              {/* Thêm padding và flex */}
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
            {/* Nút "+" Thêm vào giỏ (đặt ở góc dưới bên phải) */}
            <button
              onClick={() => onAddToCart && onAddToCart(product)}
              className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-md w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-orange-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" // Định vị tuyệt đối, style nút vuông
              disabled={!onAddToCart}
              aria-label="Thêm vào giỏ"
              title="Thêm vào giỏ" // Tooltip
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
          </div>
        ))}
    </div>
  )
}

export default ProductGrid
