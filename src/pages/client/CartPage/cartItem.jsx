import React, { useState } from 'react'

const initialCart = [
    {
        id: 1,
        name: 'productName dài quá sẽ bị cắt bớt',
        description: 'description dài quá sẽ bị cắt bớt',
        price: '20.000đ',
        quantity: 1,
        image: '/images/Logo.svg',
    },
    {
        id: 2,
        name: 'productName 2',
        description: 'description',
        price: '20.000đ',
        quantity: 5,
        image: '/images/Logo.svg',
    },
    {
        id: 3,
        name: 'productName 3',
        description: 'description',
        price: '20.000đ',
        quantity: 1,
        image: '/images/Logo.svg',
    },
    {
        id: 4,
        name: 'productName 4',
        description: 'description',
        price: '20.000đ',
        quantity: 2,
        image: '/images/Logo.svg',
    },
]

const cartItem = () => {
    const [cart, setCart] = useState(initialCart);
    const handleIncrease = id => {
        setCart(cart =>
            cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = id => {
        setCart(cart =>
            cart.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = id => {
        setCart(cart => cart.filter(item => item.id !== id));
    };
    return (
        <>
            <div className="flex-1 px-4 py-2">
                {cart.map(item => (
                    <div key={item.id} className="flex items-center py-3 relative">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover mr-4"
                        />
                        <div className="flex-1">
                            <div className="font-semibold truncate w-32">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate w-32">{item.description}</div>
                            <div className="text-orange-600 font-bold">{item.price}</div>
                        </div>
                        <div className="flex items-center rounded px-2 py-3 ml-4 my-3">
                            <button
                                className="border border-orange-500 text-orange-500 rounded w-4 h-4 flex items-center justify-center mr-2 text-xs hover:bg-orange-50 transition"
                                onClick={() => handleDecrease(item.id)}
                                disabled={item.quantity <= 1}
                            >-</button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                                className="bg-orange-500 text-white rounded w-4 h-4 flex items-center justify-center ml-2 text-xs hover:bg-orange-600 transition"
                                onClick={() => handleIncrease(item.id)}
                            >+</button>
                        </div>
                        <button
                            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-xs bg-gray-200 rounded-full text-orange-500 hover:bg-orange-100 transition"
                            onClick={() => handleRemove(item.id)}
                            title="Xóa sản phẩm"
                        >×</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default cartItem