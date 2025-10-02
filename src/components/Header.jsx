import React from "react";
import { ShoppingCart, Bell, Menu } from "lucide-react"; // icon lib: lucide-react

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
         <img src="/images/logo.png" alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" 
/>

        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Nút chức năng */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-orange-500">
            <Bell size={22} />
          </button>
          <button className="text-gray-600 hover:text-orange-500">
            <ShoppingCart size={22} />
          </button>
          <button className="text-gray-600 hover:text-orange-500">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
