import React from 'react'
import { Layout, Avatar, Menu, Input, Button, Dropdown } from 'antd'
import { BellOutlined, SearchOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'

const { Header } = Layout

const HeaderAdmin = () => {
  const userMenu = (
    <Menu
      items={[
        { key: 'profile', label: 'Hồ sơ' },
        { key: 'settings', label: 'Cài đặt' },
        { type: 'divider' },
        { key: 'logout', label: 'Đăng xuất' },
      ]}
    />
  )
  return (
    <Header className="!bg-white px-4">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center px-3 py-1.5 rounded-xl bg-gray-50">
            <SearchOutlined className="mr-2" />
            <Input bordered={false} placeholder="Tìm kiếm..." className="w-56" />
          </div>
          <Button type="text" icon={<BellOutlined />} />
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <Avatar icon={<UserOutlined />} />
              <span className="hidden md:inline">Admin</span>
              <DownOutlined className="text-xs" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default HeaderAdmin
