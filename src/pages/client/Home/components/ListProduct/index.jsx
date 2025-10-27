// src/pages/client/Home/components/ListProduct/index.jsx
import http from '@/apis/http'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

// 1. NHẬN 'mongoTableId' (chuỗi dài) từ props
const ListProduct = ({ mongoTableId }) => {
  const {
    data: Dishes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dishes'],
    queryFn: async () => {
      // 2. SỬA LỖI LẤY MÓN ĂN:
      const res = await http.get('/dishes')
      console.log('API GET /dishes trả về:', res)
      // Giả sử /dishes cũng trả về { success: true, data: [...] }
      if (res && Array.isArray(res.data)) {
        return res.data
      }
      return []
    },
  })

  // 3. XÓA 'useParams' ở đây
  // const { tableId } = useParams() // <-- XÓA

  const handleAddToCart = async (dish) => {
    console.log('ĐÃ CLICK!', dish)

    // 4. KIỂM TRA 'mongoTableId' (chuỗi dài)
    if (!mongoTableId) {
      console.error('LỖI: không nhận được mongoTableId từ OrderPage!')
      return
    }

    // === LẤY USER_ID (Code này ĐÚNG) ===
    let userId = null
    try {
      const userString = localStorage.getItem('user')
      if (!userString) {
        alert('Lỗi: Không tìm thấy thông tin người dùng. Bạn đã đăng nhập chưa?')
        return
      }
      const userData = JSON.parse(userString)
      userId = userData._id
      if (!userId) {
        alert('Lỗi: ID người dùng không hợp lệ.')
        return
      }
    } catch (e) {
      alert('Có lỗi khi lấy thông tin user.')
      return
    }
    // ======================================

    // === TẠO PAYLOAD (SỬA LỖI 500) ===
    const payload = {
      table_id: mongoTableId, // <-- 5. Gửi _ID (chuỗi dài)
      dish_id: dish._id,
      quantity: 1,
      user_id: userId,
    }
    // ====================================

    console.log('Chuẩn bị gọi API:', payload)
    try {
      const response = await http.post('/cart/add-item', payload)
      console.log('API THÀNH CÔNG:', response)
      alert(`Đã thêm "${dish.dish_name}" vào giỏ hàng!`)
    } catch (err) {
      console.error('LỖI API:', err)
      alert('Có lỗi xảy ra, không thể thêm vào giỏ.')
    }
  }

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
            {/* ... (Phần JSX hiển thị ảnh, tên, giá... đã ĐÚNG) ... */}
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

              <button
                onClick={() => handleAddToCart(item)} // <-- 6. Nút này gọi hàm
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Thêm vào giỏooo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
