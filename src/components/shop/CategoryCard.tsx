import { Link } from "react-router-dom";

interface CategoryCardProps {
    image: string;
    title: string;
    gender: string;
    categoryName: string;
    categoryId: number;
}

function CategoryCard({ image, title, gender, categoryName, categoryId }: CategoryCardProps) {
    return (
        <Link
            to={`/shop/${gender}/${categoryName}/${categoryId}`}
            className="relative block w-full h-[300px] sm:h-[260px] lg:h-[223px] overflow-hidden"
        >
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white bg-black/30 text-center">
                <span className="text-lg font-semibold tracking-wide uppercase">
                    {title}
                </span>
            </div>
        </Link>
    );
}

export default CategoryCard;