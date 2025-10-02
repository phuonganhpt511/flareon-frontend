import React from 'react';
import { ShoppingCartOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <div className="flex items-center gap-2">
        <MenuOutlined style={{ fontSize: 24 }} />
        <span className="font-bold text-xl text-orange-600">Flareon</span>
      </div>
      <div className="flex items-center gap-4">
        <BellOutlined style={{ fontSize: 24 }} />
        <ShoppingCartOutlined style={{ fontSize: 24 }} />
      </div>
    </header>
  );
};

export default Header;
