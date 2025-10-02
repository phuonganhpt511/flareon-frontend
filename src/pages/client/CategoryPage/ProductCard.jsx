import React from "react";

const ProductCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow border flex flex-col p-2 relative">
    <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-md" />
    <h3 className="mt-2 text-base font-semibold">{item.name}</h3>
    <p className="text-gray-500 text-xs">{item.desc}</p>
    <p className="text-orange-600 font-bold text-sm mt-1">{item.price}</p>
    <button className="absolute bottom-2 right-2 bg-orange-500 text-white w-7 h-7 rounded flex items-center justify-center hover:bg-orange-600 text-lg font-bold">
      +
    </button>
  </div>
);

export default ProductCard;
