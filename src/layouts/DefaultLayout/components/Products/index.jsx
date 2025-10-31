import { Eye, Star, Clock } from "lucide-react";
import { Tag, Button } from "antd";

const products = [
  {
    id: 1,
    name: 'Phở Bò Đặc Biệt',
    description: 'Phở bò truyền thống với nước dùng đậm đà, thịt bò tươi ngon',
    price: 65000,
    image:
      'https://images.unsplash.com/photo-1631709497146-a239ef373cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwbm9vZGxlfGVufDF8fHx8MTc2MTIxMDI1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Món chính',
    rating: 4.8,
    prepTime: '15-20 phút',
    isPopular: true,
    ingredients: ['Bánh phở', 'Thịt bò', 'Hành tây', 'Ngò gai', 'Gia vị đặc biệt'],
  },
  {
    id: 2,
    name: 'Gỏi Cuốn Tôm Thịt',
    description: 'Gỏi cuốn tươi mát với tôm, thịt và rau sống, chấm tương đậu phộng',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1618406854423-ef169758d6a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xscyUyMGZvb2R8ZW58MXx8fHwxNzYxMjEwMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Món khai vị',
    rating: 4.6,
    prepTime: '10-15 phút',
    ingredients: ['Bánh tráng', 'Tôm', 'Thịt ba rọi', 'Bún', 'Rau sống', 'Tương đậu phộng'],
  },
  {
    id: 3,
    name: 'Bánh Mì Đặc Biệt',
    description: 'Bánh mì giòn tan với nhân đầy đặn, đậm đà hương vị Việt Nam',
    price: 25000,
    image:
      'https://images.unsplash.com/photo-1715924298872-9a86b729eb96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5oJTIwbWklMjBzYW5kd2ljaHxlbnwxfHx8fDE3NjExODgxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Món phụ',
    rating: 4.7,
    prepTime: '5-10 phút',
    isPopular: true,
    ingredients: ['Bánh mì', 'Pate', 'Thịt nguội', 'Rau sống', 'Đồ chua', 'Sốt đặc biệt'],
  },
  {
    id: 4,
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê Việt Nam đậm đà pha phin truyền thống',
    price: 30000,
    image:
      'https://images.unsplash.com/photo-1664515725366-e8328e9dc834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwY29mZmVlfGVufDF8fHx8MTc2MTEzNjYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Đồ uống',
    rating: 4.9,
    prepTime: '5 phút',
    isPopular: true,
    ingredients: ['Cà phê Robusta', 'Sữa đặc', 'Đá'],
  },
  {
    id: 5,
    name: 'Cơm Chiên Dương Châu',
    description: 'Cơm chiên thơm ngon với tôm, xúc xích, rau củ đầy đủ dinh dưỡng',
    price: 55000,
    image:
      'https://images.unsplash.com/photo-1646340916384-9845d7686e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBhc2lhbnxlbnwxfHx8fDE3NjEyMTAyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Món chính',
    rating: 4.5,
    prepTime: '15-20 phút',
    ingredients: ['Cơm', 'Tôm', 'Xúc xích', 'Trứng', 'Rau củ', 'Gia vị'],
  },
  {
    id: 6,
    name: 'Phở Gà Nấm',
    description: 'Phở gà thơm ngon với nấm hương bổ dưỡng',
    price: 60000,
    image:
      'https://images.unsplash.com/photo-1631709497146-a239ef373cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwbm9vZGxlfGVufDF8fHx8MTc2MTIxMDI1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Món chính',
    rating: 4.6,
    prepTime: '15-20 phút',
    ingredients: ['Bánh phở', 'Thịt gà', 'Nấm hương', 'Hành lá', 'Ngò rí'],
  },
]

const Products = () => {
  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
              Món ngon đề xuất
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">Món ăn nổi bật</h2>
            <p className="text-xl text-gray-600">Những món ăn được yêu thích nhất tại nhà hàng</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag variant="outline" className="text-orange-500 border-orange-300">
                      {product.category}
                    </Tag>
                  </div>

                  <h3 className="text-xl mb-2 text-gray-900 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{product.prepTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl text-orange-500">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
