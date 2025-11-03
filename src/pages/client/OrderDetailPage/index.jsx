import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Tag } from 'antd'

// 👈 IMPORT COMPONENT HIỂN THỊ MÓN ĂN
import OrderItem from '@/pages/client/OrderPage/OrderItem'
import orderAPI from '@/apis/order/order.api'

const formatCurrency = (amount) => {
    return (amount || 0).toLocaleString('vi-VN') + 'đ';
}

const OrderDetailPage = () => {
    const { id: orderId } = useParams()
    const navigate = useNavigate()

    // 1. GỌI API LẤY CHI TIẾT ĐƠN HÀNG (địa chỉ, tổng tiền, trạng thái)
    const { data: orderDetails, isLoading: isLoadingDetails } = useQuery({
        queryKey: ['orderDetail', orderId],
        queryFn: () => orderAPI.getOrderDetail(orderId),
        enabled: !!orderId,
    });

    // 2. 💥 GỌI API LẤY CÁC MÓN ĂN (ORDER ITEMS) THUỘC ĐƠN HÀNG NÀY 💥
    const { data: orderItems, isLoading: isLoadingItems } = useQuery({
        queryKey: ['orderItems', orderId],
        queryFn: () => orderAPI.getOrderItemsByOrderId(orderId),
        enabled: !!orderId,
    });

    if (isLoadingItems || isLoadingDetails) {
        return <div className="text-center mt-10 text-xl text-orange-500">Đang tải chi tiết đơn hàng...</div>;
    }

    const order = orderDetails?.data || {};
    const itemsList = orderItems?.data || []; // Danh sách các món ăn

    return (
        <div className="bg-white flex flex-col items-center" style={{ width: 744, minHeight: 1177, margin: '0 auto' }}>

            {/* Header */}
            <div className="w-[672px] mx-auto pt-6 pb-4 border-b border-gray-200">
                <span
                    className="text-orange-500 text-xl font-semibold cursor-pointer"
                    onClick={() => navigate('/orders')}
                >
                    &lt; Chi tiết đơn hàng {orderId}
                </span>
                <div className="mt-2 text-lg font-bold">
                    Trạng thái hiện tại: <span className="text-blue-600">{order.status || 'Đang chờ'}</span>
                </div>
                <p className="text-sm text-gray-600">Tổng cộng: {formatCurrency(order.totalAmount)}</p>
            </div>

            {/* Danh sách món ăn trong Đơn hàng */}
            <div className="w-[672px] flex-1 px-0 py-4">
                <h3 className="text-xl font-semibold mb-4">Các món đã đặt ({itemsList.length}):</h3>

                {/* 💥 LẶP QUA DANH SÁCH MÓN ĂN VÀ RENDER TỪNG ORDERITEM 💥 */}
                {itemsList.map((item) => (
                    <OrderItem
                        key={item._id || item.id}
                        item={{
                            id: item._id || item.id,
                            name: item.dish?.name || 'Món ăn',
                            description: item.note || 'Không có ghi chú',
                            price: item.price, // Giá trị số, component OrderItem sẽ tự định dạng
                            image: item.dish?.image,
                            quantity: item.quantity
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderDetailPage;
