import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        village: '',
        skill_category: '',
        experience: '',
        contact: '',
        work_samples: ['/images/artisan1.png'] // Default mock image
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ ...formData, id: Date.now() });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden relative border border-white/20">
                {/* Header */}
                <div className="bg-gradient-to-r from-secondary to-purple-800 p-8 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={28} />
                    </button>
                    <h2 className="text-3xl font-black">{t.registerAsCreator}</h2>
                    <p className="text-white/70 mt-2 font-medium">Join our community of talented village sakhis.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.name}</label>
                            <input
                                required
                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-secondary/20 outline-none text-gray-700 font-medium transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="E.g. Lakshmi Devi"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.village}</label>
                            <input
                                required
                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-secondary/20 outline-none text-gray-700 font-medium transition-all"
                                value={formData.village}
                                onChange={e => setFormData({ ...formData, village: e.target.value })}
                                placeholder="E.g. Rampur"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.skills}</label>
                        <input
                            required
                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-secondary/20 outline-none text-gray-700 font-medium transition-all"
                            value={formData.skill_category}
                            onChange={e => setFormData({ ...formData, skill_category: e.target.value })}
                            placeholder="E.g. Pottery, Tailoring"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.experience}</label>
                        <textarea
                            required
                            rows="2"
                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-secondary/20 outline-none text-gray-700 font-medium transition-all resize-none"
                            value={formData.experience}
                            onChange={e => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="Tell us about your work..."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.contact}</label>
                        <input
                            required
                            className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-secondary/20 outline-none text-gray-700 font-medium transition-all"
                            value={formData.contact}
                            onChange={e => setFormData({ ...formData, contact: e.target.value })}
                            placeholder="Mobile Number"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-100 hover:shadow-2xl hover:bg-purple-800 transition-all transform hover:-translate-y-1 active:translate-y-0 mt-4"
                    >
                        {t.submit}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full text-gray-400 font-bold py-2 hover:text-gray-600 transition-colors"
                    >
                        {t.close}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
