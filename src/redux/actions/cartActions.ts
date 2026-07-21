export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const ADD_TO_CART = "ADD_TO_CART";

export const UPDATE_CART_ITEM_COUNT = "UPDATE_CART_ITEM_COUNT";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const TOGGLE_CART_ITEM_CHECKED = "TOGGLE_CART_ITEM_CHECKED";


export function setCart(cart: Record<string, unknown>[]) {
    return { type: SET_CART, payload: cart };
}

export function setPayment(payment: Record<string, unknown>) {
    return { type: SET_PAYMENT, payload: payment };
}

export function setAddress(address: Record<string, unknown>) {
    return { type: SET_ADDRESS, payload: address };
}

export function addToCart(product: Record<string, unknown>, quantity: number) {
    return {
        type: ADD_TO_CART,
        payload: { product, quantity },
    };
}

export function updateCartItemCount(productId: number, count: number) {
    return {
        type: UPDATE_CART_ITEM_COUNT,
        payload: { productId, count },
    };
}

export function removeFromCart(productId: number) {
    return {
        type: REMOVE_FROM_CART,
        payload: productId,
    };
}

export function toggleCartItemChecked(productId: number) {
    return {
        type: TOGGLE_CART_ITEM_CHECKED,
        payload: productId,
    };
}