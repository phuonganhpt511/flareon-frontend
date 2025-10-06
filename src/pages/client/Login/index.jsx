import React, { useState } from 'react'
import { Button, Input, Form, Typography, Divider } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
// Đã loại bỏ useForm và Controller từ React Hook Form

const { Title, Text, Link } = Typography

// Đường dẫn giả định đến Logo Flareon
// Bạn cần thay thế bằng đường dẫn thực tế của logo trong dự án: '@/assets/flareon_logo.svg'
const FLAREON_LOGO = '/public/images/Logo.svg'
const GL_Logo = '/public/images/google.png'

const LoginPage = () => {
  // Chỉ sử dụng useState để quản lý trạng thái tĩnh và loading
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState('') // State để giữ giá trị input

  const handleSubmit = (e) => {
    setLoading(true)
    console.log('Tiếp tục với:', identifier)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
      <header className="w-full flex justify-between items-center p-4">
        <Link
          href="/"
          className="flex items-center !text-lg !text-orange-500 !hover:text-orange-500 font-bold "
        >
          <ArrowLeftOutlined className="mr-1" />
          Quay lại
        </Link>
      </header>

      <div className="w-full max-w-sm px-4 mt-8">
        <div className="text-center mb-10">
          <img src={FLAREON_LOGO} className="mx-auto h-20 mb-6" />
          <Title level={4} className="!text-xl !font-semibold !text-orange-500">
            Tên khách hàng
          </Title>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item>
            <Input
              placeholder="Vui lòng nhập tên..."
              className="!rounded-lg !h-14 !text-lg placeholder:!text-orange-500 !border-orange-500"
            />
          </Form.Item>

          {/* Nút Continue - Màu Cam chủ đạo của Figma */}
          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="!h-14 !rounded-lg !text-xl !font-bold !bg-orange-500 hover:!bg-orange-600 !border-none"
            >
              Continue
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
          <Button
            block
            size="large"
            className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 !border-none hover:!bg-gray-200"
          >
            Sign in
          </Button>

          {/* Continue with Google */}
          <Button
            block
            size="large"
            icon={<img src={GL_Logo} alt="Google" className="h-6 mr-2" />}
            className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 !border-none hover:!bg-gray-200"
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

export default LoginPage
