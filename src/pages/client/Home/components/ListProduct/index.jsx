import http from '@/apis/http'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ListProduct = () => {
  const {
    data: Dishes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dishes'],
    queryFn: async () => {
      const res = await http.get('/dishes')
      return res.data || []
    },
  })

  console.log(Dishes)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Dishes.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={item.imageUrl}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between p-4">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{item.dish_name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <p className="text-lg font-bold text-red-500">
                  {item.price.toLocaleString('vi-VN')} VND
                </p>
              </div>

              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
