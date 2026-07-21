import { Truck, ShieldCheck, Heart } from "lucide-react";

function AboutPage() {
    return (
        <div className="max-w-[1000px] mx-auto px-[16px] py-[60px] flex flex-col gap-[64px]">

            {/* Hikaye Kısmı */}
            <div className="flex flex-col items-center text-center gap-4">
                <h1 className="text-2xl font-bold text-[#252B42]">Hakkımızda</h1>
                <p className="text-[#737373] max-w-[650px] leading-7">
                    Tanrıkut, 2020 yılında küçük bir ekiple kurulan, kaliteli ve uygun fiyatlı ürünleri
                    herkesle buluşturma vizyonuyla yola çıkan bir e-ticaret platformudur. Amacımız,
                    alışverişi kolay, güvenli ve keyifli bir deneyime dönüştürmek. Bugün binlerce
                    müşteriye hizmet veriyor, her geçen gün büyüyen bir aile olmanın gururunu yaşıyoruz.
                </p>
            </div>

            {/* DEğerler Kısmı */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Truck size={28} className="text-[#23A6F0]" />
                    </div>
                    <h3 className="font-bold text-[#252B42]">Hızlı Teslimat</h3>
                    <p className="text-sm text-[#737373]">
                        Siparişleriniz özenle paketlenir ve en kısa sürede kapınıza ulaştırılır.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <ShieldCheck size={28} className="text-[#23A6F0]" />
                    </div>
                    <h3 className="font-bold text-[#252B42]">Güvenli Alışveriş</h3>
                    <p className="text-sm text-[#737373]">
                        Ödeme bilgileriniz uçtan uca şifrelenir, verileriniz güvende tutulur.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Heart size={28} className="text-[#23A6F0]" />
                    </div>
                    <h3 className="font-bold text-[#252B42]">Müşteri Memnuniyeti</h3>
                    <p className="text-sm text-[#737373]">
                        Sizin memnuniyetiniz bizim önceliğimiz, her zaman yanınızdayız.
                    </p>
                </div>

            </div>

            {/* Misyonumuz -ÖRNEK- */}
            <div className="bg-[#FAFAFA] rounded-lg p-8 flex flex-col items-center text-center gap-3">
                <h2 className="text-xl font-bold text-[#252B42]">Misyonumuz</h2>
                <p className="text-[#737373] max-w-[600px] leading-7">
                    Kaliteli ürünleri, şeffaf fiyatlandırma ve güvenilir hizmet anlayışıyla
                    herkesin erişebileceği bir alışveriş deneyimine dönüştürmek.
                </p>
            </div>

        </div>
    );
}

export default AboutPage;