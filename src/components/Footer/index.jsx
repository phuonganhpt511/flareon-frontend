import React from 'react';

import HomeIcon from '@/assets/home_icon.svg?react';
import FoodIcon from '@/assets/food_icon.svg?react';
import CartIcon from '@/assets/shopping_cart.svg?react';
import BellIcon from '@/assets/Bell.svg?react';
import UserIcon from '@/assets/user_icon.svg?react';

const Footer = () => {
  return (
    <>
  
      <footer className="bg-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
         
                <div>
                    <h3 className="font-bold mb-4">Về Flareon</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
                        <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
                        <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Hỗ trợ khách hàng</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                        <li><a href="#" className="hover:text-white">Chính sách đổi trả</a></li>
                        <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
                    </ul>
                </div>
    
                <div>
                    <h3 className="font-bold mb-4">Chính sách</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
                        <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
                    </ul>
                </div>
                {/* Cột 4 */}
                <div>
                    <h3 className="font-bold mb-4">Kết nối với chúng tôi</h3>
                    {/* Thêm icon mạng xã hội ở đây nếu cần */}
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
                <p>&copy; 2025 Flareon. All rights reserved.</p>
            </div>
        </div>
      </footer>

      {/* ===== THANH ĐIỀU HƯỚNG MOBILE ===== */}
 
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <a href="#" className="flex flex-col items-center justify-center text-orange-500 w-1/5">
            <HomeIcon className="w-6 h-6" />
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 w-1/5 transition-colors">
            <FoodIcon className="w-6 h-6" />
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 w-1/5 transition-colors">
            <CartIcon className="w-6 h-6" />
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 w-1/5 transition-colors">
            <BellIcon className="w-6 h-6" />
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 w-1/5 transition-colors">
            <UserIcon className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Footer;