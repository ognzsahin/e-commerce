import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchCategories } from "../../redux/actions/categoryActions";
import CategoryCard from './CategoryCard';

function ShopCategoryCard() {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.product.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const topCategories = [...categories]
        .sort((a, b) => (b.rating as number) - (a.rating as number))
        .slice(0, 5);

    return (
        <div className="w-full max-w-[1440px] mx-auto bg-[#FAFAFA] px-[36px] py-[24px] lg:px-[195px]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-[18px] lg:gap-[15px]">
                {topCategories.map((cat) => {
                    const category = cat as Record<string, unknown>;
                    const code = category.code as string;
                    const [gender, categoryName] = code.split(":");

                    return (
                        <CategoryCard
                            key={category.id as number}
                            image={category.img as string}
                            title={category.title as string}
                            gender={gender}
                            categoryName={categoryName}
                            categoryId={category.id as number}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShopCategoryCard;