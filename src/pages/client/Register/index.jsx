import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)

    try {
      // Giai đoạn mock (chưa có API)
      console.log('Mock đăng ký:', values)
      message.success('Đăng ký thành công (mock)')
    } catch (error) {
      message.error('Có lỗi xảy ra (mock)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h2>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading} className="mt-4">
            Đăng ký
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
