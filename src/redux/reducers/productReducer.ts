import {
    SET_CATEGORIES,
    SET_PRODUCT_LIST,
    SET_TOTAL,
    SET_FETCH_STATE,
    SET_LIMIT,
    SET_OFFSET,
    SET_FILTER,
    type FetchState,
} from "../actions/productActions";

interface ProductState {
    categories: Record<string, unknown>[];
    productList: Record<string, unknown>[];
    total: number;
    limit: number;
    offset: number;
    filter: string;
    fetchState: FetchState;
}

const initialState: ProductState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: "",
    fetchState: "NOT_FETCHED",
};

interface ProductAction {
    type: string;
    payload?: unknown;
}

function productReducer(state = initialState, action: ProductAction): ProductState {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload as Record<string, unknown>[] };

        case SET_PRODUCT_LIST:
            return { ...state, productList: action.payload as Record<string, unknown>[] };

        case SET_TOTAL:
            return { ...state, total: action.payload as number };

        case SET_FETCH_STATE:
            return { ...state, fetchState: action.payload as FetchState };

        case SET_LIMIT:
            return { ...state, limit: action.payload as number };

        case SET_OFFSET:
            return { ...state, offset: action.payload as number };

        case SET_FILTER:
            return { ...state, filter: action.payload as string };

        default:
            return state;
    }
}

export default productReducer;
export type { ProductState };