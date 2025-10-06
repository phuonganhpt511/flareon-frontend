import React, { useState } from 'react'

const initialCart = [
  {
    id: 1,
    name: 'productName dài quá sẽ bị cắt bớt',
    description: 'description dài quá sẽ bị cắt bớt',
    price: '20.000đ',
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 2,
    name: 'productName 2',
    description: 'description',
    price: '20.000đ',
    quantity: 5,
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 3,
    name: 'productName 3',
    description: 'description',
    price: '20.000đ',
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 4,
    name: 'productName 4',
    description: 'description',
    price: '20.000đ',
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 5,
    name: 'productName 5',
    description: 'description',
    price: '20.000đ',
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80',
  },
]

const CartItem = () => {
  const [cart, setCart] = useState(initialCart)

  const handleIncrease = (id) => {
    setCart((cart) =>
      cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const handleDecrease = (id) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  return (
    <div className="w-[672px] mx-auto">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl mb-4"
          style={{
            height: 123,
            padding: '16px',
          }}
        >
          <div className="flex items-center min-w-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-[100px] h-[100px] rounded-lg object-cover mr-4"
            />
            <div className="min-w-0 mb-[40px]">
              <div className="font-semibold text-base truncate w-[200px]">{item.name}</div>
              <div className="text-sm text-gray-500 truncate w-[200px]">{item.description}</div>
              <div className="text-orange-600 font-bold text-base">{item.price}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 mt-[60px]">
            <div className="flex items-center">
              <button
                className="border border-orange-500 text-orange-500 rounded w-6 h-6 flex items-center justify-center mr-2 text-base hover:bg-orange-50 transition"
                onClick={() => handleDecrease(item.id)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-2 text-base">{item.quantity}</span>
              <button
                className="bg-orange-500 text-white rounded w-6 h-6 flex items-center justify-center ml-2 text-base hover:bg-orange-600 transition"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItem
