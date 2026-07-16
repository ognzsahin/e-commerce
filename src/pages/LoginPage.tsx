import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { loginUser } from "../redux/actions/clientActions";


interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

type FieldName = "email" | "password";

function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const [focusedField, setFocusedField] = useState<FieldName | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    function getFieldClasses(field: FieldName) {
        const isFocused = focusedField === field;
        const isAnyFocused = focusedField !== null;

        if (isFocused) {
            return "relative z-30 scale-105 bg-white shadow-xl rounded p-3 -m-1 transition-all duration-300";
        }
        if (isAnyFocused) {
            return "relative z-0 scale-95 opacity-40 blur-[1px] rounded p-3 -m-1 transition-all duration-300";
        }
        return "relative z-0 scale-100 opacity-100 rounded p-3 -m-1 transition-all duration-300";
    }

    const titleClasses = focusedField
        ? "relative z-0 scale-95 opacity-40 blur-[1px] transition-all duration-300 text-[24px] font-bold mb-[32px]"
        : "relative z-0 transition-all duration-300 text-[24px] font-bold mb-[32px]";

    async function onSubmit(data: LoginFormData) {
        setIsSubmitting(true);
        setSubmitError(null);

        const result = await dispatch(loginUser(data));

        setIsSubmitting(false);

        if (result.success) {
            const from = (location.state as { from?: string })?.from || "/";
            navigate(from, { replace: true });
        } else {
            setSubmitError(result.message);
        }
    }

    return (
        <div
            className="relative flex flex-col items-center py-[60px] px-[16px]"
            onClick={() => setFocusedField(null)}
        >
            <h2 className={titleClasses}>Login</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 flex flex-col gap-[20px] w-full max-w-[400px]"
            >

                {/* Email */}
                <div className={getFieldClasses("email")}>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        onFocus={() => setFocusedField("email")}
                        {...register("email", {
                            required: "Email zorunludur",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçerli bir email girin" },
                            onChange: () => setFocusedField(null),
                        })}
                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className={getFieldClasses("password")}>
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        onFocus={() => setFocusedField("password")}
                        {...register("password", { required: "Şifre zorunludur", onChange: () => setFocusedField(null) })}
                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                {/* Remember Me */}
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" {...register("rememberMe")} />
                    Beni hatırla
                </label>

                {submitError && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded px-4 py-3">
                        {submitError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3
                                    hover:bg-[#1f92d8] transition-colors
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                            flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Giriş yapılıyor...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

            </form>
        </div>
    );
}

export default LoginPage;



