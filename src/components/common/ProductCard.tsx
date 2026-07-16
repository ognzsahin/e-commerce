    import { useState } from "react";
    import { Link } from "react-router-dom";

    export interface ProductColor {
        hex: string;
    }

    export interface ProductImage {
        url: string;
        index: number;
    }

    export interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        discountPercentage: number | null;
        stock: number;
        store_id: number;
        category_id: number;
        rating: number;
        sell_count: number;
        images: ProductImage[];
        colors?: ProductColor[];
    }

    interface ProductCardProps {
        product: Product;
    }

    function ProductCard({ product }: ProductCardProps) {

        //Hangi rengin seçili olduğunu tutan state'im.
        const [activeColorIndex, setActiveColorIndex] = useState(0);

        //Seçilen renge göre hangi görselin geleceğini bulur.
        //images array'i içinden index'i activeColorIndex'e eşit olanı getir.
        const activeImage = product.images?.find(img => img.index === activeColorIndex);

        //İndirimli fiyatın hesaplanması.
        const discountedPrice = product.discountPercentage
                ? product.price - (product.price * product.discountPercentage) / 100
                : null;

        return (

            <Link
                to={`/shop/all/category-${product.category_id}/${product.category_id}/${product.name.toLowerCase().replace(/\s+/g, "-")}/${product.id}`}
                className='flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity'
            >

                {/* GÖRSEL */}
                <div className='w-full aspect-[348/427] overflow-hidden flex items-center justify-center'>
                    <img
                        src={activeImage?.url}
                        alt={product.name}
                        className='max-w-full max-h-full object-contain'
                    />

                </div>

                {/* ÜRÜN BİLGİLERİ */}
                <div className='flex flex-col items-center text-center gap-2 mt-4 px-2'>

                    {/* İSİM */}
                    <h5 className='font-[Montserrat] font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] text-center'>
                        {product.name}
                    </h5>

                    {/* AÇIKLAMASI */}
                    <p className='text-sm text-[#737373]'> {product.description}</p>

                    {/* FİYATLAR */}
                    <div className='flex items-center gap-3 mt-1'>

                        {discountedPrice !== null ? (
                            // İndirim VARSA: üstü çizili eski fiyat + yeşil indirimli fiyat
                            <>
                                <span className='text-[#BDBDBD] line-through text-sm font-bold'>
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className='text-[#2DC071] font-bold text-[16px]'>
                                    ${discountedPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            // İndirim YOKSA: normal fiyat, çizgisiz
                            <span className='text-[#252B42] font-bold text-[16px]'>
                                ${product.price.toFixed(2)}
                            </span>
                        )}

                    </div>

                    <div className='flex items-center gap-2 mt-2'>

                        {product.colors?.map((color, index) => (                            <button
                                key={index}
                                type='button'
                                onClick={() => setActiveColorIndex(index)}
                                className={`
                                    w-4 h-4 rounded-full transition-all duration-200
                                        ${activeColorIndex === index
                                            ? 'ring-2 ring-offset-2 ring-[#252B42] scale-110'
                                                : 'hover:scale-110'}
                                `}
                                style={{ backgroundColor: color.hex }}
                                aria-label={`Color: ${color.hex}`}
                            />
                        ))}
                    </div>

                </div>

            </Link>

        )
    }

    export default ProductCard;