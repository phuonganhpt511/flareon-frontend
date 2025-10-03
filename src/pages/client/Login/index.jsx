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
  // const navigate = useNavigate(); // Dùng khi cần chuyển hướng
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Khởi tạo React Hook Form
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

  // Xử lý logic Đăng nhập (khi validation thành công)
  const onSubmit = async (data) => {
    setLoading(true)
    setSubmitError(null)

    // **LOGIC GỌI API ĐĂNG NHẬP (MOCK)**
    try {
      // **NOTE:** Khi tích hợp API, thay thế khối này bằng:
      // import http from '../../../apis/http';
      // const response = await http.post('/auth/login', data);

      // Giả lập kết quả thành công
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Đăng nhập thành công, dữ liệu:', data)

      // Ví dụ: Lưu token vào localStorage và chuyển hướng
      // localStorage.setItem('token', 'fake_auth_token_123');
      // navigate('/');

      // Hiển thị thông báo thành công (Có thể dùng Alert Antd hoặc Toast Notification)
    } catch (err) {
      // Xử lý lỗi từ Server (Ví dụ: Sai email hoặc mật khẩu)
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
          {/* 1. Email */}
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

          {/* 2. Mật khẩu */}
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
