import { BrowserRouter, Routes, Route } from 'react-router'

import AdminLayout from '@/layouts/AdminLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

import Home from '@/pages/client/Home'
import AboutPage from '@/pages/client/AboutPage'
import Dashboard from '@/pages/admin/Dashboard'
import CategoryPage from '@/pages/client/CategoryPage'
import CartPage from '@/pages/client/CartPage'
import FoodDetailPage from '@/pages/client/FoodDetailPage'
import OderPage from '@/pages/client/OderPage'
import RegisterPage from '@/pages/client/Register'
import LoginPage from '@/pages/client/Login'
import NoSignIn from '@/pages/client/No-sigin'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin layout pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* No-SignIn*/}
        <Route path="/nosignin" element={<NoSignIn />} />
        {/* register*/}
        <Route path="/register" element={<RegisterPage />} />
        {/* Login*/}
        <Route path="/login" element={<LoginPage />} />
        {/* Default layout pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<FoodDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/oder" element={<OderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
