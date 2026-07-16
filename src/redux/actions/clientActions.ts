export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_ADDRESS_LIST = "SET_ADDRESS_LIST";
export const SET_CREDIT_CARDS = "SET_CREDIT_CARDS";


export function setUser(user: Record<string, unknown> | null) {
    return {
        type: SET_USER,
        payload: user,
    };
}

export function setRoles(roles: Record<string, unknown>[]) {
    return {
        type: SET_ROLES,
        payload: roles,
    };
}

export function setTheme(theme: string) {
    return {
        type: SET_THEME,
        payload: theme,
    };
}

export function setLanguage(language: string) {
    return {
        type: SET_LANGUAGE,
        payload: language,
    };
}

export function setAuthChecked(value: boolean) {
    return {
        type: SET_AUTH_CHECKED,
        payload: value,
    };
}

export function setAddressList(addressList: Record<string, unknown>[]) {
    return {
        type: SET_ADDRESS_LIST,
        payload: addressList,
    };
}

export function setCreditCards(cards: Record<string, unknown>[]) {
    return {
        type: SET_CREDIT_CARDS,
        payload: cards,
    };
}




import axiosInstance from "../../services/axiosInstance"; // baseURL otomatik eklenir, sadece /roles yazacağız
import type { AppDispatch } from "../store";
import axios from "axios";

export function fetchRoles() {

    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.get("/roles");
            dispatch(setRoles(response.data));
        } catch (error) {
            console.error("Roller alınırken hata oluştu:", error);
        }
    };

    //API’den “roles” listesini çeker, başarılı olursa setRoles action’unu dispatch eder.
    //Amacımız : async veri çekme ve sonucu Redux store’a aktarma.
    // Redux action’ları plain object’tir, async işlem yapamazlar.
    // Bunun için Thunk kullanılır.
    // Thunk sayesinde action creator bir fonksiyon döndürebilir.
    // Bu fonksiyon async işlemi yapar, sonuç geldiğinde plain object action dispatch eder.
}



export function signupUser(formData: Record<string, unknown>) {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.post("/signup", formData);
            return { success: true, message: response.data.message as string };
        } catch (error) {
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data?.error
                    ? (error.response.data.error as string)
                    : "Kayıt sırasında bir hata oluştu.";
            return { success: false, message: errorMessage };
        }
    };
}



export function loginUser(credentials: { email: string; password: string; rememberMe?: boolean }) {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axiosInstance.post("/login", {
                email: credentials.email,
                password: credentials.password,
            });

            const { token, name, email, role_id } = response.data;

            dispatch(setUser({ name, email, role_id }));

            if (credentials.rememberMe) {
                localStorage.setItem("token", token);
            }

            axiosInstance.defaults.headers.common["Authorization"] = token;

            return { success: true };
        } catch (error) {
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data?.message
                    ? (error.response.data.message as string)
                    : "Giriş sırasında bir hata oluştu.";
            return { success: false, message: errorMessage };
        }
    };
}


export function verifyToken() {  //Kullanıcı her sayfa yenilendiğinde login olmaması için.
    return async function (dispatch: AppDispatch) {
        const token = localStorage.getItem("token");  //Tarayıcıdaki localStorage’tan token’ı alıyor. < - > Kullanıcı daha önce login olduysa token burada saklanmış olur.

        if (!token) {
                dispatch(setAuthChecked(true));
            return; // token yoksa hiçbir şey yapma
        }

        axiosInstance.defaults.headers.common["Authorization"] = token;

        try {
            const response = await axiosInstance.get("/verify");  //Backend’e /verify isteği atıyor. < - > Token geçerli mi, kullanıcı bilgileri doğru mu kontrol ediyor.
            const { name, email, role_id, token: newToken } = response.data;  //Backend’den dönen kullanıcı bilgilerini ve yenilenmiş token’ı alıyor.

            dispatch(setUser({ name, email, role_id }));  //Redux store’a kullanıcı bilgilerini kaydediyor. < - > UI’da kullanıcı adı, rol gibi bilgiler kullanılabilsin diye.

            localStorage.setItem("token", newToken);
            axiosInstance.defaults.headers.common["Authorization"] = newToken;
        } catch {  //Eğer /verify isteği hata verirse token siliniyor.
            localStorage.removeItem("token");
            delete axiosInstance.defaults.headers.common["Authorization"];
        } finally {
            dispatch(setAuthChecked(true));
        }
    };
}


