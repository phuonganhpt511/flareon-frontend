import { BrowserRouter, Route, Routes } from 'react-router'

import AdminLayout from '@/layouts/AdminLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

import Home from '@/pages/client/Home'
import AboutPage from '@/pages/client/AboutPage'
import Dashboard from '@/pages/admin/Dashboard'
import CartPage from '@/pages/client/CartPage'
import RegisterPage from '@/pages/client/Register'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin layout pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* register*/}
        <Route path="/register" element={<RegisterPage />} />
        {/* Default layout pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
