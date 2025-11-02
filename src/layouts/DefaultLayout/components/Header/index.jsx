import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FlameKindling, Menu, X, Clock } from 'lucide-react'
import { Modal, List, Button } from 'antd'
import AntButton from '@/components/AntButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ Thêm hàm điều hướng
  const goLogin = () => navigate("/login")
  const goRegister = () => navigate("/register")

  // Demo orders
  const orders = [
    {
      id: 1,
      table: 'Bàn 01',
      items: [
        { name: 'Cơm gà xối mắm', qty: 1, price: 45000 },
        { name: 'Trà đá', qty: 2, price: 5000 },
      ],
    },
    {
      id: 2,
      table: 'Bàn 03',
      items: [
        { name: 'Bún bò Huế', qty: 1, price: 50000 },
        { name: 'Nước suối', qty: 1, price: 8000 },
      ],
    },
    {
      id: 3,
      table: 'Bàn 05',
      items: [
        { name: 'Trà sữa truyền thống', qty: 2, price: 30000 },
      ],
    },
  ]

  const openOrderDetail = (order) => {
    const now = new Date()
    const minutesAgo = Math.floor(30 + Math.random() * 90)
    const startTime = new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString()
    const paymentTime = now.toISOString()

    setIsModalOpen(false)
    navigate(`/orders/${order.id}`, {
      state: { order, startTime, paymentTime },
    })
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FlameKindling className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900 font-semibold">Flareon</span>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className="text-gray-700 hover:text-orange-500">Trang chủ</NavLink>
            <NavLink to="/features" className="text-gray-700 hover:text-orange-500">Tính năng</NavLink>
            <NavLink to="/category" className="text-gray-700 hover:text-orange-500">Danh mục</NavLink>
            <NavLink to="/dishes" className="text-gray-700 hover:text-orange-500">Món ăn</NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-orange-500">Liên hệ</NavLink>
          </div>

          {/* NÚT ĐĂNG NHẬP / ĐĂNG KÝ */}
          <div className="hidden md:flex items-center gap-3">
            <Button type="default" icon={<Clock />} onClick={() => setIsModalOpen(true)}>
              Lịch sử đơn hàng
            </Button>

            {/* ✅ Gắn navigate */}
            <AntButton type="primary" onClick={goLogin}>Đăng nhập</AntButton>
            <AntButton onClick={goRegister}>Đăng ký</AntButton>
          </div>

          {/* MENU MOBILE */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">

              <NavLink to="/" className="text-gray-700 hover:text-orange-500">Trang chủ</NavLink>
              <NavLink to="/features" className="text-gray-700 hover:text-orange-500">Tính năng</NavLink>
              <NavLink to="/category" className="text-gray-700 hover:text-orange-500">Danh mục</NavLink>
              <NavLink to="/contact" className="text-gray-700 hover:text-orange-500">Liên hệ</NavLink>

              <Button type="default" icon={<Clock />} onClick={() => setIsModalOpen(true)}>
                Lịch sử đơn hàng
              </Button>

              {/* ✅ Gắn điều hướng ở mobile */}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <AntButton type="primary" onClick={goLogin}>Đăng nhập</AntButton>
                <AntButton onClick={goRegister}>Đăng ký</AntButton>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MODAL LỊCH SỬ ĐƠN HÀNG */}
      <Modal title="🧾 Lịch sử đơn hàng theo bàn" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(order) => {
            const total = order.items.reduce((s, it) => s + it.qty * it.price, 0)
            const formatVnd = (n) => n.toLocaleString('vi-VN') + 'đ'

            return (
              <List.Item key={order.id} onClick={() => openOrderDetail(order)}>
                <List.Item.Meta title={<b>{order.table}</b>} />
                <ul className="pl-5 list-disc">
                  {order.items.map((it, idx) => (
                    <li key={idx}>{it.name} x{it.qty} — {formatVnd(it.qty * it.price)}</li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">Tổng tiền: {formatVnd(total)}</p>
              </List.Item>
            )
          }}
        />
      </Modal>
    </header>
  )
}

export default Header
