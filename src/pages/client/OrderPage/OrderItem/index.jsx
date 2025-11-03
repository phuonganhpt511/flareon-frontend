import React from 'react'

// Component này hiển thị 1 MÓN ĂN trong ĐƠN HÀNG
const OrderItem = ({ item }) => {
  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return (amount || 0).toLocaleString('vi-VN') + 'đ';
  }

  return (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-xl mb-4 p-4 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center min-w-0">
        <img
          src={item.image || 'https://via.placeholder.com/100'}
          alt={item.name}
          className="w-[100px] h-[100px] rounded-sm object-cover mr-4"
        />
        <div className="min-w-0">
          <div className="font-semibold text-base truncate w-[200px]">{item.name} (x{item.quantity || 1})</div>
          <div className="text-sm text-gray-500 truncate w-[200px]">{item.description || 'Không có ghi chú'}</div>
          <div className="text-orange-600 font-bold text-base">{formatCurrency(item.price)}</div>
        </div>
      </div>
      <button
        className="bg-orange-500 text-white rounded-sm font-semibold text-base hover:bg-orange-600 transition w-[139.44px] h-[42px]"
        disabled
      >
        Đã xác nhận
      </button>
    </div>
  )
}

export default OrderItem
