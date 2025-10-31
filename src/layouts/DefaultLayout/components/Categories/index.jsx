import React from 'react'
import { Coffee, Soup, Sandwich, Salad, Pizza, IceCream } from 'lucide-react'

const categories = [
  {
    icon: Soup,
    name: 'Món chính',
    count: 45,
    color: 'bg-orange-500',
  },
  {
    icon: Sandwich,
    name: 'Món phụ',
    count: 32,
    color: 'bg-amber-500',
  },
  {
    icon: Salad,
    name: 'Món khai vị',
    count: 28,
    color: 'bg-green-500',
  },
  {
    icon: Coffee,
    name: 'Đồ uống',
    count: 38,
    color: 'bg-brown-500',
  },
  {
    icon: Pizza,
    name: 'Fast food',
    count: 25,
    color: 'bg-red-500',
  },
  {
    icon: IceCream,
    name: 'Tráng miệng',
    count: 20,
    color: 'bg-pink-500',
  },
]

const Categories = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            Danh mục
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">Khám phá menu đa dạng</h2>
          <p className="text-xl text-gray-600">Hơn 188 món ăn ngon đang chờ bạn khám phá</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-center mb-2 text-gray-900">{category.name}</h3>
                <p className="text-center text-sm text-gray-500">{category.count} món</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
