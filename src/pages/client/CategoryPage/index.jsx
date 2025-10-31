import http from '@/apis/http'
import Banner from '@/layouts/DefaultLayout/components/Banner'
import ProductCard from '@/layouts/DefaultLayout/components/ProductCard'
import ProductGrid from '@/layouts/DefaultLayout/components/ProductGrid'
import { useQuery } from '@tanstack/react-query'

const CategoryPage = () => {
  const {
    data: Categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await http.get('/category')
      return res.data || []
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="px-4 md:px-8">
      {/* Banner */}
      <Banner title="Banner title" image="/images/banner.png" />
      {/* Title */}
      <h2 className="text-xl font-bold mt-6 mb-4">Danh mục</h2>
      {/* Product Grid */}
      <ProductGrid products={Categories} />
    </div>
  )
}

export default CategoryPage
