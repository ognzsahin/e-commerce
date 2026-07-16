import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_AUTH_CHECKED, SET_ADDRESS_LIST, SET_CREDIT_CARDS } from "../actions/clientActions";

interface ClientState {
    user: Record<string, unknown> | null;
    addressList: Record<string, unknown>[];
    creditCards: Record<string, unknown>[];
    roles: Record<string, unknown>[];
    theme: string;
    language: string;
    isAuthChecked: boolean;
}

const initialState: ClientState = {
    user: null,
    addressList: [],
    creditCards: [],
    roles: [],
    theme: "light",
    language: "tr",
    isAuthChecked: false,
};

interface ClientAction {
    type: string;
    payload?: unknown;
}



function clientReducer(state = initialState, action: ClientAction): ClientState {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload as Record<string, unknown> };

        case SET_ROLES:
            return { ...state, roles: action.payload as Record<string, unknown>[] };

        case SET_THEME:
            return { ...state, theme: action.payload as string };

        case SET_LANGUAGE:
            return { ...state, language: action.payload as string };

        case SET_AUTH_CHECKED:
            return { ...state, isAuthChecked: action.payload as boolean };

        case SET_ADDRESS_LIST:
            return { ...state, addressList: action.payload as Record<string, unknown>[] };

        case SET_CREDIT_CARDS:
            return { ...state, creditCards: action.payload as Record<string, unknown>[] };

        default:
            return state;
    }
}

export default clientReducer;
export type { ClientState };