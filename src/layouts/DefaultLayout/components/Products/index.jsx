import { useEffect, useState } from "react";
import { Tag, Button } from "antd";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import http from "@/apis/http";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách món ăn từ BE
  useEffect(() => {
    http
      .get("/dishes")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách món ăn:", err);
      });
  }, []);

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
              Món ngon đề xuất
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Món ăn nổi bật
            </h2>
            <p className="text-xl text-gray-600">
              Những món ăn được yêu thích nhất tại nhà hàng
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 && (
              <p className="text-gray-500 text-center col-span-3">
                Không có sản phẩm nào.
              </p>
            )}

            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
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
                    <Tag
                      bordered={false}
                      className="text-orange-500 bg-orange-100 px-3 py-1 rounded-full"
                    >
                      {product.category?.name || "Chưa phân loại"}
                    </Tag>
                  </div>

                  <h3 className="text-xl mb-2 text-gray-900 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{product.rating || 4.5}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {product.prepTime || "10 phút"}
                      </span>
                    </div>
                  </div>

                  {/* ✅ PHẦN GIÁ + NÚT */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl text-orange-500">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>

                    <div className="flex gap-2">
                      {/* Nút Chi tiết */}
                      <Button
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product._id}`);
                        }}
                      >
                        Chi tiết
                      </Button>

                      {/* ✅ Nút + Giỏ hàng */}
                      <Button
                        type="primary"
                        className="bg-orange-500 text-white hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        + Giỏ hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
