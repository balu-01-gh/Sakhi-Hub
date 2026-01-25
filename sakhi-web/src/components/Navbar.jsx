import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, ShoppingBag, Activity, Languages,
    User, ShieldAlert, GraduationCap, Gavel
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-black flex items-center gap-2">
                    <Heart fill="white" size={28} /> SAKHI HUB
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link to="/" className="hover:text-pink-200 font-bold transition-colors">{t.home}</Link>

                    <div className="flex items-center gap-5">
                        <Link to="/skill-hub" className="hover:text-pink-200 font-bold flex items-center gap-1.5 transition-colors">
                            <ShoppingBag size={18} /> {t.skillHub}
                        </Link>
                        <Link to="/health-assistant" className="hover:text-pink-200 font-bold flex items-center gap-1.5 transition-colors">
                            <Activity size={18} /> {t.health}
                        </Link>
                        <Link to="/education" className="hover:text-pink-200 font-bold flex items-center gap-1.5 transition-colors">
                            <GraduationCap size={18} /> {t.education}
                        </Link>
                        <Link to="/schemes" className="hover:text-pink-200 font-bold flex items-center gap-1.5 transition-colors">
                            <Gavel size={18} /> {t.schemes}
                        </Link>
                        <Link to="/profile" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
                            <User size={20} />
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-white/20 ml-2"></div>

                    {/* Emergency SOS in Nav */}
                    <Link to="/safety" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-black flex items-center gap-2 animate-pulse shadow-lg transition-all">
                        <ShieldAlert size={18} /> {t.sos}
                    </Link>

                    {/* Language Switch */}
                    <div className="bg-white/10 p-1.5 rounded-xl flex items-center gap-2 border border-white/20">
                        <Languages size={18} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent font-black outline-none cursor-pointer text-xs uppercase"
                        >
                            <option value="English" className="text-gray-800">EN</option>
                            <option value="Hindi" className="text-gray-800">HI</option>
                            <option value="Telugu" className="text-gray-800">TE</option>
                        </select>
                    </div>

                    <Link to="/login" className="bg-white text-primary px-5 py-2 rounded-full font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                        {t.login}
                    </Link>
                </div>

                {/* Mobile SOS Icon (Visible only on small screens) */}
                <div className="lg:hidden flex items-center gap-4">
                    <Link to="/safety" className="bg-red-600 p-2 rounded-full animate-pulse shadow-red-200 shadow-lg">
                        <ShieldAlert size={24} />
                    </Link>
                    <Link to="/profile">
                        <User size={24} />
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
