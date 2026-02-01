import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Phone, ArrowLeft, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Toast from '../components/Toast';

const ForgotPassword = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call (implement actual reset logic later)
        setTimeout(() => {
            setSent(true);
            setToast({
                type: 'success',
                message: 'Password reset instructions sent! Check your registered mobile.'
            });
            setLoading(false);
            
            // Redirect to login after 3 seconds
            setTimeout(() => navigate('/login'), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-soft-pink via-white to-soft-purple p-4">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl max-w-md w-full border border-white relative overflow-hidden animate-fadeIn">
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 bg-primary/10 w-40 h-40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 bg-secondary/10 w-40 h-40 rounded-full blur-3xl"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="inline-flex bg-pink-100 p-4 rounded-3xl mb-4 shadow-inner">
                        <Heart className="text-primary" size={40} fill="#E91E63" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Enter your phone number to reset
                    </p>
                </div>

                {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
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
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-primary to-secondary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-pink-100 hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={24} />
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8 relative z-10">
                        <div className="bg-green-100 text-green-800 p-6 rounded-2xl mb-6">
                            <p className="font-bold text-lg">Reset link sent!</p>
                            <p className="text-sm mt-2">Redirecting to login...</p>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center relative z-10">
                    <Link to="/login" className="text-primary font-black hover:underline flex items-center gap-2 justify-center mx-auto">
                        <ArrowLeft size={18} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
