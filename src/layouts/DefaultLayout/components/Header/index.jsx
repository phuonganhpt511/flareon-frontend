import { useState } from 'react'
import { NavLink } from 'react-router'
import { FlameKindling, Menu, X } from 'lucide-react'

import AntButton from '@/components/AntButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FlameKindling className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">Flareon</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              Trang chủ
            </NavLink>
            <NavLink
              to="/features"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Tính năng
            </NavLink>
            <NavLink

              to="/category"



              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Danh mục
            </NavLink>
            <NavLink to="/dishes" className="text-gray-700 hover:text-orange-500 transition-colors">
              Món ăn
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Liên hệ
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <AntButton type="primary">Đăng nhập</AntButton>
            <AntButton>Đăng ký</AntButton>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <NavLink to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
                Trang chủ
              </NavLink>
              <NavLink
                to="/features"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Tính năng
              </NavLink>
              <NavLink

                to="/category"



                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Danh mục
              </NavLink>
              <NavLink
                to="/contact"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Liên hệ
              </NavLink>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <AntButton type="primary">Đăng nhập</AntButton>
                <AntButton>Đăng ký</AntButton>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
