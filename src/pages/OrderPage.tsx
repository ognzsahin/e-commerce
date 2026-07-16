import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchAddresses, addAddress } from "../redux/actions/addressActions";
import { fetchCards, addCard } from "../redux/actions/cardActions";
import { useForm } from "react-hook-form";
import { completeOrder } from "../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

interface AddressFormData {
    title: string;
    name: string;
    surname: string;
    phone: string;
    city: string;
    district: string;
    neighborhood: string;
}




interface CardFormData {
    card_no: string;
    expire_month: number;
    expire_year: number;
    name_on_card: string;
    ccv: number;
}




function OrderPage() {
    const dispatch = useDispatch<AppDispatch>();
    const addressList = useSelector((state: RootState) => state.client.addressList);
    const cart = useSelector((state: RootState) => state.shoppingCart.cart);

    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    const [step, setStep] = useState<1 | 2>(1);
    const creditCards = useSelector((state: RootState) => state.client.creditCards);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [cvvInput, setCvvInput] = useState("");

    const navigate = useNavigate();
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (step === 2) {
            dispatch(fetchCards());
        }
    }, [step, dispatch]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressFormData>();

    const {
        register: registerCard,
        handleSubmit: handleSubmitCard,
        reset: resetCard,
        formState: { errors: cardErrors },
    } = useForm<CardFormData>();

    async function onSubmit(data: AddressFormData) {
        const result = await dispatch(addAddress(data));
        if (result.success) {
            reset();
            setShowAddForm(false);
        }
    }

    async function onSubmitCard(data: CardFormData) {
        const { ccv, ...cardData } = data; //ccv backend'e gönderilmiyor, sadece sipariş tamamlarken kullanılacak!
        const result = await dispatch(addCard(cardData));
        if (result.success) {
            resetCard();
            setShowAddCardForm(false);
        }
    }


    const productsTotal = cart.reduce((sum, item) => {
        const product = item.product as Record<string, unknown>;
        return sum + (product.price as number) * (item.count as number);
    }, 0);

    const shippingCost = productsTotal > 150 ? 0 : 29.99;
    const discount = productsTotal > 150 ? 29.99 : 0;
    const grandTotal = productsTotal + shippingCost - discount;

    if (orderSuccess) {
        return (
            <div className="max-w-[600px] mx-auto px-[16px] py-[100px] text-center flex flex-col items-center gap-4">
                <span className="text-5xl">🎉</span>
                <h1 className="text-2xl font-bold text-[#252B42]">Siparişiniz Alındı!</h1>
                <p className="text-gray-500">Teşekkür ederiz, siparişiniz başarıyla oluşturuldu.</p>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3 hover:bg-[#1f92d8] transition-colors mt-4"
                >
                    Anasayfaya Dön
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-[16px] py-[40px] flex flex-col lg:flex-row gap-[32px]">

            {/* Sol taraf — adresler / kartlar */}
            <div className="flex-1 flex flex-col gap-4">
                {step === 1 ? (
                    <>
                        <h1 className="text-xl font-bold text-[#252B42]">Teslimat Adresi</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Yeni Adres Ekle kartı */}
                            <button
                                type="button"
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#23A6F0] hover:text-[#23A6F0] transition-colors"
                            >
                                <span className="text-2xl">+</span>
                                <span className="text-sm font-medium">Yeni Adres Ekle</span>
                            </button>

                            {/* Kayıtlı adresler */}
                            {addressList.map((addr) => {
                                const address = addr as Record<string, unknown>;
                                return (
                                    <button
                                        key={address.id as number}
                                        type="button"
                                        onClick={() => setSelectedAddressId(address.id as number)}
                                        className={`text-left border rounded-lg p-4
                                            ${selectedAddressId === address.id
                                                ? "border-[#23A6F0] bg-blue-50"
                                                : "border-gray-200"}`}
                                    >
                                        <p className="font-medium text-[#252B42]">{address.title as string}</p>
                                        <p className="text-sm text-gray-500">{address.name as string} {address.surname as string}</p>
                                        <p className="text-sm text-gray-500">{address.phone as string}</p>
                                        <p className="text-sm text-gray-500">{address.district as string} / {address.city as string}</p>
                                    </button>
                                );
                            })}
                        </div>


                        {/* Yeni adres formu */}
                        {showAddForm && (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4 mt-2">

                                <input
                                    placeholder="Adres Başlığı"
                                    {...register("title", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />
                                {errors.title && <span className="text-red-500 text-sm">Zorunlu alan</span>}

                                <input
                                    placeholder="Ad"
                                    {...register("name", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <input
                                    placeholder="Soyad"
                                    {...register("surname", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <input
                                    type = "number"
                                    placeholder="Telefon"
                                    {...register("phone", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />
                                {errors.phone && <span className="text-red-500 text-sm">Telefon alanı zorunlu</span>}

                                <input
                                    placeholder="İl"
                                    {...register("city", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <input
                                    placeholder="İlçe"
                                    {...register("district", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <input
                                    placeholder="Mahalle / Adres Detayı"
                                    {...register("neighborhood", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <button
                                    type="submit"
                                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-2 hover:bg-[#1f92d8] transition-colors"
                                >
                                    Kaydet
                                </button>
                            </form>
                        )}
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-bold text-[#252B42]">Kart Bilgileri</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <button
                                type="button"
                                onClick={() => setShowAddCardForm(!showAddCardForm)}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#23A6F0] hover:text-[#23A6F0] transition-colors"
                            >
                                <span className="text-2xl">+</span>
                                <span className="text-sm font-medium">Yeni Kart Ekle</span>
                            </button>

                            {creditCards.map((c) => {
                                const card = c as Record<string, unknown>;
                                const cardNo = card.card_no as string;
                                return (
                                    <button
                                        key={card.id as number}
                                        type="button"
                                        onClick={() => setSelectedCardId(card.id as number)}
                                        className={`text-left border rounded-lg p-4
                                            ${selectedCardId === card.id
                                                ? "border-[#23A6F0] bg-blue-50"
                                                : "border-gray-200"}`}
                                    >
                                        <p className="font-medium text-[#252B42]">{card.name_on_card as string}</p>
                                        <p className="text-sm text-gray-500">
                                            •••• •••• •••• {cardNo.slice(-4)}
                                        </p>
                                        <p className="text-sm text-gray-500">{card.expire_month as number}/{card.expire_year as number}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedCardId && (
                            <div className="flex flex-col gap-2 mt-2 max-w-[200px]">
                                <label className="text-sm font-medium">CVV</label>
                                <input
                                    type="text"
                                    maxLength={3}
                                    value={cvvInput}
                                    onChange={(e) => setCvvInput(e.target.value)}
                                    placeholder="123"
                                    className="border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                        )}


                        {showAddCardForm && (
                            <form onSubmit={handleSubmitCard(onSubmitCard)} className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4 mt-2">

                                <input
                                    placeholder="Kart Numarası"
                                    {...registerCard("card_no", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />
                                {cardErrors.card_no && <span className="text-red-500 text-sm">Zorunlu alan</span>}

                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        placeholder="Ay"
                                        {...registerCard("expire_month", { required: true, valueAsNumber: true })}
                                        className="border border-gray-300 rounded px-4 py-2 w-1/2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Yıl"
                                        {...registerCard("expire_year", { required: true, valueAsNumber: true })}
                                        className="border border-gray-300 rounded px-4 py-2 w-1/2"
                                    />
                                </div>

                                <input
                                    placeholder="Kart Üzerindeki İsim"
                                    {...registerCard("name_on_card", { required: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />

                                <input
                                    type="number"
                                    placeholder="CVV"
                                    maxLength={3}
                                    {...registerCard("ccv", { required: true, valueAsNumber: true })}
                                    className="border border-gray-300 rounded px-4 py-2"
                                />
                                {cardErrors.ccv && <span className="text-red-500 text-sm">Zorunlu alan</span>}

                                <button
                                    type="submit"
                                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-2 hover:bg-[#1f92d8] transition-colors"
                                >
                                    Kaydet
                                </button>
                            </form>
                        )}
                    </>
                )}

            </div>

            {/* Sağ taraf — Order Summary */}
            <div className="w-full lg:w-[320px] border border-gray-200 rounded-lg p-6 h-fit flex flex-col gap-4">
                <h2 className="font-bold text-[#252B42]">Sipariş Özeti</h2>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Ürünlerin Toplamı</span>
                    <span>${productsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Kargo Toplam</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span>150 TL ve Üzeri Kargo Bedava</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between font-bold text-[#252B42] border-t pt-3">
                    <span>Toplam</span>
                    <span>${grandTotal.toFixed(2)}</span>
                </div>

                <button
                    type="button"
                    disabled={step === 1 ? !selectedAddressId : !selectedCardId}
                    onClick={async () => {
                        if (step === 1) {
                            setStep(2);
                        } else {
                            console.log("Ödeme Yap tıklandı", { selectedAddressId, selectedCardId, cvvInput });

                            const selectedCard = creditCards.find(
                                (c) => (c as Record<string, unknown>).id === selectedCardId
                            ) as Record<string, unknown>;

                            const products = cart.map((item) => {
                                const product = item.product as Record<string, unknown>;
                                return {
                                    product_id: product.id as number,
                                    count: item.count as number,
                                    detail: "standart",
                                };
                            });

                            const result = await dispatch(completeOrder({
                                address_id: selectedAddressId as number,
                                order_date: new Date().toISOString(),
                                card_no: Number(selectedCard.card_no),
                                card_name: selectedCard.name_on_card as string,
                                card_expire_month: selectedCard.expire_month as number,
                                card_expire_year: selectedCard.expire_year as number,
                                card_ccv: Number(cvvInput),
                                price: grandTotal,
                                products,
                            }));

                            if (result.success) {
                                setOrderSuccess(true);
                            }
                        }
                    }}
                    className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3 hover:bg-[#1f92d8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {step === 1 ? "Kaydet ve Devam Et" : "Ödeme Yap"}
                </button>
            </div>

        </div>
    );
}

export default OrderPage;