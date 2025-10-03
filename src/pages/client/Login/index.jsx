import React, { useState } from 'react'
// Import Ant Design components
import { Form, Input, Button, Card, Typography, Spin, Alert } from 'antd'
// Import hooks từ React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
// import { useNavigate } from 'react-router-dom'; // Dùng khi cần chuyển hướng

const { Title, Text, Link } = Typography

// Định nghĩa các quy tắc validation cho form Đăng nhập
const validationRules = {
  email: {
    required: 'Vui lòng nhập Email!',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Định dạng Email không hợp lệ.',
    },
  },
  password: {
    required: 'Vui lòng nhập Mật khẩu!',
    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
  },
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setSubmitError(null)

    // **LOGIC GỌI API ĐĂNG NHẬP (MOCK)**
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Đăng nhập thành công, dữ liệu:', data)
    } catch (err) {
      const errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu.'
      setSubmitError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="text-center mb-6">
          <Title level={2}>Đăng Nhập</Title>
          <Text type="secondary">Truy cập vào hệ thống gọi món</Text>
        </div>

        {/* Thông báo lỗi */}
        {submitError && (
          <Alert message={submitError} type="error" showIcon closable className="mb-4" />
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Địa chỉ Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="email@example.com"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <Link href="/forgot-password">Quên mật khẩu?</Link>
          </div>

          {/* Nút Đăng nhập */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              {loading ? <Spin size="small" /> : 'Đăng Nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text>Chưa có tài khoản? </Text>
          <Link href="/register">Đăng ký ngay</Link>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
