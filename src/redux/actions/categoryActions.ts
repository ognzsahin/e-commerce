import axiosInstance from "../../services/axiosInstance";
import type { AppDispatch } from "../store";
import { setCategories } from "./productActions";

export function fetchCategories() {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.get("/categories");
            dispatch(setCategories(response.data));
        } catch (error) {
            console.error("Kategoriler alınırken hata oluştu:", error);
        }
    };
}