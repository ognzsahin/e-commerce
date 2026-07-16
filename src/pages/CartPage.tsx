import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { updateCartItemCount, removeFromCart } from "../redux/actions/cartActions";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.shoppingCart.cart);

    const productsTotal = cart.reduce((sum, item) => {
        const product = item.product as Record<string, unknown>;
        return sum + (product.price as number) * (item.count as number);
    }, 0);

    const shippingCost = productsTotal > 150 ? 0 : 29.99;
    const discount = productsTotal > 150 ? 29.99 : 0;
    const grandTotal = productsTotal + shippingCost - discount;

    const navigate = useNavigate();

    return (
        <div className="max-w-[1200px] mx-auto px-[16px] py-[40px] flex flex-col lg:flex-row gap-[32px]">

            {/* Sol taraf — ürün listesi */}
            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-[#252B42]">Sepetim ({cart.length} Ürün)</h1>

                {cart.length === 0 ? (
                    <p className="text-gray-500">Sepetiniz boş.</p>
                ) : (
                    cart.map((item, index) => {
                        const product = item.product as Record<string, unknown>;
                        const images = product.images as { url: string }[];
                        return (
                            <div key={index} className="flex items-center gap-4 border border-gray-200 rounded p-4">
                                <img
                                    src={images?.[0]?.url}
                                    alt={product.name as string}
                                    className="w-20 h-20 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <p className="font-medium text-[#252B42]">{product.name as string}</p>
                                    <p className="text-sm text-gray-500">${(product.price as number).toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => dispatch(updateCartItemCount(product.id as number, (item.count as number) - 1))}
                                        className="w-8 h-8 border border-gray-300 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center">{item.count as number}</span>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(updateCartItemCount(product.id as number, (item.count as number) + 1))}
                                        className="w-8 h-8 border border-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <span className="font-bold text-[#252B42] w-[80px] text-right">
                                    ${((product.price as number) * (item.count as number)).toFixed(2)}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => dispatch(removeFromCart(product.id as number))}
                                    aria-label="Sil"
                                >
                                    <Trash2 size={20} className="text-red-500" />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Sağ taraf — Order Summary Box */}
            {cart.length > 0 && (
                <div className="w-full lg:w-[320px] border border-gray-200 rounded-lg p-6 h-fit flex flex-col gap-4">
                    <h2 className="font-bold text-[#252B42]">Sipariş Özeti</h2>

                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Ürünlerin Toplamı</span>
                        <span>${productsTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Kargo Toplam</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>150 TL ve Üzeri Kargo Bedava</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between font-bold text-[#252B42] border-t pt-3">
                        <span>Toplam</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/order")}
                        className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3 hover:bg-[#1f92d8] transition-colors"
                    >
                        Siparişi Tamamla
                    </button>
                </div>
            )}

        </div>
    );
}

export default CartPage;