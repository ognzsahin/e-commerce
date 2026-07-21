import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../services/axiosInstance";
import type { Product } from "../components/common/ProductCard";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/actions/cartActions";

function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(`/products/${productId}`);
                setProduct(response.data);
                setActiveColorIndex(0);
                setQuantity(1);
                setAddedToCart(false);
            } catch (error) {
                console.error("Ürün yüklenirken hata oluştu:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-[100px]">
                <span className="w-8 h-8 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center py-[100px] text-gray-500">
                Ürün bulunamadı.
            </div>
        );
    }

    const activeImage = product.images.find((img) => img.index === activeColorIndex) ?? product.images[0];

    function handleAddToCart() {
        if (!product) return;
        dispatch(addToCart(product as unknown as Record<string, unknown>, quantity));
        setAddedToCart(true);
    }

    return (
        <div className="max-w-[1200px] mx-auto px-[16px] py-[40px] flex flex-col md:flex-row gap-[40px]">

            <div className="w-full md:w-1/4 md:max-w-[400px]">
                <img
                    src={activeImage?.url}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-[#252B42]">{product.name}</h1>
                <p className="text-[#737373]">{product.description}</p>
                <span className="text-xl font-bold text-[#252B42]">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">Stok: {product.stock}</span>

                {/* Renk seçimi */}
                {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-2">
                        {product.colors.map((color, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveColorIndex(index)}
                                className={`w-6 h-6 rounded-full transition-all duration-200
                                    ${activeColorIndex === index ? "ring-2 ring-offset-2 ring-[#252B42]" : ""}`}
                                style={{ backgroundColor: color.hex }}
                            />
                        ))}
                    </div>
                )}

                {/* Miktar seçici */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                    >
                        +
                    </button>
                </div>

                {/* Sepete ekle */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3
                                    hover:bg-[#1f92d8] transition-colors w-fit"
                >
                    {addedToCart ? "Sepete Eklendi ✓" : "Sepete Ekle"}
                </button>

            </div>

        </div>
    );
}

export default ProductDetailPage;