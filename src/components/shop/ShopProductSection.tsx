import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/actions/productActions";

import ProductCard from "../common/ProductCard";
import type { Product } from "../common/ProductCard";
import ShopFilterBar from "./ShopFilterBar";
import Pagination from "./Pagination"

interface ShopProductSectionProps {
    categoryId?: number;
}

function ShopProductSection({ categoryId }: ShopProductSectionProps) {
    const dispatch = useDispatch<AppDispatch>();
    const productList = useSelector((state: RootState) => state.product.productList);
    const fetchState = useSelector((state: RootState) => state.product.fetchState);
    const total = useSelector((state: RootState) => state.product.total);

    const [viewMode, setViewMode] = useState<"grid" | "list">(
        window.innerWidth < 1024 ? "list" : "grid"
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const [pendingSortOrder, setPendingSortOrder] = useState<"popularity" | "high-to-low" | "low-to-high">("popularity");
    const [sortOrder, setSortOrder] = useState<"popularity" | "high-to-low" | "low-to-high">("popularity");

    const sortMap: Record<string, string> = {
        "high-to-low": "price:desc",
        "low-to-high": "price:asc",
        "popularity": "rating:desc",
    };

    useEffect(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        dispatch(fetchProducts({
            category: categoryId,
            sort: sortMap[sortOrder],
            limit: itemsPerPage,
            offset,
        }));
    }, [dispatch, categoryId, sortOrder, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1); // kategori ya da sıralama değişince ilk sayfaya dön
    }, [categoryId, sortOrder]);

    useEffect(() => {
        function updateForScreenSize() {
            if (window.innerWidth < 1024) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(12);
                setViewMode("grid");
            }
        }

        updateForScreenSize();
        window.addEventListener("resize", updateForScreenSize);

        return () => window.removeEventListener("resize", updateForScreenSize);
    }, []);

    const products = productList as unknown as Product[];
    const totalPages = Math.ceil(total / itemsPerPage);

    const gridClasses = viewMode === "grid"
        ? "grid grid-cols-2 lg:grid-cols-4 gap-[18px] lg:gap-[24px]"
        : "flex flex-col gap-[18px] lg:gap-[24px] lg:max-w-[500px] lg:mx-auto";

    if (fetchState === "FETCHING") {
        return (
            <div className="flex items-center justify-center py-[100px]">
                <span className="w-8 h-8 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return(
        <div className='w-full max-w-[1440px] mx-auto px-16 lg:px-[195px] py-[24px] flex flex-col gap-[24px]'>

            <ShopFilterBar
                totalResults={total}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortOrder={pendingSortOrder}
                setSortOrder={setPendingSortOrder}
                onFilterClick={() => setSortOrder(pendingSortOrder)}
            />

            <div className={gridClasses}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
}

export default ShopProductSection;