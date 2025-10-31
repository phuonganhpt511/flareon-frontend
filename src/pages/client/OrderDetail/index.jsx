import { Link, useLocation, useParams } from 'react-router-dom'
import { Card, Table, Typography, Button } from 'antd'

const { Title, Text } = Typography

const formatVnd = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
const formatDate = (iso) => (iso ? new Date(iso).toLocaleString('vi-VN') : '-')

export default function OrderDetail() {
  const { id } = useParams()
  const location = useLocation()
  const state = location.state || {}
  const order = state.order

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <Title level={4}>Không tìm thấy đơn hàng #{id}</Title>
          <Link to="/"><Button type="default">Quay về</Button></Link>
        </Card>
      </div>
    )
  }

  const dataSource = order.items.map((it, idx) => ({
    key: idx,
    name: it.name,
    qty: it.qty,
    price: it.price,
    subtotal: it.qty * it.price,
  }))

  const total = dataSource.reduce((s, r) => s + r.subtotal, 0)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Title level={4}>Chi tiết đơn hàng - {order.table}</Title>
          <Link to="/"><Button>Quay lại</Button></Link>
        </div>

        <div className="mb-4">
          <Text strong>Thời gian bắt đầu: </Text>
          <Text>{formatDate(state.startTime)}</Text>
        </div>
        <div className="mb-4">
          <Text strong>Thời gian thanh toán: </Text>
          <Text>{formatDate(state.paymentTime)}</Text>
        </div>

        <Table
          pagination={false}
          dataSource={dataSource}
          columns={[
            { title: 'Món', dataIndex: 'name', key: 'name' },
            { title: 'Số lượng', dataIndex: 'qty', key: 'qty', width: 100 },
            {
              title: 'Đơn giá',
              dataIndex: 'price',
              key: 'price',
              render: (v) => formatVnd(v),
              width: 140,
            },
            {
              title: 'Thành tiền',
              dataIndex: 'subtotal',
              key: 'subtotal',
              render: (v) => formatVnd(v),
              width: 160,
            },
          ]}
        />

        <div className="text-right mt-4">
          <Title level={5}>Tổng: {formatVnd(total)}</Title>
        </div>
      </Card>
    </div>
  )
}