// src/layouts/DefaultLayout/components/Header/index.jsx
import React, { use, useState, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FlameKindling, Menu, X, Clock, ShoppingCart } from 'lucide-react'
import { Modal, List, Button, Badge, Avatar } from 'antd'
import AntButton from '@/components/AntButton'
import { useQuery } from '@tanstack/react-query' // <<<--- DÒNG IMPORT BỊ THIẾU
import http from '@/apis/http'
import { UserOutlined } from '@ant-design/icons'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  // --- LẤY ID VÀ DỮ LIỆU GIỎ HÀNG ---
  const mongoTableId = localStorage.getItem('currentTableId')
  const userString = localStorage.getItem('user')
  const userData = useMemo(() => (userString ? JSON.parse(userString) : null), [userString])
  const userId = userData?._id

  const { data: cartData } = useQuery({
    // <-- Dùng useQuery
    queryKey: ['cart', mongoTableId, userId],
    queryFn: async () => {
      if (!mongoTableId || !userId) return null
      try {
        const res = await http.get(`/cart/cart-item/${mongoTableId}/${userId}`)
        console.log('Header: API GET /cart trả về:', res)
        return res?.data
      } catch (error) {
        console.error('Header: Lỗi lấy giỏ hàng:', error)
        return null
      }
    },
    enabled: !!mongoTableId && !!userId,
    staleTime: 1000 * 30,
  })

  // Tính tổng số lượng
  const totalItemCount = useMemo(() => {
    if (!cartData || !cartData.items) return 0
    return cartData.items.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartData])

  // Hàm Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('currentTableId')
    localStorage.removeItem('currentQrCode')
    window.location.href = '/login'
  }

  // Dữ liệu demo đơn hàng (GIỮ NGUYÊN)
  const orders = [
    {
      id: 1,
      table: 'Bàn 01',
      items: [
        /* ... */
      ],
    },
    {
      id: 2,
      table: 'Bàn 03',
      items: [
        /* ... */
      ],
    },
  ]

  const openOrderDetail = (order) => {
    // ... (Hàm openOrderDetail của bạn giữ nguyên)
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
          {/* LOGO (GIỮ NGUYÊN) */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FlameKindling className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900 font-semibold">Flareon</span>
          </div>

          {/* MENU DESKTOP (GIỮ NGUYÊN) */}
          <div className="hidden md:flex items-center gap-8">
            {/* ... (Các NavLink của bạn) ... */}
            <NavLink to="/">Trang chủ</NavLink>
            <NavLink to="/category">Danh mục</NavLink>
            <NavLink to="/contact">Liên hệ</NavLink>
          </div>

          {/* NÚT CHỨC NĂNG BÊN PHẢI (ĐÃ SỬA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* NÚT GIỎ HÀNG */}
            <Button
              type="text"
              className="!flex !items-center !justify-center"
              onClick={() => navigate('/cart')}
              aria-label="Giỏ hàng"
            >
              <Badge count={totalItemCount} size="small" offset={[0, 2]}>
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-orange-500" />
              </Badge>
            </Button>

            {/* Nút xem lịch sử đơn hàng (GIỮ NGUYÊN) */}
            <Button type="default" icon={<Clock />} onClick={() => setIsModalOpen(true)}>
              Lịch sử đơn hàng
            </Button>

            {/* LOGIC ĐĂNG NHẬP/ĐĂNG XUẤT */}
            {userData ? (
              <div className="flex items-center gap-2">
                <Avatar>{userData.username?.charAt(0).toUpperCase() || <UserOutlined />}</Avatar>
                <Button onClick={handleLogout} type="text" danger>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <AntButton onClick={() => navigate('/login')} type="primary">
                  Đăng nhập
                </AntButton>
                <AntButton onClick={() => navigate('/register')}>Đăng ký</AntButton>
              </>
            )}
          </div>

          {/* NÚT MENU MOBILE (GIỮ NGUYÊN) */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU MOBILE (ĐÃ SỬA) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {/* ... (Các NavLink) ... */}

              {/* GIỎ HÀNG (MOBILE) */}
              <Button
                type="default"
                icon={
                  <Badge count={totalItemCount}>
                    <ShoppingCart />
                  </Badge>
                }
                onClick={() => {
                  navigate('/cart')
                  setIsMenuOpen(false)
                }}
              >
                Giỏ hàng ({totalItemCount})
              </Button>

              {/* Lịch sử đơn hàng (Mobile) */}
              <Button
                type="default"
                icon={<Clock />}
                onClick={() => {
                  setIsModalOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                Lịch sử đơn hàng
              </Button>

              {/* ĐĂNG NHẬP/ĐĂNG XUẤT (MOBILE) */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                {userData ? (
                  <AntButton onClick={handleLogout}>Đăng xuất</AntButton>
                ) : (
                  <>
                    <AntButton
                      onClick={() => {
                        navigate('/login')
                        setIsMenuOpen(false)
                      }}
                      type="primary"
                    >
                      Đăng nhập
                    </AntButton>
                    <AntButton
                      onClick={() => {
                        navigate('/register')
                        setIsMenuOpen(false)
                      }}
                    >
                      Đăng ký
                    </AntButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MODAL LỊCH SỬ ĐƠN HÀNG  */}
      <Modal
        title="🧾 Lịch sử đơn hàng theo bàn"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(order) => {
            const total = order.items.reduce((sum, it) => sum + it.qty * it.price, 0)
            const formatVnd = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
            return (
              <List.Item
                key={order.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => openOrderDetail(order)}
              >
                <List.Item.Meta
                  title={<span className="font-semibold">{order.table}</span>}
                  description={
                    <>
                      <ul className="list-disc pl-5">
                        {order.items.map((it, idx) => (
                          <li key={idx}>
                            {it.name} x{it.qty} — {formatVnd(it.qty * it.price)}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 font-medium">Tổng tiền: {formatVnd(total)}</p>
                    </>
                  }
                />
              </List.Item>
            )
          }}
        />
      </Modal>
    </header>
  )
}

export default Header
