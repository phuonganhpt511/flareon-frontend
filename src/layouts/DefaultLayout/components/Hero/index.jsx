import React from 'react'
import { QrCode, Smartphone, Zap } from 'lucide-react'
import AntButton from '@/components/AntButton'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span>Giải pháp gọi món thông minh</span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 font-bold">
              Gọi món qua <p className="text-orange-500">QR Code</p>
            </h1>

            <p className="text-gray-600 mb-8">
              Trải nghiệm gọi món nhanh chóng, tiện lợi chỉ với một lần quét. Không cần chờ đợi,
              không cần menu giấy - Tất cả trong tầm tay bạn!
            </p>

            <div className="flex flex-wrap gap-4">
              <AntButton
                type="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Quét mã ngay
              </AntButton>
              <AntButton size="large">
                <Smartphone className="w-5 h-5 mr-2" />
                Tìm hiểu thêm
              </AntButton>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl text-orange-500 mb-2 font-bold">1000+</div>
                <div className="text-gray-600">Nhà hàng</div>
              </div>
              <div>
                <div className="text-3xl text-orange-500 mb-2 font-bold">50K+</div>
                <div className="text-gray-600">Đơn hàng</div>
              </div>
              <div>
                <div className="text-3xl text-orange-500 mb-2 font-bold">4.8★</div>
                <div className="text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1640082380928-2f7079392823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2MTE3ODgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Restaurant ordering"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-orange-100">
              <QrCode className="w-24 h-24 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
