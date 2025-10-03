import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterPage from '@/pages/client/Register'

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
