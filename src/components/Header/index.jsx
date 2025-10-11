// src/layouts/DefaultLayout/components/Header/index.jsx

// src/components/Header/index.jsx

import React from 'react';


import logoUrl from '@/assets/logo.svg'; 


import BellIcon from '@/assets/Bell.svg?react';
import SearchIcon from '@/assets/search_icon.svg?react';
import CartIcon from '@/assets/shopping_cart.svg?react';
import MenuIcon from '@/assets/solid_bar.svg?react';
import FoodIcon from '@/assets/food_icon.svg?react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   
        <div className="hidden md:flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" title="Flareon Home">
              <img className="h-12 w-auto" src={logoUrl} alt="Flareon Logo" />
            </a>
          </div>

          <div className="hidden md:flex flex-grow justify-center px-4">
            <div className="relative w-full max-w-3xl"> 
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-orange-500" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="block w-full rounded-lg border-0 bg-gray-100 py-2.5 pl-10 pr-4 text-gray-900 placeholder:text-orange-500 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
              <button className="rounded-full p-2 text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                <FoodIcon className="h-6 w-6" />
              </button>
              <button className="rounded-full p-2 text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="rounded-full p-2 text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                <CartIcon className="h-6 w-6" />
              </button>
            </div>

            <button className="rounded-full p-2 text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Thanh tìm kiếm cho Mobile */}
        <div className="md:hidden py-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-orange-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full rounded-lg border-0 bg-gray-100 py-2 pl-10 pr-4 text-gray-900 placeholder:text-orange-500 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;