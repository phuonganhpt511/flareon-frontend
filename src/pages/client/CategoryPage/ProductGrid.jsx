import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {products.map((item) => (
      <ProductCard key={item.id} item={item} />
    ))}
  </div>
);

export default ProductGrid;
