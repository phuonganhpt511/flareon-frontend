import React, { useState } from 'react'

import { Layout, Menu } from 'antd'
const { Sider } = Layout

import {
  HomeOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  // data test
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Phân tích',
      children: [
        { key: 'revenue', label: 'Doanh thu' },
        { key: 'orders', label: 'Đơn hàng' },
      ],
    },
    {
      key: 'apps',
      icon: <AppstoreOutlined />,
      label: 'Ứng dụng',
      children: [
        { key: 'catalog', label: 'Sản phẩm' },
        { key: 'customers', label: 'Khách hàng' },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ]

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={260}
      className="!bg-white"
    >
      <div className="flex items-center gap-2 px-4 h-16">
        <div className="w-9 h-9 rounded-2xl bg-gray-100 grid place-items-center">
          <AppstoreOutlined />
        </div>
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight">Flareon Dashboard</span>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['home']}
        items={menuItems}
        className="!border-r-0"
      />
    </Sider>
  )
}

export default Sidebar
