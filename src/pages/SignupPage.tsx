import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchRoles, signupUser } from "../redux/actions/clientActions";

import AvatarPicker from "../components/common/AvatarPicker";
import Avatar from "../components/common/Avatar";
import type { AvatarConfig } from "../components/common/Avatar";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    passwordAgain: string;
    role_id: number;
    store?: {           //store seçilirse açılacak.
        name: string;
        phone: string;
        tax_no: string;
        bank_account: string;
    };
}

type FieldName =
    | "name" | "email" | "password" | "passwordAgain" | "role" | "avatar"
    | "storeName" | "storePhone" | "storeTaxNo" | "storeBankAccount";

function SignupPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const roles = useSelector((state: RootState) => state.client.roles);
    const [focusedField, setFocusedField] = useState<FieldName | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({ bgColor: "#23A6F0", icon: "User" });

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>({
        defaultValues: {
            role_id: 3,
        },
    });

    async function onSubmit(data: SignupFormData) {
        setIsSubmitting(true);
        setSubmitError(null);

        const { passwordAgain, ...signupData } = data;

        const result = await dispatch(signupUser(signupData));

        setIsSubmitting(false);

        if (result.success) {
            localStorage.setItem(`avatar_${data.email.trim().toLowerCase()}`, JSON.stringify(avatarConfig));
            navigate(-1);
            alert(result.message);
        } else {
            setSubmitError(result.message);
        }
    }

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


    const selectedRoleId = watch("role_id");
    const isStoreSelected = roles.some(
        (role) => (role.id as number) === selectedRoleId && (role.code as string) === "store"
    );


    return (
        <div    className="relative flex flex-col items-center py-[60px] px-[16px]"
                onClick={() => setFocusedField(null)}
        >

            <h2 className={titleClasses}>Sign Up</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 flex flex-col gap-[20px] w-full max-w-[400px]"
            >
                {/* Name */}
                <div className={getFieldClasses("name")}>
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}

                        {...register("name", {
                            required: "İsim zorunludur",
                            minLength: { value: 3, message: "En az 3 karakter olmalı" },
                            onChange: () => setFocusedField(null),
                        })}
                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className={getFieldClasses("email")}>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}

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
                        onBlur={() => setFocusedField(null)}

                        {...register("password", {
                            required: "Şifre zorunludur",
                            minLength: { value: 8, message: "En az 8 karakter olmalı" },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                                message: "Büyük/küçük harf, rakam ve özel karakter içermeli",
                            },
                            onChange: () => setFocusedField(null),
                        })}
                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                {/* Password Again */}
                <div className={getFieldClasses("passwordAgain")}>
                    <label className="text-sm font-medium">Password//</label>
                    <input
                        type="password"
                        onFocus={() => setFocusedField("passwordAgain")}
                        onBlur={() => setFocusedField(null)}

                        {...register("passwordAgain", {
                            required: "Şifre tekrarı zorunludur",
                            validate: (value) =>
                                value === watch("password") || "Şifreler eşleşmiyor",
                            onChange: () => setFocusedField(null),
                        })}

                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    />
                    {errors.passwordAgain && <span className="text-red-500 text-sm">{errors.passwordAgain.message}</span>}
                </div>

                {/* Role */}
                <div className={getFieldClasses("role")}>
                    <label className="text-sm font-medium">Role</label>
                    <select
                        onFocus={() => setFocusedField("role")}
                        onBlur={() => setFocusedField(null)}

                        defaultValue={3}
                        {...register("role_id", {
                            valueAsNumber: true,
                            onChange: () => setFocusedField(null),
                        })}

                        className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                    >
                        {roles.map((role) => (
                            <option key={role.id as number} value={role.id as number}>
                                {role.name as string}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Avatar seçimi */}
                <div className={getFieldClasses("avatar" as FieldName)}>
                    <label className="text-sm font-medium">Profil Simgesi</label>
                    <div className="flex items-center gap-4 mt-[6px]">
                        <Avatar config={avatarConfig} email={watch("email") || ""} size={48} />
                        <AvatarPicker value={avatarConfig} onChange={setAvatarConfig} />
                    </div>
                </div>

                {isStoreSelected && (
                    <>
                        {/* Store Name */}
                        <div className={getFieldClasses("storeName")}>
                            <label className="text-sm font-medium">Store Name</label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField("storeName")}
                                onBlur={() => setFocusedField(null)}

                                {...register("store.name", {
                                    required: isStoreSelected ? "Mağaza adı zorunludur" : false,
                                    minLength: { value: 3, message: "En az 3 karakter olmalı" },
                                    onChange: () => setFocusedField(null),
                                })}
                                className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                            />
                            {errors.store?.name && <span className="text-red-500 text-sm">{errors.store.name.message}</span>}
                        </div>

                        {/* Store Phone */}
                        <div className={getFieldClasses("storePhone")}>
                            <label className="text-sm font-medium">Store Phone</label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField("storePhone")}
                                onBlur={() => setFocusedField(null)}

                                {...register("store.phone", {
                                    required: isStoreSelected ? "Telefon zorunludur" : false,
                                    pattern: {
                                        value: /^(\+90|0)?5\d{9}$/,
                                        message: "Geçerli bir Türkiye telefon numarası girin",
                                    },
                                    onChange: () => setFocusedField(null),
                                })}
                                placeholder="05XXXXXXXXX"
                                className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                            />
                            {errors.store?.phone && <span className="text-red-500 text-sm">{errors.store.phone.message}</span>}
                        </div>

                        {/* Store Tax ID */}
                        <div className={getFieldClasses("storeTaxNo")}>
                            <label className="text-sm font-medium">Store Tax ID</label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField("storeTaxNo")}
                                onBlur={() => setFocusedField(null)}

                                {...register("store.tax_no", {
                                    required: isStoreSelected ? "Vergi no zorunludur" : false,
                                    pattern: {
                                        value: /^T\d{4}V\d{6}$/,
                                        message: 'Format "TXXXXVXXXXXX" şeklinde olmalı',
                                    },
                                    onChange: () => setFocusedField(null),
                                })}
                                placeholder="TXXXXVXXXXXX"
                                className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                            />
                            {errors.store?.tax_no && <span className="text-red-500 text-sm">{errors.store.tax_no.message}</span>}
                        </div>

                        {/* Store Bank Account */}
                        <div className={getFieldClasses("storeBankAccount")}>
                            <label className="text-sm font-medium">Store Bank Account (IBAN)</label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField("storeBankAccount")}
                                onBlur={() => setFocusedField(null)}

                                {...register("store.bank_account", {
                                    required: isStoreSelected ? "IBAN zorunludur" : false,
                                    pattern: {
                                        value: /^TR\d{24}$/,
                                        message: "Geçerli bir IBAN girin (TR ile başlamalı, 26 karakter)",
                                    },
                                        onChange: () => setFocusedField(null),

                                })}
                                placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
                                className="border border-gray-300 rounded px-4 py-2 w-full mt-[6px]"
                            />
                            {errors.store?.bank_account && <span className="text-red-500 text-sm">{errors.store.bank_account.message}</span>}
                        </div>
                    </>
                )}

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
                            Gönderiliyor...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </button>

            </form>
        </div>
    );
}

export default SignupPage;