import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, HeartPulse, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Mission */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-3xl font-black flex items-center gap-2 mb-6">
                            <Heart fill="#E91E63" className="text-primary" /> SAKHI HUB
                        </Link>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Building a digital ecosystem where rural women lead, create, and thrive. Empowered by technology, rooted in heritage.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Quick Links</h4>
                        <ul className="space-y-4 font-medium text-gray-400">
                            <li><Link to="/" className="hover:text-white transition-colors">{t.home}</Link></li>
                            <li><Link to="/skill-hub" className="hover:text-white transition-colors">{t.skillHub}</Link></li>
                            <li><Link to="/health-assistant" className="hover:text-white transition-colors">{t.health}</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-colors">{t.profile}</Link></li>
                        </ul>
                    </div>

                    {/* Support & Community */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-secondary">Support</h4>
                        <ul className="space-y-4 font-medium text-gray-400">
                            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Mail size={18} /> impact@sakhihub.org</li>
                            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Phone size={18} /> +91 1800-SAKHI</li>
                            <li className="cursor-pointer hover:text-white">NGO Partnerships</li>
                            <li className="cursor-pointer hover:text-white">ASHA Network</li>
                        </ul>
                    </div>

                    {/* Social Impact */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-accent">Social Impact</h4>
                        <p className="text-gray-400 mb-6 font-medium">Follow our journey of transforming 50,000+ lives across rural India.</p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 p-3 rounded-2xl hover:bg-primary transition-all"><Facebook size={20} /></a>
                            <a href="#" className="bg-white/10 p-3 rounded-2xl hover:bg-primary transition-all"><Twitter size={20} /></a>
                            <a href="#" className="bg-white/10 p-3 rounded-2xl hover:bg-primary transition-all"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-bold">
                    <p>© 2026 SAKHI HUB. Created with ❤️ for rural empowerment.</p>
                    <div className="flex gap-8">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms of Service</span>
                        <span className="cursor-pointer hover:text-white">Medical Disclaimer</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
