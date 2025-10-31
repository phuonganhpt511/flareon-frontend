import React from 'react'
import { Form, Input, Button, Typography, Divider, message } from 'antd' // 1. Import thêm message
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router' // 2. Import useNavigate
import { useMutation } from '@tanstack/react-query' // 3. Import useMutation
import http from '@/apis/http' // 4. Import http client

const { Title, Text, Link } = Typography

const FLAREON_LOGO = '/public/images/Logo.png'
const GL_Logo = '/public/images/google.png'

const Register = () => {
  const navigate = useNavigate() // 5. Khởi tạo navigate
  const [messageApi, contextHolder] = message.useMessage() // Để hiển thị thông báo

  // --- 6. TẠO MUTATION ĐỂ GỌI API ĐĂNG KÝ ---
  // (Giả sử API là POST /register)
  const registerMutation = useMutation({
    mutationFn: (userData) => {
      // Backend có thể cần 'username' thay vì 'name'
      // Bạn cần kiểm tra lại API docs
      return http.post('/register', userData)
    },
    onSuccess: (data) => {
      console.log('Đăng ký thành công:', data)
      messageApi.success('Đăng ký thành công! Vui lòng đăng nhập.')
      // Chuyển hướng sang trang đăng nhập sau 1 giây
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    },
    onError: (error) => {
      console.error('Lỗi đăng ký:', error)
      const errMsg = error.response?.data?.message || 'Đăng ký thất bại. Email có thể đã tồn tại.'
      messageApi.error(errMsg)
    },
  })

  // --- 7. HÀM XỬ LÝ KHI SUBMIT FORM ---
  const onFinish = (values) => {
    console.log('Thông tin đăng ký:', values)
    // Gọi mutation để đăng ký
    // 'values' sẽ có dạng { name: '...', email: '...', password: '...' }
    registerMutation.mutate(values)
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
      {contextHolder} {/* Hiển thị thông báo messageApi */}
      <header className="w-full flex justify-between items-center p-4">
        {/* Sửa Link của Antd thành navigate của react-router */}
        <button
          onClick={() => navigate('/')} // Quay về trang chủ
          className="flex items-center text-lg text-orange-500 hover:text-orange-600 font-bold "
        >
          <ArrowLeftOutlined className="mr-1" />
          Quay lại
        </button>
      </header>
      <div className="w-full max-w-sm px-4 mt-8">
        <div className="text-center mb-10">
          <img src={FLAREON_LOGO} className="mx-auto h-20 mb-6" alt="Flareon Logo" />{' '}
          {/* Thêm alt tag */}
          <Title level={4} className="!text-xl !font-semibold !text-orange-500">
            Đăng ký
          </Title>
        </div>

        {/* 8. KẾT NỐI FORM VỚI HÀM onFinish */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username" // <-- Thêm 'name' (hoặc 'name' tùy backend)
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
          >
            <Input
              placeholder="Tên"
              className="!rounded-lg !h-14 !text-lg placeholder:!text-orange-500 !border-orange-500"
            />
          </Form.Item>
          <Form.Item
            name="email" // <-- Thêm 'name'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' },
            ]}
          >
            <Input
              placeholder="Email"
              className="!rounded-lg !h-14 !text-lg placeholder:!text-orange-500 !border-orange-500"
            />
          </Form.Item>
          <Form.Item
            name="password" // <-- Thêm 'name'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            {/* 9. DÙNG Input.Password ĐỂ ẨN MẬT KHẨU */}
            <Input.Password
              placeholder="Mật Khẩu"
              className="!rounded-lg !h-14 !text-lg placeholder:!text-orange-500 !border-orange-500"
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="!h-14 !rounded-lg !text-xl !font-bold !bg-orange-500 hover:!bg-orange-600 !border-none"
              loading={registerMutation.isPending} // Thêm trạng thái loading
            >
              {registerMutation.isPending ? 'Đang xử lý...' : 'Đăng Ký'}
            </Button>
          </Form.Item>
        </Form>

        <Divider plain className="!my-8">
          <Text type="secondary" className="!text-gray-500">
            or
          </Text>
        </Divider>

        {/*signin-guluglu */}
        <div className="space-y-4">
          {/* 10. THÊM onClick ĐỂ CHUYỂN TRANG LOGIN */}
          <Button
            block
            size="large"
            className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 !border-none hover:!bg-gray-200"
            onClick={() => navigate('/login')} // Chuyển sang trang Đăng nhập
          >
            Đăng nhập
          </Button>

          {/* Continue with Google */}
          <Button
            block
            size="large"
            icon={<img src={GL_Logo} alt="Google" className="h-6 mr-2" />}
            className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 !border-none hover:!bg-gray-200"
            // onClick={handleGoogleLogin} // Sẽ cần hàm xử lý riêng
          >
            Continue with Google
          </Button>
        </div>

        {/*privacy policy */}
        <div className="text-center text-xs text-gray-500 mb-20 px-4 mt-10">
          <Text type="secondary" className="!text-gray-500 text-sm">
            By clicking continue, you agree to our
            <Link href="/terms" className="!font-bold !text-gray-800 hover:!text-orange-500">
              {' '}
              Terms of Service{' '}
            </Link>
            and
            <br />
            <Link href="/privacy" className="!font-bold !text-gray-800 hover:!text-orange-500">
              {' '}
              Privacy Policy
            </Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Register
