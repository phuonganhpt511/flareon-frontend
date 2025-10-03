import { ShoppingCart } from "lucide-react"

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-base">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-red-500 font-bold mt-1">{product.price}</p>
        <button className="mt-2 flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
          <ShoppingCart size={16} /> Mua
        </button>
      </div>
    </div>
  )
}

export default ProductCard
