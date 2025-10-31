
import React, { useState } from 'react'
import { Button, Input, Form, Typography, Divider, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text, Link } = Typography

const FLAREON_LOGO = '/images/Logo.svg'
const GL_Logo = '/images/google.png'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            // ✅ Gọi API backend (chạy port 3000)
            const res = await axios.post('http://localhost:3000/auth/register', {
                ...values,
                role: 0, // Mặc định là người dùng thường
            })

            message.success('Đăng ký thành công 🎉')

            // ✅ Nếu backend trả token và user
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }

            // ✅ Chuyển hướng sang trang đăng nhập
            setTimeout(() => {
                window.location.href = '/login'
            }, 800)
        } catch (error) {
            console.error('❌ Lỗi đăng ký:', error)
            message.error(error.response?.data?.message || 'Đăng ký thất bại!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white">
            <header className="w-full flex justify-between items-center p-4">
                <Link href="/" className="flex items-center !text-lg !text-orange-500 font-bold">
                    <ArrowLeftOutlined className="mr-1" /> Quay lại
                </Link>
            </header>

            <div className="w-full max-w-sm px-4 mt-8">
                <div className="text-center mb-10">
                    <img src={FLAREON_LOGO} className="mx-auto h-20 mb-6" />
                    <Title level={4} className="!text-xl !font-semibold !text-orange-500">
                        Đăng ký tài khoản
                    </Title>
                </div>

                {/* ✅ FORM đăng ký */}
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input
                            placeholder="Tên người dùng"
                            className="!rounded-lg !h-14 !text-lg placeholder:!text-gray-400 !border-orange-500"
                        />
                    </Form.Item>

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

                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input
                            placeholder="Số điện thoại"
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
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <Divider plain className="!my-8">
                    <Text type="secondary" className="!text-gray-500">
                        hoặc
                    </Text>
                </Divider>

                <div className="space-y-4">
                    <Button
                        block
                        size="large"
                        className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 hover:!bg-gray-200"
                    >
                        Đăng nhập
                    </Button>

                    <Button
                        block
                        size="large"
                        icon={<img src={GL_Logo} alt="Google" className="h-6 mr-2" />}
                        className="!h-14 !rounded-lg !text-lg !font-semibold !bg-gray-100 hover:!bg-gray-200"
                    >
                        Tiếp tục với Google
                    </Button>
                </div>

                <div className="text-center text-xs text-gray-500 mb-20 px-4 mt-10">
                    <Text type="secondary" className="!text-gray-500 text-sm">
                        Bằng cách đăng ký, bạn đồng ý với
                        <Link href="/terms" className="!font-bold !text-gray-800 hover:!text-orange-500">
                            {' '}Điều khoản dịch vụ{' '}
                        </Link>
                        và
                        <br />
                        <Link href="/privacy" className="!font-bold !text-gray-800 hover:!text-orange-500">
                            {' '}Chính sách bảo mật
                        </Link>
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
