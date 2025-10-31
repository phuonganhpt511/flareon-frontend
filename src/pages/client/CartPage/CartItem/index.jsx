// src/pages/client/CartPage/components/CartItem.jsx
import React from 'react'

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) {
    return null
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm mb-3">
      {/* Ảnh sản phẩm */}
      <img
        src={item.image || 'https://via.placeholder.com/80'}
        alt={item.dish_name || 'Tên món ăn'}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />

      {/* Thông tin sản phẩm */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.dish_name || 'N/A'}</h3>
        <p className="text-red-500 font-semibold mt-1">
          {(item.price ?? 0).toLocaleString('vi-VN')} đ
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrease}
          className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
          aria-label="Giảm số lượng"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="font-semibold w-8 text-center">{item.quantity || 0}</span>
        <button
          onClick={onIncrease}
          className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-600"
          aria-label="Tăng số lượng"
        >
          +
        </button>
        <button
          onClick={onRemove}
          className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Xóa món ăn"
          title="Xóa món ăn"
        >
          {/* Icon Xóa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem
