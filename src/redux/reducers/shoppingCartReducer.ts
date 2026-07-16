import { SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, UPDATE_CART_ITEM_COUNT, REMOVE_FROM_CART }
    from "../actions/cartActions";


interface ShoppingCartState {
    cart: Record<string, unknown>[];
    payment: Record<string, unknown>;
    address: Record<string, unknown>;
}

const initialState: ShoppingCartState = {
    cart: [],
    payment: {},
    address: {},
};

interface ShoppingCartAction {
    type: string;
    payload?: unknown;
}

function shoppingCartReducer(state = initialState, action: ShoppingCartAction): ShoppingCartState {
    switch (action.type) {
        case SET_CART:
            return { ...state, cart: action.payload as Record<string, unknown>[] };

        case SET_PAYMENT:
            return { ...state, payment: action.payload as Record<string, unknown> };

        case SET_ADDRESS:
            return { ...state, address: action.payload as Record<string, unknown> };

        case ADD_TO_CART: {
            const { product, quantity } = action.payload as { product: Record<string, unknown>; quantity: number };
            const existingItem = state.cart.find(
                (item) => (item.product as Record<string, unknown>).id === product.id
            );

            if (existingItem) {
                const updatedCart = state.cart.map((item) =>
                    (item.product as Record<string, unknown>).id === product.id
                        ? { ...item, count: quantity }
                        : item
                );
                return { ...state, cart: updatedCart };
            }

            return {
                ...state,
                cart: [...state.cart, { count: quantity, checked: true, product }],
            };
        };

            case UPDATE_CART_ITEM_COUNT: {
                const { productId, count } = action.payload as { productId: number; count: number };
                const updatedCart = state.cart.map((item) =>    //Sepeti dön doğru ürünü bul.
                    (item.product as Record<string, unknown>).id === productId
                        ? { ...item, count: Math.max(1, count) }
                        : item
                );
                return { ...state, cart: updatedCart };
            }

            case REMOVE_FROM_CART: {
                const productId = action.payload as number;
                const filteredCart = state.cart.filter(
                    (item) => (item.product as Record<string, unknown>).id !== productId
                );  //ID'si eşleşmeyen ürünler kalsın.
                return { ...state, cart: filteredCart };
            };


        default:
            return state;
    }
}

export default shoppingCartReducer;
export type { ShoppingCartState };