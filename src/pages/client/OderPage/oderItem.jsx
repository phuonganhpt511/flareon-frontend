import React, { useState } from 'react'

const initialOrders = [
    {
        id: 1,
        name: 'Product name dài quá ',
        description: 'Description',
        price: '20.000đ',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
    },
    {
        id: 2,
        name: 'Product name',
        description: 'Description',
        price: '20.000đ',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
    },
    {
        id: 3,
        name: 'Product name',
        description: 'Description',
        price: '20.000đ',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
    },
    {
        id: 4,
        name: 'Product name',
        description: 'Description',
        price: '20.000đ',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
    },
    {
        id: 5,
        name: 'Product name',
        description: 'Description',
        price: '20.000đ',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
    },
]

const OderItem = () => {
    const [orders] = useState(initialOrders);

    return (
        <div className="w-[672px] flex-1 px-0 py-0">
            {orders.map(item => (
                <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl mb-4"
                    style={{
                        height: 123,
                        padding: '16px'
                       
                    }}
                >
                    <div className="flex items-center min-w-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-[100px] h-[100px] rounded-sm object-cover mr-4"
                        />
                        <div className="min-w-0 mb-[40px]">
                            <div className="font-semibold text-base truncate w-[148px]">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate w-[148px]">{item.description}</div>
                            <div className="text-orange-600 font-bold text-base">{item.price}</div>
                        </div>
                    </div>
                    <button
                        className="bg-orange-500 text-white rounded-sm mt-[60px] font-semibold text-base hover:bg-orange-600 transition w-[139.44px] h-[42px]"
                        disabled
                    >
                        Đang nấu 
                    </button>
                </div>
            ))}
        </div>

    )
}

export default OderItem