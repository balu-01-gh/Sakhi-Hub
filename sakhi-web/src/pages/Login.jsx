import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Phone, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { t } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ phone: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameToSave = isLogin
            ? (formData.phone === '9876543210' ? 'Lakshmi' : 'Sakhi User')
            : formData.name;

        localStorage.setItem('user_name', nameToSave);
        localStorage.setItem('is_logged_in', 'true');

        alert(isLogin ? `Namaste ${nameToSave}, welcome back!` : "Account created successfully!");
        navigate('/profile');
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-soft-pink via-white to-soft-purple p-4">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl max-w-md w-full border border-white relative overflow-hidden animate-fadeIn">

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 bg-primary/10 w-40 h-40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 bg-secondary/10 w-40 h-40 rounded-full blur-3xl"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="inline-flex bg-pink-100 p-4 rounded-3xl mb-4 shadow-inner">
                        <Heart className="text-primary" size={40} fill="#E91E63" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        {isLogin ? t.welcomeBack : t.createAccount}
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        SAKHI HUB - Secure & Private
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                                {t.name}
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                    <UserPlus size={20} />
                                </span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 font-medium transition-all"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                            {t.phoneNumber}
                        </label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                <Phone size={20} />
                            </span>
                            <input
                                required
                                type="tel"
                                className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 font-medium transition-all"
                                placeholder="98765-43210"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                            {t.password}
                        </label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={20} />
                            </span>
                            <input
                                required
                                type="password"
                                className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 font-medium transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-pink-100 hover:shadow-2xl hover:bg-pink-700 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                    >
                        {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
                        {isLogin ? t.login : t.signup}
                    </button>
                </form>

                <div className="mt-8 text-center relative z-10">
                    <p className="text-gray-500 font-medium">
                        {isLogin ? t.noAccount : t.haveAccount}
                    </p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary font-black mt-2 hover:underline flex items-center gap-2 justify-center mx-auto"
                    >
                        {isLogin ? t.signup : t.login} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
