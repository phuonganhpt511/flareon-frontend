import React from 'react'
import { QrCode, Clock, CreditCard, Star, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: QrCode,
    title: 'Quét QR nhanh chóng',
    description: 'Chỉ cần quét mã QR trên bàn để xem menu và đặt món ngay lập tức',
  },
  {
    icon: Clock,
    title: 'Tiết kiệm thời gian',
    description: 'Không cần chờ đợi nhân viên, gọi món mọi lúc mọi nơi trong nhà hàng',
  },
  {
    icon: CreditCard,
    title: 'Thanh toán dễ dàng',
    description: 'Nhiều phương thức thanh toán an toàn, nhanh chóng và tiện lợi',
  },
  {
    icon: Star,
    title: 'Menu đa dạng',
    description: 'Hình ảnh món ăn sống động, mô tả chi tiết với giá cả minh bạch',
  },
  {
    icon: Shield,
    title: 'An toàn & Bảo mật',
    description: 'Thông tin cá nhân được bảo vệ tuyệt đối với công nghệ mã hóa',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc',
  },
]

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            Tính năng nổi bật
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">Tại sao chọn chúng tôi?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi mang đến trải nghiệm gọi món hiện đại, tiện lợi và an toàn nhất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                <feature.icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
