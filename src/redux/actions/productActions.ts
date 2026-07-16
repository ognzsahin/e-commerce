import axiosInstance from "../../services/axiosInstance";
import type { AppDispatch } from "../store";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";

export type FetchState = "NOT_FETCHED" | "FETCHING" | "FETCHED" | "FAILED";

export function setCategories(categories: Record<string, unknown>[]) {
    return { type: SET_CATEGORIES, payload: categories };
}

export function setProductList(productList: Record<string, unknown>[]) {
    return { type: SET_PRODUCT_LIST, payload: productList };
}

export function setTotal(total: number) {
    return { type: SET_TOTAL, payload: total };
}

export function setFetchState(fetchState: FetchState) {
    return { type: SET_FETCH_STATE, payload: fetchState };
}

export function setLimit(limit: number) {
    return { type: SET_LIMIT, payload: limit };
}

export function setOffset(offset: number) {
    return { type: SET_OFFSET, payload: offset };
}

export function setFilter(filter: string) {
    return { type: SET_FILTER, payload: filter };
}

export function fetchProducts(params?: { category?: number; sort?: string; filter?: string; limit?: number; offset?: number }) {
    return async function (dispatch: AppDispatch) {
        dispatch(setFetchState("FETCHING"));
        try {
            const queryParams = new URLSearchParams();
            if (params?.category) queryParams.append("category", String(params.category));
            if (params?.sort) queryParams.append("sort", params.sort);
            if (params?.filter) queryParams.append("filter", params.filter);
            queryParams.append("limit", String(params?.limit ?? 25));
            queryParams.append("offset", String(params?.offset ?? 0));

            const queryString = queryParams.toString();
            const url = `/products?${queryString}`;

            const response = await axiosInstance.get(url);
            dispatch(setProductList(response.data.products));
            dispatch(setTotal(response.data.total));
            dispatch(setFetchState("FETCHED"));
        } catch (error) {
            console.error("Ürünler alınırken hata oluştu:", error);
            dispatch(setFetchState("FAILED"));
        }
    };
}