import React from 'react'
import CartItem from './cartItem';

const CartPage = () => {
    return (
        <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center py-4 px-4">
                <span className="text-orange-500 text-lg font-semibold mr-2">&lt; Giỏ hàng</span>
            </div>
            {/* Cart List */}
            <CartItem />
            <hr className="border-t border-gray-200 mx-4" />
            {/* Total & Confirm */}
            <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-orange-500 text-lg">Tổng tiền</span>
                    <span className="font-semibold text-orange-600 text-lg">100.000 đ</span>
                </div>
                <div className="flex justify-center">
                    <button className="w-52 bg-orange-500 text-white py-2 rounded font-bold text-lg flex items-center justify-center hover:bg-orange-600 transition">
                        Xác nhận
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CartPage;