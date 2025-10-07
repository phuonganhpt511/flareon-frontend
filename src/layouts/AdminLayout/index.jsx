import { useState } from 'react'
import { Outlet } from 'react-router'
import { Layout } from 'antd'
// components
import { Sidebar } from './components/Sidebar'
import HeaderAdmin from './components/HeaderAdmin'
import FooterAdmin from './components/FooterAdmin'

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const role = 'admin' // Data test quyền

  return (
    <>
      <Layout className="min-h-screen bg-white">
        <Sidebar role={role} collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout>
          <HeaderAdmin />
          <Outlet />
          <FooterAdmin />
        </Layout>
      </Layout>
    </>
  )
}

export default AdminLayout
