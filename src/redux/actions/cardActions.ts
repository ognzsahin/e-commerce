import axiosInstance from "../../services/axiosInstance";
import type { AppDispatch } from "../store";
import { setCreditCards } from "./clientActions";

export function fetchCards() {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.get("/user/card");
            dispatch(setCreditCards(response.data));
        } catch (error) {
            console.error("Kartlar alınırken hata oluştu:", error);
        }
    };
}

export function addCard(cardData: Record<string, unknown>) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.post("/user/card", cardData);
            dispatch(fetchCards());
            return { success: true };
        } catch (error) {
            console.error("Kart eklenirken hata oluştu:", error);
            return { success: false };
        }
    };
}

export function deleteCard(cardId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            await axiosInstance.delete(`/user/card/${cardId}`);
            dispatch(fetchCards());
            return { success: true };
        } catch (error) {
            console.error("Kart silinirken hata oluştu:", error);
            return { success: false };
        }
    };
}