import AppRoutes from '@components/AppRoutes'
import '@shared/styles/tailwind.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App
