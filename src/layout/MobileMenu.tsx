import { Link } from "react-router-dom";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { navLinks, aboutDropdown } from "../layout/Header";
import { useState } from "react";


interface MobileMenuProps {
  isOpen: boolean;
  user: Record<string, unknown> | null;
}

function MobileMenu({ isOpen, user }: MobileMenuProps) {

    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return(
        <div className={'w-full bg-white md:hidden '
            + (isOpen ? 'block' : 'hidden')}>

            <nav className='flex flex-col items-center justify-center text-center gap-6 text-xl text-slate-600 font-medium py-8'>
                {navLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="hover:text-slate-900">
                        {link.title}
                    </Link>
                ))}

                <div className="flex flex-col items-center gap-2 w-full">
                    <button
                        type="button"
                        onClick={() => setIsAboutOpen(!isAboutOpen)}
                        className="flex items-center gap-1 hover:text-slate-900"
                    >
                        About
                        {isAboutOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isAboutOpen && (
                        <div className="flex flex-col items-center gap-2">
                            {aboutDropdown.map((item, index) => (
                                <Link key={index} to={item.path} className="text-sm text-slate-500 hover:text-slate-900">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 w-full justify-center">
                    {user ? (
                        <div className="flex items-center gap-2 text-[#252B42] font-bold text-xl">
                            <User size={22} className="text-[#23A6F0]" />
                            <span>{user.name as string}</span>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center gap-1.5 text-[#23A6F0] font-bold text-xl">
                                <User size={22} />
                                <span>Login</span>
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link to="/signup" className="text-[#23A6F0] font-bold text-xl">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default MobileMenu;