import React from 'react'
import CartItem from './CartItem'

const CartPage = () => {
  return (
    <div
      className=" flex flex-col items-center min-h-screen"
      style={{ width: 744, minHeight: 1177, margin: '0 auto' }}
    >
      {/* Cart Header */}
      <div className="w-[672px] mx-auto pt-6 pb-2">
        <span className="text-orange-500 text-xl font-semibold">&lt; Giỏ hàng</span>
      </div>
      {/* Cart List */}
      <CartItem />

      {/* Total & Confirm */}
      <div className="w-[672px] px-4 py-3 mt-auto">
        <hr className="border-t border-gray-300 mx-5 py-3" />
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-orange-500 text-lg">Tổng tiền</span>
          <span className="font-semibold text-orange-600 text-lg">100.000 đ</span>
        </div>
        <div className="flex justify-center">
          <button className="w-[340px] h-[48px] bg-orange-500 text-white rounded-lg font-semibold text-lg flex items-center justify-center hover:bg-orange-600 transition mt-2">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
