import React from 'react'
import { Modal, Descriptions, Tag, Table, Typography, Button, Divider } from 'antd'
// Import useEffect không cần thiết vì ta không dùng form hook

const { Title } = Typography

// --- 1. ĐỊNH NGHĨA CỘT CHO BẢNG MÓN ĂN ---
const itemColumns = [
  {
    title: 'Món ăn',
    dataIndex: 'dish_name',
    key: 'dish_name',
    render: (text) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Trạng thái món',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const colorMap = {
        Prepared: 'green',
        InProgress: 'blue',
        Pending: 'gold',
      };
      return <Tag color={colorMap[status] || 'default'}>{status || 'Chờ làm'}</Tag>;
    },
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `${(price ?? 0).toLocaleString('vi-VN')} đ`,
  },
];

const OrderModalDetail = ({ open, order, onCancel }) => {
  // Tránh lỗi nếu order là null
  if (!order) return null;

  // --- LẤY DỮ LIỆU CẦN THIẾT ---
  // Giả định order.items là mảng chi tiết các món ăn
  const orderItems = order.items || [];

  // Tính tổng tiền
  const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Định nghĩa màu cho trạng thái tổng của đơn hàng
  const orderStatusColorMap = {
    Pending: 'gold',
    Processing: 'blue',
    Shipped: 'purple',
    Completed: 'green',
    Cancelled: 'red',
  };

  return (
    <Modal
      title={<Title level={4} className="!mb-0">Chi tiết đơn hàng #{order._id?.slice(-6)}</Title>}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Đóng
        </Button>
      ]}
      width={750} // Tăng chiều rộng để hiển thị bảng tốt hơn
    >
      {/* --- 2. PHẦN THÔNG TIN CHUNG (Dùng Descriptions thay cho Form) --- */}
      <Descriptions bordered column={2} size="small" className="mb-4">
        <Descriptions.Item label="Mã đơn hàng" span={2}>
          <span className="font-medium">{order._id}</span>
        </Descriptions.Item>

        <Descriptions.Item label="Khách hàng">
          {order.user?.username || order.user_id?.username || 'Khách lẻ'}
        </Descriptions.Item>

        <Descriptions.Item label="Bàn">
          {order.table?.table_name || order.table_id?.table_name || 'Không có'}
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          <Tag color={orderStatusColorMap[order.status] || 'default'} style={{ fontWeight: 'bold' }}>
            {order.status}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Tổng tiền">
          <span className="font-bold text-lg text-orange-500">
            {totalAmount.toLocaleString('vi-VN')} đ
          </span>
        </Descriptions.Item>

        <Descriptions.Item label="Thời gian tạo">
          {new Date(order.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật cuối">
          {new Date(order.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>

      {/* --- 3. PHẦN DANH SÁCH MÓN ĂN (Sử dụng Table) --- */}
      <Divider orientation="left" className="!mt-2 !mb-4">
        <Title level={5} className="!mb-0">Danh sách món ăn và Trạng thái phục vụ</Title>
      </Divider>

      <Table
        columns={itemColumns}
        dataSource={orderItems}
        // Giả định mỗi item có id món ăn (dish_id)
        rowKey={(record, index) => record.dish_id || index}
        pagination={false}
        size="middle"
        locale={{ emptyText: 'Đơn hàng chưa có món ăn nào.' }}
      />

    </Modal>
  )
}

export default OrderModalDetail