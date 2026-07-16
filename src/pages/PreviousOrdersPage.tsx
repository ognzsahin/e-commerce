import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { fetchOrders } from "../redux/actions/orderActions";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PreviousOrdersPage {
    id: number;
    name: string;
    description: string;
    price: number;
    count: number;
    images: { url: string; index: number }[];
}

interface Order {
    id: number;
    order_date: string;
    price: number;
    products: OrderProduct[];
}

function PreviousOrdersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    useEffect(() => {
        async function loadOrders() {
            setIsLoading(true);
            const result = await dispatch(fetchOrders());
            if (result.success) {
                setOrders(result.data);
            }
            setIsLoading(false);
        }

        loadOrders();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-[100px]">
                <span className="w-8 h-8 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto px-[16px] py-[40px] flex flex-col gap-4">
            <h1 className="text-xl font-bold text-[#252B42]">Önceki Siparişlerim</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">Henüz bir siparişiniz yok.</p>
            ) : (
                orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">

                            <button
                                type="button"
                                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="font-medium text-[#252B42]">Sipariş #{order.id}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(order.order_date).toLocaleDateString("tr-TR")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[#252B42]">${order.price.toFixed(2)}</span>
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="p-4 flex flex-col gap-3">
                                    {order.products.map((product) => (
                                        <div key={product.id} className="flex items-center gap-4">
                                            <img
                                                src={product.images?.[0]?.url}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-[#252B42]">{product.name}</p>
                                                <p className="text-sm text-gray-500">Adet: {product.count}</p>
                                            </div>
                                            <span className="text-sm font-bold text-[#252B42]">
                                                ${(product.price * product.count).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default PreviousOrdersPage;