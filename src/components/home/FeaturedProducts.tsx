import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductCard from "../common/ProductCard";
import type { Product } from "../common/ProductCard";

function FeaturedProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const productList = useSelector((state: RootState) => state.product.productList);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const products = productList as unknown as Product[];
    const featuredProducts = [...products]
        .sort((a, b) => b.sell_count - a.sell_count)
        .slice(0, 4);

    return(
        <section className='w-full px-4 py-[80px]'>

            <div className='flex flex-col items-center text-center gap-4 mb-[80px]'>
                <h4 className='text-[20px] leading-[30px] tracking-[0.2px] font-medium text-center text-[#737373] font-montserrat'>
                    Featured Products
                </h4>

                <h3 className='text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42] text-center font-montserrat'>
                    BESTSELLER PRODUCTS
                </h3>

                <p  className="text-center mt-2 mx-auto text-[#737373] text-[14px] leading-[20px] tracking-[0.2px] font-normal max-w-[400px] font-[Montserrat]"
                    style={{
                        maxWidth: "400px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "0.2px",
                    }}
                >
                    Problems trying to resolve the conflict between
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[80px] gap-x-[30px] max-w-[1124px] mx-auto'>
                 {featuredProducts.map((product) => (
                     <ProductCard key={product.id} product={product} />
                 ))}
            </div>

        </section>
    );
}

export default FeaturedProducts;