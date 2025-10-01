import { Outlet } from 'react-router'
import Sidebar from './components/Sidebar'
import { Layout } from 'antd'

const AdminLayout = () => {
  return (
    <>
      <Layout className="min-h-screen bg-white">
        <Sidebar />
        <Outlet />
      </Layout>
    </>
  )
}

export default AdminLayout
