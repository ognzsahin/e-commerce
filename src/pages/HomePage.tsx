import HeroBanner from "../components/home/HeroBanner"
import EditorsPick from "../components/home/EditorsPick"
import FeaturedProducts from "../components/home/FeaturedProducts"
import ProductCarousel from "../components/home/ProductCarousel"
import ShopBanner from "../components/home/ShopBanner"
import BlogSection from "../components/home/BlogSection"


function HomePage() {
  return (
    <div>
      <HeroBanner />
      <EditorsPick />
      <FeaturedProducts />
      <ProductCarousel />
      <ShopBanner />
      <BlogSection />
    </div>
  )
}

export default HomePage;
