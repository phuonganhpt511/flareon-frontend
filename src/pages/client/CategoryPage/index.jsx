import React from "react";
import Banner from "./Banner";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

const products = [
  { id: 1, name: "Fresh Salad", desc: "Healthy and green", price: "$5.99", img: "/images/banner.png" },
  { id: 2, name: "Fruit Mix", desc: "Sweet & fresh", price: "$7.49", img: "/images/banner.png" },
  { id: 3, name: "Grilled Meat", desc: "Hot & spicy", price: "$9.99", img: "/images/banner.png" },
  { id: 4, name: "Sushi Box", desc: "Japanese style", price: "$12.99", img: "/images/banner.png" },
  { id: 5, name: "Ice Cream", desc: "Cold & sweet", price: "$3.99", img: "/images/banner.png" },
  { id: 6, name: "Juice", desc: "Fresh fruit drink", price: "$4.99", img: "/images/banner.png" },
];

const CategoryPage = () => (
  <div className="bg-white min-h-screen">
    <Banner />
    <div className="max-w-7xl mx-auto px-4 py-2">
      <h2 className="text-xl font-bold text-orange-600 mb-2">Title</h2>
      <ProductGrid products={products} />
    </div>
    <Footer />
  </div>
);

export default CategoryPage;
