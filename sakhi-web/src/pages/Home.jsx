import React from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag, HeartPulse, ArrowRight, Sparkles, ShieldCheck,
    Users, Languages, ShieldAlert, GraduationCap, Gavel
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center bg-gradient-to-br from-soft-pink via-white to-soft-purple p-4">

            {/* Hero Section */}
            <div className="mt-12 mb-16 max-w-4xl text-center animate-[fadeIn_1s_ease-out]">
                <div className="inline-flex items-center gap-2 bg-pink-100 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-sm border border-pink-200">
                    <Sparkles size={16} /> Inclusive Smart Village Initiative
                </div>
                <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6 tracking-tight">
                    SAKHI HUB
                </h1>
                <p className="text-2xl text-gray-700 font-semibold mb-3">
                    {t.tagline}
                </p>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    A multi-functional digital companion empowering rural women across five key pillars: Economics, Healthcare, Safety, Education, and Governance.
                </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-24">

                {/* 1. Skill Hub - Market Access */}
                <Link to="/skill-hub" className="group">
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-secondary h-full flex flex-col items-center text-center relative overflow-hidden h-[400px]">
                        <div className="bg-purple-100 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <ShoppingBag size={40} className="text-secondary" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">{t.skillHub}</h2>
                        <p className="text-gray-500 mb-6 font-medium">Market access for artisans. Showcase heritage crafts and earn independently.</p>
                        <span className="mt-auto bg-secondary text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Explore <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

                {/* 2. Health Assistant */}
                <Link to="/health" className="group">
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-primary h-full flex flex-col items-center text-center relative overflow-hidden h-[400px]">
                        <div className="bg-pink-100 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <HeartPulse size={40} className="text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">{t.health}</h2>
                        <p className="text-gray-500 mb-6 font-medium">Maternal & hygiene care. AI guidance for period cycles and pregnancy tracking.</p>
                        <span className="mt-auto bg-primary text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Wellness <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

                {/* 3. Safety Hub (SOS) */}
                <Link to="/safety" className="group">
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-red-500 h-full flex flex-col items-center text-center relative overflow-hidden h-[400px]">
                        <div className="bg-red-100 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <ShieldAlert size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">{t.safety}</h2>
                        <p className="text-gray-500 mb-6 font-medium">Instant SOS alerts. Connect to your village safety circle and local helplines.</p>
                        <span className="mt-auto bg-red-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Stay Safe <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

                {/* 4. Education (Learning Hub) */}
                <Link to="/education" className="group">
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-green-500 h-full flex flex-col items-center text-center relative overflow-hidden h-[400px]">
                        <div className="bg-green-100 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <GraduationCap size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">{t.education}</h2>
                        <p className="text-gray-500 mb-6 font-medium">Vernacular video lessons. Learn digital banking, tailoring, and legal literacy.</p>
                        <span className="mt-auto bg-green-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Enroll <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

                {/* 5. Govt Schemes (Governance) */}
                <Link to="/schemes" className="group">
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-blue-500 h-full flex flex-col items-center text-center relative overflow-hidden h-[400px]">
                        <div className="bg-blue-100 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <Gavel size={40} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">{t.schemes}</h2>
                        <p className="text-gray-500 mb-6 font-medium">Access govt welfare schemes. AI-powered eligibility check for women's rights.</p>
                        <span className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Benefits <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

                {/* 6. Community Forum */}
                <Link to="/community" className="group">
                    <div className="bg-gray-900 p-8 rounded-[3rem] shadow-xl border-b-8 border-yellow-500 h-full flex flex-col items-center text-center relative overflow-hidden h-[400px] hover:shadow-2xl transition-all hover:-translate-y-2">
                        <div className="bg-yellow-500/20 p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                            <Users size={40} className="text-yellow-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">{t.community}</h2>
                        <p className="text-gray-400 mb-6 font-medium">Connect with 5,000+ Sakhis. Participate in village decision-making and ASHAs groups.</p>
                        <span className="mt-auto bg-yellow-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Join <ArrowRight size={18} />
                        </span>
                    </div>
                </Link>

            </div>

            {/* Impact Section */}
            <div className="w-full max-w-5xl bg-white/40 backdrop-blur-sm p-12 rounded-[4rem] border border-white/60 mb-24">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-5xl font-black text-primary mb-2">50K+</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Rural Lives Empowered</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-black text-secondary mb-2">300+</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Village Clusters</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-black text-blue-600 mb-2">10+</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Govt Partnerships</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
