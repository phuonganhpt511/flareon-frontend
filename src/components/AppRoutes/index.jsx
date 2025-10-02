import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminLayout from '@/layouts/AdminLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

import Home from '@/pages/client/Home'
import AboutPage from '@/pages/client/AboutPage'
import Dashboard from '@/pages/admin/Dashboard'
import CategoryPage from '@/pages/client/CategoryPage'
import Header from '../Header' 

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        {/* Admin layout pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* Default layout pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes