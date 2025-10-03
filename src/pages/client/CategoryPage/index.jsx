import Banner from '@/layouts/DefaultLayout/components/Banner'
import ProductGrid from '@/layouts/DefaultLayout/components/ProductGrid'

const CategoryPage = () => {
  const products = [
    {
      id: 1,
      name: 'Product name',
      description: 'Description',
      price: '100.000đ',
      image: '/images/p1.jpg',
    },
    {
      id: 2,
      name: 'Product name',
      description: 'Description',
      price: '120.000đ',
      image: '/images/p2.jpg',
    },
    {
      id: 3,
      name: 'Product name',
      description: 'Description',
      price: '90.000đ',
      image: '/images/p3.jpg',
    },
    {
      id: 4,
      name: 'Product name',
      description: 'Description',
      price: '80.000đ',
      image: '/images/p4.jpg',
    },
    {
      id: 5,
      name: 'Product name',
      description: 'Description',
      price: '95.000đ',
      image: '/images/p5.jpg',
    },
    {
      id: 6,
      name: 'Product name',
      description: 'Description',
      price: '150.000đ',
      image: '/images/p6.jpg',
    },
  ]

  return (
    <div className="px-4 md:px-8">
      {/* Banner */}
      <Banner title="Banner title" image="/images/banner.png" />
      {/* Title */}
      <h2 className="text-xl font-bold mt-6 mb-4">Title</h2>
      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  )
}

export default CategoryPage
