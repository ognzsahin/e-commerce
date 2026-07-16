import axiosInstance from "../../services/axiosInstance";
import type { AppDispatch } from "../store";
import { setCart } from "./cartActions";

interface OrderProduct {
    product_id: number;
    count: number;
    detail: string;
}

interface OrderPayload {
    address_id: number;
    order_date: string;
    card_no: number;
    card_name: string;
    card_expire_month: number;
    card_expire_year: number;
    card_ccv: number;
    price: number;
    products: OrderProduct[];
}

export function completeOrder(payload: OrderPayload) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.post("/order", payload);
            dispatch(setCart([])); // sipariş tamamlanınca sepeti sıfırlar.
            return { success: true };
        } catch (error) {
            console.error("Sipariş oluşturulurken hata oluştu:", error);
            return { success: false };
        }
    };
}

export function fetchOrders() {     //listeleme fonksiyonu.
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.get("/order");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Siparişler alınırken hata oluştu:", error);
            return { success: false, data: [] };
        }
    };
}