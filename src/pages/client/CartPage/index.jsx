import React from 'react'

const CartPage = () => {
    return (
        <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center py-4 px-4">
                <span className="text-orange-500 text-lg font-semibold mr-2">&lt; Giỏ hàng</span>
            </div>
            {/* Cart List */}
            <div className="flex-1 px-4 py-2">
                <div className="flex items-center py-3">
                    <img
                        src="../../../../public/images/Logo.svg"
                        alt='Product'
                        className="w-16 h-16 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">productName</div>
                        <div className="text-sm text-gray-500">description</div>
                        <div className="text-orange-600 font-bold">price</div>
                    </div>
                    <div className="flex items-center rounded px-2 py-3 ml-4 my-3">
                        <button
                            className="border border-orange-500 text-orange-500 rounded w-4 h-4 flex items-center justify-center mr-2 text-xs hover:bg-orange-50 transition"
                        >-</button>
                        <span className="px-2 text-sm">1</span>
                        <button
                            className="bg-orange-500 text-white rounded w-4 h-4 flex items-center justify-center ml-2 text-xs hover:bg-orange-600 transition"
                        >+</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-2">
                <div className="flex items-center py-3">
                    <img
                        src="../../../../public/images/Logo.svg"
                        alt='Product'
                        className="w-16 h-16 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">productName</div>
                        <div className="text-sm text-gray-500">description</div>
                        <div className="text-orange-600 font-bold">price</div>
                    </div>
                    <div className="flex items-center rounded px-2 py-3 ml-4 my-3">
                        <button
                            className="border border-orange-500 text-orange-500 rounded w-4 h-4 flex items-center justify-center mr-2 text-xs hover:bg-orange-50 transition"
                        >-</button>
                        <span className="px-2 text-sm">1</span>
                        <button
                            className="bg-orange-500 text-white rounded w-4 h-4 flex items-center justify-center ml-2 text-xs hover:bg-orange-600 transition"
                        >+</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-2">
                <div className="flex items-center py-3">
                    <img
                        src="../../../../public/images/Logo.svg"
                        alt='Product'
                        className="w-16 h-16 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">productName</div>
                        <div className="text-sm text-gray-500">description</div>
                        <div className="text-orange-600 font-bold">price</div>
                    </div>
                    <div className="flex items-center rounded px-2 py-3 ml-4 my-3">
                        <button
                            className="border border-orange-500 text-orange-500 rounded w-4 h-4 flex items-center justify-center mr-2 text-xs hover:bg-orange-50 transition"
                        >-</button>
                        <span className="px-2 text-sm">1</span>
                        <button
                            className="bg-orange-500 text-white rounded w-4 h-4 flex items-center justify-center ml-2 text-xs hover:bg-orange-600 transition"
                        >+</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-2">
                <div className="flex items-center py-3">
                    <img
                        src="../../../../public/images/Logo.svg"
                        alt='Product'
                        className="w-16 h-16 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">productName</div>
                        <div className="text-sm text-gray-500">description</div>
                        <div className="text-orange-600 font-bold">price</div>
                    </div>
                    <div className="flex items-center rounded px-2 py-3 ml-4 my-3">
                        <button
                            className="border border-orange-500 text-orange-500 rounded w-4 h-4 flex items-center justify-center mr-2 text-xs hover:bg-orange-50 transition"
                        >-</button>
                        <span className="px-2 text-sm">1</span>
                        <button
                            className="bg-orange-500 text-white rounded w-4 h-4 flex items-center justify-center ml-2 text-xs hover:bg-orange-600 transition"
                        >+</button>
                    </div>
                </div>
            </div>
           
            <hr className="border-t border-gray-200 mx-4" />
            
            {/* Total & Confirm */}
            <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-orange-500 text-lg">Tổng tiền</span>
                    <span className="font-semibold text-orange-600 text-lg">999đ</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded font-bold text-lg">
                    Xác nhận
                </button>
            </div>
            {/* Footer */}
            <div className="bg-gray-900 text-gray-300 px-4 py-3 text-xs">
                <div>Body text for a post. Since it's a social app</div>
                <div className="opacity-70 mt-2">
                    Body text for a post. Since it's a social app, sometimes it's a hot take, and sometimes it's a question.
                </div>
                <div className="mt-2 opacity-50">
                    Body text for a post.<br />
                    Body text for a post.<br />
                    Body text for a post.<br />
                    Body text for a post.
                </div>
            </div>
        </div>
    )
}

export default CartPage