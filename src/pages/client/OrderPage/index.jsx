import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import OrderCard from '@/components/OrderCard'
import orderAPI from '@/apis/order/order.api'
import { useAuth } from '@/contexts/AuthContext'
import { Tag } from 'antd'

const OrdersPage = () => {
  const navigate = useNavigate();
  // Lấy trạng thái đăng nhập từ AuthContext (Vẫn giữ để hiển thị tên nếu cần)
  const { isLoggedIn } = useAuth();

  // 1. LẤY TABLE ID TỪ LOCAL STORAGE
  const tableId = localStorage.getItem('currentTableId');

  // 2. LẤY DỮ LIỆU USER ĐỂ HIỂN THỊ TÊN 
  const rawUserData = localStorage.getItem('userData');
  const user = rawUserData ? JSON.parse(rawUserData) : {};
  const displayUserName = user.username || user.email || 'Khách hàng';

  // 3. XÁC ĐỊNH PHƯƠNG THỨC GỌI API (CHỈ CÒN LỌC THEO BÀN)
  let queryFn;
  let queryKey;

  if (tableId) {
    // ✅ Ưu tiên 1: LỌC THEO BÀN (Luôn chạy nếu có tableId)
    queryFn = () => orderAPI.getOrdersByTableId(tableId);
    queryKey = ['tableOrders', tableId];
  } else {
    // Trường hợp KHÔNG có Table ID, KHÔNG làm gì cả
    queryFn = async () => ({ data: [] });
    queryKey = ['noOrders'];
  }

  // 4. GỌI API BẰNG useQuery
  const {
    data: orders,
    isLoading,
    isError
  } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    // ✅ SỬA ĐỔI: Chỉ fetch khi tableId TỒN TẠI
    enabled: !!tableId,
    // Tối ưu hóa tốc độ tải
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-xl text-orange-500">Đang tải danh sách đơn hàng...</div>;
  }

  if (isError) {
    // Thông báo lỗi nếu API thất bại (thường do Token hết hạn hoặc Server lỗi)
    return <div className="text-center mt-10 text-red-600">Đã xảy ra lỗi khi lấy dữ liệu đơn hàng. Vui lòng kiểm tra lại.</div>;
  }

  const orderList = orders?.data || [];

  if (orderList.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Bạn chưa có đơn hàng nào. Hãy đặt món ngay!
      </div>
    );
  }

  return (
    <div
      className="bg-white flex flex-col items-center"
      style={{ width: 744, minHeight: 1177, margin: '0 auto' }}
    >
      {/* Header */}
      <div className="w-[672px] mx-auto pt-6 pb-4 border-b border-gray-200">
        <span
          className="text-orange-500 text-xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          &lt; Danh sách Đơn hàng ({orderList.length})
        </span>

        {/* HIỂN THỊ THÔNG TIN BÀN HOẶC NGƯỜI DÙNG */}
        {tableId ? ( // ✅ Chỉ hiển thị thông tin BÀN nếu có tableId
          <div className="text-base font-bold text-gray-700 mt-1">Đơn hàng tại Bàn số: <span className="text-orange-600">{tableId}</span></div>
        ) : isLoggedIn && ( // Hiển thị thông tin User chỉ khi không có tableId và đã đăng nhập (Giữ lại để cung cấp thông tin)
          <div className="text-base font-bold text-gray-700 mt-1">Đơn hàng của tài khoản: <span className="text-orange-600">{displayUserName}</span></div>
        )}
      </div>

      {/* Order List */}
      <div className="w-[672px] flex flex-col mt-6">
        {orderList.map((order) => (
          <OrderCard
            key={order._id || order.id}
            order={{
              id: order._id || order.id,
              date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A',
              total: order.totalAmount || 0,
              status: order.status,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersPage;