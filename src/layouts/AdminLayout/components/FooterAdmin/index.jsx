import React from 'react'

import { Layout } from 'antd'
const { Footer } = Layout

const FooterAdmin = () => {
  return (
    <Footer className="text-center text-gray-500">
      © {new Date().getFullYear()} Antd v5 × Tailwind Dashboard
    </Footer>
  )
}

export default FooterAdmin
