// src/components/ProductGrid/index.jsx
const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md"
          />
          <h3 className="font-semibold mt-2">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-red-500 font-bold">{product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
