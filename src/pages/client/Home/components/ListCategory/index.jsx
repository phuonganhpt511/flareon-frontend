import http from '@/apis/http'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ListCategory = () => {
  //   const categories = [
  //     { id: 1, name: 'Gà rán' },
  //     { id: 2, name: 'Mì cay' },
  //     { id: 3, name: 'Lẩu' },
  //     { id: 4, name: 'Đồ ăn nhanh' },
  //     { id: 5, name: 'Nước uống' },
  //   ]

  const {
    data: Categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await http.get('/category')
      return res.data || []
    },
  })

  console.log(Categories)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className=" min-h-[300px] bg-white rounded-xl overflow-hidden shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-center my-1.5">Danh mục</h2>
      <ul className="space-y-2 px-2 my-5">
        {Categories.map((cat) => (
          <li key={cat._id} className="flex items-center space-x-2">
            <input
              id={`cat-${cat._id}`}
              name="category" // 👈 tất cả radio dùng chung 1 name => chỉ chọn được 1
              type="radio"
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <label
              htmlFor={`cat-${cat._id}`}
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              {cat.category_name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListCategory
