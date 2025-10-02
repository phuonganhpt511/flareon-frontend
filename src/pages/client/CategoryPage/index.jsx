import React from "react";

const CategoryPage = () => {
  const products = [
    { id: 1, name: "Fresh Salad", desc: "Healthy and green", price: "$5.99", img: "/images/banner.png" },
    { id: 2, name: "Fruit Mix", desc: "Sweet & fresh", price: "$7.49", img: "/images/banner.png" },
    { id: 3, name: "Grilled Meat", desc: "Hot & spicy", price: "$9.99", img: "images/banner.png" },
    { id: 4, name: "Sushi Box", desc: "Japanese style", price: "$12.99", img: "images/banner.png" },
    { id: 5, name: "Ice Cream", desc: "Cold & sweet", price: "$3.99", img: "images/banner.png" },
    { id: 6, name: "Juice", desc: "Fresh fruit drink", price: "$4.99", img: "images/banner.png" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
        <img
          src="images/banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-orange-600">Danh mục sản phẩm</h2>

        {/* Grid sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
              <p className="text-orange-600 font-bold mt-1">{item.price}</p>
              <button className="mt-auto bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600">
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-10 p-6 text-center">
        <p>Body text for a post. Since it’s a social app</p>
        <p className="text-gray-400 mt-2 text-sm">
          Body text for a post. Sometimes it’s a hot take, and sometimes it’s a
          question.
        </p>
      </footer>
    </div>
  );
};

export default CategoryPage;
