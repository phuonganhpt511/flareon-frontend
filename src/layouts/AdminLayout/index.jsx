import { Outlet } from 'react-router'
import { Layout } from 'antd'

import Sidebar from './components/Sidebar'
import HeaderAdmin from './components/HeaderAdmin'
import FooterAdmin from './components/FooterAdmin'

const AdminLayout = () => {
  return (
    <>
      <Layout className="min-h-screen bg-white">
        <Sidebar />
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
