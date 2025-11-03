// src/pages/client/OrderPage/index.jsx
import React from 'react'
import { useParams } from 'react-router' // <-- DÙNG react-router-dom
import { useQuery } from '@tanstack/react-query'
import http from '@/apis/http' // Import http
import ListProduct from '@/pages/client/Home/components/ListProduct'

const OrderPage = () => {
  // 1. SỬA LẠI: Phải có :tableId trong AppRoutes.jsx
  const { tableId: qrCode } = useParams()

  const { data: allTables = [], isLoading: isLoadingTables } = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
      // 'res' bây giờ là object { success: true, data: [...] }
      const res = await http.get('/tables')

      console.log('API GET /tables trả về (toàn bộ object):', res)

      // Kiểm tra xem res.data có phải là mảng không
      if (res && Array.isArray(res.data)) {
        return res.data // Trả về mảng data bên trong
      }
      return [] // Luôn trả về một mảng
    },
  })

  // TỰ LỌC (Code này giờ sẽ chạy đúng)
  const foundTable = allTables.find(
    (table) => (table.qr_code || '').trim().toLowerCase() === (qrCode || '').trim().toLowerCase()
  )

  const mongoTableId = foundTable?._id

  // ----- Hiển thị -----
  if (isLoadingTables) return <p>Đang tải danh sách bàn...</p>

  if (!isLoadingTables && !mongoTableId) {
    return <p>Lỗi: Không tìm thấy bàn nào có mã {qrCode} trong danh sách bàn.</p>
  }

  // Nếu tìm thấy, render ListProduct
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Thực đơn (Bàn: {qrCode})</h1>

      {/* Truyền _id (chuỗi dài) đã tìm được xuống ListProduct */}
      <ListProduct mongoTableId={mongoTableId} />
    </div>
  )
}

export default OrderPage
