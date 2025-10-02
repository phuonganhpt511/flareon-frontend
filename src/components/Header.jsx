import React from 'react';
import { ShoppingCartOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <header className="flex items-center w-full px-4 py-3 bg-white shadow min-h-[72px]">
      {/* Logo */}
      <div className="flex-shrink-0 mr-4">
        <img src="/images/Logo.svg" alt="Flareon" className="h-12 w-auto" />
      </div>
      {/* Search bar */}
      <div className="flex items-center flex-1 bg-gray-100 rounded px-3 py-2 mx-4 min-w-0">
        <SearchOutlined style={{ fontSize: 24, color: '#FF6F00' }} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none px-3 flex-1 text-base min-w-0"
        />
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6 flex-shrink-0 ml-4">
        <BellOutlined style={{ fontSize: 28, color: '#FF6F00' }} />
        <ShoppingCartOutlined style={{ fontSize: 28, color: '#FF6F00' }} />
      </div>
    </header>
  );
};

export default Header;
