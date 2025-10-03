import { Search, Bell, ShoppingCart, Menu, ListOrdered } from "lucide-react"

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Shop Logo"
            className="h-9 w-auto object-contain"
          />
        </div>

        {/* Search bar (chỉ hiện trên md trở lên) */}
        <div className="flex-1 mx-4 hidden sm:block">
          <div className="flex items-center border border-orange-400 rounded-lg px-3 py-2">
            <Search size={18} className="text-orange-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Icons bên phải */}
        <div className="flex items-center gap-4 text-orange-500">
          {/* Desktop: full icons */}
          <div className="hidden sm:flex items-center gap-5">
            <ListOrdered size={22} className="cursor-pointer" />
            <Bell size={22} className="cursor-pointer" />
            <ShoppingCart size={22} className="cursor-pointer" />
            <Menu size={24} className="cursor-pointer" />
          </div>

          {/* Mobile: chỉ hiển thị 3 icon cơ bản */}
          <div className="flex sm:hidden items-center gap-4">
            <Bell size={22} className="cursor-pointer" />
            <ShoppingCart size={22} className="cursor-pointer" />
            <Menu size={24} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Search bar cho mobile */}
      <div className="px-3 pb-2 sm:hidden">
        <div className="flex items-center border border-orange-400 rounded-lg px-3 py-2">
          <Search size={18} className="text-orange-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
