
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import BannerSlider from "@/components/Slider"


const Home = () => {
  return (
    <>
      <BannerSlider />
      <CategoryList />
      <ProductList title="Sản phẩm nổi bật" />
      <ProductList title="Hàng mới về" />
    </>
  )
}

export default Home
