import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>();

    function onSubmit(data: ContactFormData) {
        console.log("İletişim formu:", data);
        setIsSubmitted(true);
        reset();
    }

    return (
        <div className="max-w-[1200px] mx-auto px-[16px] py-[60px] flex flex-col lg:flex-row gap-[48px]">

            {/* Sol taraf — iletişim bilgileri */}
            <div className="flex-1 flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-[#252B42]">Bize Ulaşın</h1>
                <p className="text-[#737373]">
                    Sorularınız için aşağıdaki formu doldurabilir ya da bize doğrudan ulaşabilirsiniz.
                </p>

                <div className="flex items-center gap-3 text-[#252B42]">
                    <Phone size={20} className="text-[#23A6F0]" />
                    <span>+90 (501) 000-1907</span>
                </div>

                <div className="flex items-center gap-3 text-[#252B42]">
                    <Mail size={20} className="text-[#23A6F0]" />
                    <span>fenerbahce@gmail.com</span>
                </div>

                <div className="flex items-center gap-3 text-[#252B42]">
                    <MapPin size={20} className="text-[#23A6F0]" />
                    <span>İstanbul, Türkiye</span>
                </div>
            </div>

            {/* Sağ taraf — form */}
            <div className="flex-1">
                {isSubmitted ? (
                    <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg p-6 text-center">
                        Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağız.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#252B42]">Ad Soyad</label>
                            <input
                                type="text"
                                {...register("name", { required: "İsim zorunludur" })}
                                className="border border-gray-300 rounded px-4 py-2"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#252B42]">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email zorunludur",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçerli bir email girin" },
                                })}
                                className="border border-gray-300 rounded px-4 py-2"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#252B42]">Mesajınız</label>
                            <textarea
                                rows={5}
                                {...register("message", { required: "Mesaj zorunludur" })}
                                className="border border-gray-300 rounded px-4 py-2 resize-none"
                            />
                            {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="bg-[#23A6F0] text-white font-semibold rounded px-6 py-3 hover:bg-[#1f92d8] transition-colors w-fit"
                        >
                            Gönder
                        </button>

                    </form>
                )}
            </div>

        </div>
    );
}

export default ContactPage;