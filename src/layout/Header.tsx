import { Menu, Search, ShoppingCart, User } from "lucide-react"
import { FaFacebook, FaInstagram, FaXTwitter, FaPhone, FaEnvelope } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";

import Avatar from "../components/common/Avatar";
import AvatarPicker from "../components/common/AvatarPicker";
import type { AvatarConfig } from "../components/common/Avatar";

import MobileMenu from "./MobileMenu";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import md5 from "md5";

export const navLinks = [       //export diğer bileşenlerin de kullanması için koyduk.
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
];

function getStoredAvatar(email: string): AvatarConfig | null {
    const stored = localStorage.getItem(`avatar_${email.trim().toLowerCase()}`);
    return stored ? JSON.parse(stored) : null;

    //Email → normalize edilir (trim + lowercase).

    //localStorage anahtarı oluşturulur (avatar_email).

    //Kayıt varsa JSON’dan parse edilip AvatarConfig döner.

    //Kayıt yoksa null döner.
}

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

    const user = useSelector((state: RootState) => state.client.user);

    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | null>(
        user ? getStoredAvatar(user.email as string) : null
    );

    useEffect(() => {
        if (user) {
            setAvatarConfig(getStoredAvatar(user.email as string));
        } else {
            setAvatarConfig(null);
        }
    }, [user]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const avatarWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (avatarWrapperRef.current && !avatarWrapperRef.current.contains(event.target as Node)) {
                setIsAvatarPickerOpen(false);
            }
        }

        if (isAvatarPickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isAvatarPickerOpen]);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const cart = useSelector((state: RootState) => state.shoppingCart.cart);
    const cartWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutsideCart(event: MouseEvent) {
            if (cartWrapperRef.current && !cartWrapperRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        }

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutsideCart);
        }

        return () => document.removeEventListener("mousedown", handleClickOutsideCart);
    }, [isCartOpen]);

    function handleAvatarChange(config: AvatarConfig) {
        setAvatarConfig(config);
        if (user) {
            localStorage.setItem(
                `avatar_${(user.email as string).trim().toLowerCase()}`,
                JSON.stringify(config)
            );
        }
    }
    return (
        <div className="w-full relative flex flex-col">
                <div className='hidden md:block bg-[#252B42] text-white px-6 py-8 text-lg font-bold'>
                    <div className='flex items-center justify-between max-w-[1440px] mx-auto'>

                        {/* Sol Parça: İletişim */}
                    <div className='flex items-center gap-10'>
                            {/* Telefon */}
                            <div className='flex items-center gap-1.5 text-[8px]'>
                                <FaPhone size={14} />
                                <span>+90 (501) 000-1907</span>
                            </div>

                            {/* E-posta */}
                            <div className='flex items-center gap-1.5 text-[8px]'>
                                <FaEnvelope size={14} />
                                <span>fenerbahce@gmail.com</span>
                            </div>
                        </div>

                        {/* Orta Parça: Kampanya Mesajı */}
                        <div className = 'absolute left-1/2 -translate-x-1/2 flex text-xl items-center md:tracking-[1px]'>
                            <p>Follow Us and get a chance to win 80% off.</p>
                        </div>

                        {/* Sağ Parça: Sosyal Medya */}
                        <div className='flex items-center gap-3'>

                            <a href='https://facebook.com' target="_blank" rel="noreferrer" aria-label='Facebook' className='hover:text-gray-300'>
                                <FaFacebook size={16} />
                            </a>
                            <a href='https://instagram.com/nihaszugo' target="_blank" rel="noreferrer" aria-label='Instagram' className='hover:text-gray-300'>
                                <FaInstagram size={16} />
                            </a>
                            <a href='https://X.com' target="_blank" rel="noreferrer" aria-label='X' className='hover:text-gray-300'>
                                <FaXTwitter size={16} />
                            </a>
                        </div>
                    </div>

                </div>

            <header className='w-full px-6 py-3 md:py-14 md:h-14 bg-white flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <h2 className='text-3xl ml-8 font-bold text-[#252B42] md:px-[3em]'> Tanrıkut </h2>
                    </Link>
                </div>

                <nav className='hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-base text-slate-600 font-medium'>
                    {navLinks.map((link, index) => (
                        <a key={index} href={link.path} className='hover:text-slate-900'>
                            {link.title}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    {/* Login / Register — sadece desktop */}
                    <div className='hidden md:flex items-center gap-3'>
                    {user ? (
                        <div
                            ref={avatarWrapperRef}
                            className="relative flex items-center gap-2 text-[#252B42] font-bold text-lg"
                        >
                            <button type="button" onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}>
                                <Avatar config={avatarConfig} email={user.email as string} size={32} />
                            </button>
                            <span>{user.name as string}</span>

                            {isAvatarPickerOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-[280px] flex flex-col gap-3">
                                    <Link
                                        to="/previous-orders"
                                        onClick={() => setIsAvatarPickerOpen(false)}
                                        className="text-sm font-medium text-[#252B42] hover:text-[#23A6F0] border-b border-gray-100 pb-3"
                                    >
                                        Önceki Siparişlerim
                                    </Link>

                                    <AvatarPicker value={avatarConfig ?? { bgColor: "#23A6F0", icon: "User" }} onChange={handleAvatarChange} />

                                    <button
                                        type="button"
                                        onClick={() => dispatch(logoutUser())}
                                        className="text-red-500 text-sm font-medium text-left border-t border-gray-100 pt-3"
                                    >
                                        Çıkış Yap
                                    </button>
                                </div>
                            )}
                        </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className='flex items-center gap-1.5 text-[#23A6F0] font-bold text-lg hover:text-[#1a8fd1] transition-colors'
                                >
                                    <User size={24} />
                                    <span>Login</span>
                                </Link>

                                <span className='text-gray-300'>|</span>

                                <Link
                                    to="/signup"
                                    className='text-[#23A6F0] font-bold text-lg hover:text-[#1a8fd1] transition-colors'
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>



                    <div className="flex items-center gap-4">
                        <button type="button" aria-label="Search">
                            <Search size={24} className='text-[#23A6F0]' />
                        </button>

                        <div ref={cartWrapperRef} className="relative">
                            <button type="button" aria-label="Cart" onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
                                <ShoppingCart size={24} className='text-[#23A6F0]' />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>

                            {isCartOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-[280px] sm:w-[300px] max-h-[400px] overflow-y-auto">                                    {cart.length === 0 ? (
                                        <p className="text-sm text-gray-500 text-center py-4">Sepetiniz boş.</p>
                                    ) : (
                                        <div className="flex flex-col gap-3">

                                            {cart.length > 0 && (
                                                <div className="flex flex-col gap-2 mt-3">
                                                    <Link
                                                        to="/cart"
                                                        onClick={() => setIsCartOpen(false)}
                                                        className="block text-center border border-[#23A6F0] text-[#23A6F0] font-semibold rounded px-4 py-2 hover:bg-blue-50 transition-colors"
                                                    >
                                                        Sepete Git
                                                    </Link>

                                                    <Link
                                                        to="/order"
                                                        onClick={() => setIsCartOpen(false)}
                                                        className="block text-center bg-[#23A6F0] text-white font-semibold rounded px-4 py-2 hover:bg-[#1f92d8] transition-colors"
                                                    >
                                                        Siparişi Tamamla
                                                    </Link>
                                                </div>
                                            )}

                                            {cart.map((item, index) => {
                                                const product = item.product as Record<string, unknown>;
                                                const images = product.images as { url: string }[];
                                                return (
                                                    <div key={index} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                                        <img
                                                            src={images?.[0]?.url}
                                                            alt={product.name as string}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-[#252B42]">{product.name as string}</p>
                                                            <p className="text-xs text-gray-500">Adet: {item.count as number}</p>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#252B42]">
                                                            ${((product.price as number) * (item.count as number)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="button" aria-label="Menu" onClick={toggleMenu} className="block md:hidden z-50 relative">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu isOpen={isMenuOpen} user={user} />

        </div>
    );

}
export default Header;