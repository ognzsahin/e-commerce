import axiosInstance from "../../services/axiosInstance"; //otomatik eklenen baseURL.
import type { AppDispatch } from "../store";
import { setAddressList } from "./clientActions";

export function fetchAddresses() {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.get("/user/address");
            dispatch(setAddressList(response.data));
        } catch (error) {
            console.error("Adresler alınırken hata oluştu:", error);
        }
    };
}

export function addAddress(addressData: Record<string, unknown>) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.post("/user/address", addressData);
            dispatch(fetchAddresses()); //ekledikten sonra listeyi günceller.
            return { success: true };
        } catch (error) {
            console.error("Adres eklenirken hata oluştu:", error);
            return { success: false };
        }
    };
}

export function updateAddress(addressData: Record<string, unknown>) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.put("/user/address", addressData);
            dispatch(fetchAddresses());
            return { success: true };
        } catch (error) {
            console.error("Adres güncellenirken hata oluştu:", error);
            return { success: false };
        }
    };
}

export function deleteAddress(addressId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.delete(`/user/address/${addressId}`);
            dispatch(fetchAddresses());
            return { success: true };
        } catch (error) {
            console.error("Adres silinirken hata oluştu:", error);
            return { success: false };
        }
    };
}