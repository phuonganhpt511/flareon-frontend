import { ConfigProvider } from 'antd'
import React from 'react'

const THEME_DEFAULT = {
  token: {
    colorPrimary: '#ff6900',
  },
}

const AppThemeProvider = ({ children }) => {
  return <ConfigProvider theme={THEME_DEFAULT}>{children}</ConfigProvider>
}

export default AppThemeProvider
