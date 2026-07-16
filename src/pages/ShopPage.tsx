import { useParams } from "react-router-dom";
import ShopCategoryCard from '../components/shop/ShopCategoryCard';
import ShopProductSection from '../components/shop/ShopProductSection';
import ShopBrandsSection from "../components/shop/ShopBrandsSection"

function ShopPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();

  return (
      <div>

        <div className='flex flex-col
                            md:flex-row md:justify-between md:px-[10em]
                                bg-[#FAFAFA] py-[48px] gap-10 font-Montserrat
                                flex items-center justify-between h-[92px]
        '>

            <h3 className='text-center  font-bold text-[24px] tracking-[0.1px] '> SHOP </h3>

            {/* Breadcrumb */}
            <div className='flex justify-center gap-2 px-6 py-4 text-sm'>
                <span className="font-bold text-[#252B42] tracking-[0.2px]">Home</span>
                <span className="text-gray-400">{">"}</span>
                <span className='text-gray-500 tracking-[0.2px]'> Shop</span>
            </div>

        </div>

        <ShopCategoryCard />
        <ShopProductSection categoryId={categoryId ? Number(categoryId) : undefined} />

        <ShopBrandsSection />
        <div className="h-[10px] bg-white" />
    </div>
  )
}

export default ShopPage;