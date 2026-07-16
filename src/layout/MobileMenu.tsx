import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { navLinks } from "../layout/Header";

interface MobileMenuProps {
  isOpen: boolean;
  user: Record<string, unknown> | null;
}

function MobileMenu({ isOpen, user }: MobileMenuProps) {

    return(
        <div className={'w-full bg-white md:hidden '
            + (isOpen ? 'block' : 'hidden')}>

            <nav className='flex flex-col items-center justify-center text-center gap-6 text-xl text-slate-600 font-medium py-8'>
                {navLinks.map((link, index) => (
                    <a key={index} href={link.path} className="hover:text-slate-900">
                        {link.title}
                    </a>
                ))}

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