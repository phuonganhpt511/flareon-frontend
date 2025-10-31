import React, { useState } from 'react'
import { Button, Input, Form, Typography, Divider, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text, Link } = Typography

const FLAREON_LOGO = '/images/Logo.svg'
const GL_Logo = '/images/google.png'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)

    // ✅ Hàm xử lý đăng nhập
    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:3000/auth/login', values)

            // ✅ Lưu token và user vào localStorage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            message.success('Đăng nhập thành công 🎉')
            // ✅ Chuyển hướng sau khi đăng nhập
            window.location.href = '/dashboard'
        } catch (error) {
            console.error('❌ Lỗi đăng nhập:', error.response?.data || error.message)
            if (error.response?.status === 400) {
                message.error(error.response?.data?.message || 'Sai email hoặc mật khẩu!')
            } else {
                message.error('Lỗi kết nối tới máy chủ. Vui lòng thử lại sau!')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white">
            {/* Header */}
            <header className="w-full flex justify-between items-center p-4">
                <Link href="/" className="flex items-center !text-lg !text-orange-500 font-bold">
                    <ArrowLeftOutlined className="mr-1" /> Quay lại
                </Link>
            </header>

            {/* Nội dung form */}
            <div className="w-full max-w-sm px-4 mt-8">
                <div className="text-center mb-10">
                    <img src={FLAREON_LOGO} className="mx-auto h-20 mb-6" alt="Flareon Logo" />
                    <Title level={4} className="!text-xl !font-semibold !text-orange-500">
                        Đăng nhập Flareon
                    </Title>
                </div>

                {/* ✅ Form đăng nhập */}
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            className="!rounded-lg !h-14 !text-lg placeholder:!text-gray-400 !border-orange-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            className="!rounded-lg !h-14 !text-lg placeholder:!text-gray-400 !border-orange-500"
                        />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            className="!h-14 !rounded-lg !text-xl !font-bold !bg-orange-500 hover:!bg-orange-600 !border-none"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <Divider plain className="!my-8">
                    <Text type="secondary" className="!text-gray-500">Hoặc</Text>
                </Divider>

                {/* Các lựa chọn đăng nhập khác */}
                <div className="space-y-4">
                    <Button block size="large" className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 hover:!bg-gray-200">
                        Sign in
                    </Button>

                    <Button
                        block
                        size="large"
                        icon={<img src={GL_Logo} alt="Google" className="h-6 mr-2" />}
                        className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 hover:!bg-gray-200"
                    >
                        Continue with Google
                    </Button>
                </div>

                {/* Chính sách */}
                <div className="text-center text-xs text-gray-500 mb-20 px-4 mt-10">
                    <Text type="secondary" className="!text-gray-500 text-sm">
                        Bằng cách tiếp tục, bạn đồng ý với
                        <Link href="/terms" className="!font-bold !text-gray-800 hover:!text-orange-500">
                            {' '}Điều khoản sử dụng{' '}
                        </Link>
                        và
                        <Link href="/privacy" className="!font-bold !text-gray-800 hover:!text-orange-500">
                            {' '}Chính sách bảo mật
                        </Link>
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default LoginPage












