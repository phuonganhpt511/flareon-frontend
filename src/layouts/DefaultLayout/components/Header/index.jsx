// src/layouts/DefaultLayout/components/Header/index.jsx

import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dropdown, Menu as AntMenu } from 'antd'
import { FlameKindling, Menu, X, LogOut, User, Receipt } from 'lucide-react'
//                                                        ^^^^^ Truck đã được thêm

import AntButton from '@/components/AntButton'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  // Dữ liệu demo đơn hàng theo bàn (mỗi món có qty và price)
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
    // Tạo thời gian demo: start trước 30-120 phút, payment = now
    const now = new Date()
    const minutesAgo = Math.floor(30 + Math.random() * 90)
    const startTime = new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString()
    const paymentTime = now.toISOString()

    setIsModalOpen(false)
    navigate(`/orders/${order.id}`, {
      state: { order, startTime, paymentTime },
    })
  }

  // Lấy trạng thái và hàm từ Context
  const { isLoggedIn, logout } = useAuth();

  // LẤY THÔNG TIN USER (Đọc từ Local Storage đã được lưu trong hàm login)
  // Đảm bảo Local Storage có key 'userData' và nó là JSON string
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userName = userData.username || 'Tài khoản';

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    nav("/");
  }

  // 💥 CẤU TRÚC MENU DROPDOWN (Ant Design items) 💥
  const userMenuItems = [
    {
      key: 'profile',
      label: (<NavLink to="/profile">Hồ sơ của tôi</NavLink>),
      icon: <User size={16} />,
    },
    {
      key: 'orders',
      // Đường dẫn đến trang danh sách đơn hàng
      label: (<NavLink to="/orders">Đơn hàng của tôi</NavLink>),
      icon: <Receipt size={16} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout} className="text-red-600 font-semibold">
          Đăng xuất
        </span>
      ),
      icon: <LogOut size={16} className="text-red-600" />,
    },
  ];

  // 💥 COMPONENT DROPDOWN DÀNH CHO DESKTOP (KHI ĐÃ ĐĂNG NHẬP) 💥
  const UserDropdown = () => (
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      arrow
      trigger={['click']}
    >
      <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
        <User className="w-6 h-6 text-orange-500" />
        {/* Chỉ hiển thị tên user trên màn hình lớn */}
        <span className="hidden lg:inline text-gray-700 font-semibold">{userName}</span>
      </div>
    </Dropdown>
  );

  // Component phụ trách render các nút Đăng nhập/Đăng ký/Đăng xuất
  const AuthButtons = ({ isMobile = false }) => {
    if (isLoggedIn) {
      if (isMobile) {
        // Trên Mobile, hiển thị nút Đăng xuất đầy đủ
        return (
          <AntButton
            type="primary"
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
          >
            Đăng xuất ({userName})
          </AntButton>
        );
      }
      // Trên Desktop, hiển thị Dropdown Icon
      return <UserDropdown />;
    }

    // Nếu chưa đăng nhập: Hiển thị Đăng nhập/Đăng ký
    return (
      <>
        <AntButton onClick={() => nav("/login")} type="primary">Đăng nhập</AntButton>
        <AntButton onClick={() => nav("/register")}>Đăng ký</AntButton>
      </>
    );
  };


  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FlameKindling className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900 font-semibold">Flareon</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className="text-gray-700 hover:text-orange-500 transition-colors">Trang chủ</NavLink>
            <NavLink to="/features" className="text-gray-700 hover:text-orange-500 transition-colors">Tính năng</NavLink>
            <NavLink to="/category" className="text-gray-700 hover:text-orange-500 transition-colors">Danh mục</NavLink>
            <NavLink to="/dishes" className="text-gray-700 hover:text-orange-500 transition-colors">Món ăn</NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">Liên hệ</NavLink>
          </div>

          {/* 💥 VÙNG NÚT DESKTOP: Hiển thị Dropdown Icon (khi đã đăng nhập) 💥 */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons />
          </div>

          {/* Toggle Menu Mobile */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {/* Menu items mobile */}
              <NavLink to="/" className="text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Trang chủ</NavLink>
              <NavLink to="/features" className="text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Tính năng</NavLink>
              <NavLink to="/categories" className="text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Danh mục</NavLink>
              <NavLink to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Liên hệ</NavLink>

              {/* 💥 VÙNG NÚT MOBILE: Hiển thị nút đầy đủ 💥 */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <AuthButtons isMobile={true} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MODAL HIỂN THỊ LỊCH SỬ ĐƠN HÀNG */}
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
            const formatVnd = (n) =>
              n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'

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