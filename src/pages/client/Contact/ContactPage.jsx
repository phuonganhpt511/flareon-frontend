// src/pages/client/ContactPage.jsx
import React, { useState } from 'react'
import { Form, Input, Button, message, Typography } from 'antd'
import { Mail, Phone, MapPin } from 'lucide-react'
import emailjs from 'emailjs-com' // Import EmailJS

const { Title, Text } = Typography

const ContactPage = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)

  // --- HÀM XỬ LÝ KHI SUBMIT FORM (Dùng EmailJS) ---
  const onFinish = (values) => {
    console.log('Thông tin liên hệ:', values)
    setIsLoading(true) // Bật loading

    // GỌI HÀM emailjs.send() VỚI CÁC "CHÌA KHÓA" CỦA BẠN
    emailjs
      .send(
        'service_j8cxu7l', // <-- Service ID
        'template_q7yxy3l', // <-- Template ID
        values, // Dữ liệu form (khớp với {{name}}, {{email}}...)
        'nmh7s617G2tYkFFyP' // <-- Public Key
      )
      .then(
        (result) => {
          console.log('Gửi EmailJS thành công!', result.text)
          messageApi.success('Gửi tin nhắn thành công! Chúng tôi sẽ sớm phản hồi.')
          form.resetFields()
          setIsLoading(false)
        },
        (error) => {
          console.error('Lỗi khi gửi EmailJS:', error.text)
          messageApi.error('Gửi tin nhắn thất bại. Vui lòng thử lại.')
          setIsLoading(false)
        }
      )
  }

  return (
    <div className="bg-white py-12 md:py-20 px-4">
      {contextHolder}

      {/* === PHẦN TIÊU ĐỀ === */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
          LIÊN HỆ
        </span>
        <Title level={1} className="!text-4xl md:!text-5xl !font-bold !text-gray-900">
          Kết nối với Flareon
        </Title>
        <Text className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Bạn có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn lòng lắng nghe!
        </Text>
      </div>

      {/* === PHẦN NỘI DUNG (CHIA 2 CỘT) === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* === CỘT 1: THÔNG TIN LIÊN HỆ === */}
        <div className="space-y-8">
          {/* Địa chỉ */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <Title level={4} className="!text-lg !font-semibold !text-gray-700 !mb-1">
                Địa chỉ
              </Title>
              <Text className="text-gray-600">
                123 Đường ABC, Phường X, Quận 1, TP. Hồ Chí Minh
              </Text>
            </div>
          </div>

          {/* Điện thoại */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <Title level={4} className="!text-lg !font-semibold !text-gray-700 !mb-1">
                Điện thoại
              </Title>
              <Text className="text-gray-600">(+84) 123 456 789</Text>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <Title level={4} className="!text-lg !font-semibold !text-gray-700 !mb-1">
                Email
              </Title>
              <Text className="text-gray-600">contact@flareon.com</Text>
            </div>
          </div>
        </div>

        {/* === CỘT 2: FORM LIÊN HỆ === */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Tên và Email (2 cột) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Form.Item
                name="name" // Phải khớp với {{name}}
                label="Tên của bạn"
                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
              >
                <Input size="large" placeholder="Nhập tên của bạn" className="!rounded-lg !py-3" />
              </Form.Item>
              <Form.Item
                name="email" // Phải khớp với {{email}}
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập email của bạn"
                  className="!rounded-lg !py-3"
                />
              </Form.Item>
            </div>

            {/* Chủ đề */}
            <Form.Item
              name="subject" // Phải khớp với {{subject}}
              label="Chủ đề"
              rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
            >
              <Input
                size="large"
                placeholder="Bạn cần hỗ trợ về vấn đề gì?"
                className="!rounded-lg !py-3"
              />
            </Form.Item>

            {/* Tin nhắn */}
            <Form.Item
              name="message" // Phải khớp với {{message}}
              label="Tin nhắn"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            >
              <Input.TextArea
                placeholder="Viết tin nhắn của bạn ở đây..."
                rows={5}
                size="large"
                className="!rounded-lg"
              />
            </Form.Item>

            {/* Nút Gửi */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!h-14 !rounded-lg !text-xl !font-bold !bg-orange-500 hover:!bg-orange-600 !border-none w-full"
                loading={isLoading}
              >
                {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
