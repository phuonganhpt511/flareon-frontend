import { Outlet } from 'react-router'
import { Layout } from 'antd'

import { Sidebar } from './components/Sidebar'
import HeaderAdmin from './components/HeaderAdmin'
import FooterAdmin from './components/FooterAdmin'
import { useState } from 'react'

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
