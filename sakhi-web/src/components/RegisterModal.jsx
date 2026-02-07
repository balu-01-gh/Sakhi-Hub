import React, { useState } from 'react';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { uploadWorkSample, API_URL } from '../services/api';

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
    const { t } = useLanguage();
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        village: '',
        skill_category: '',
        experience: '',
        contact: '',
        work_samples: [] // Empty initially
    });

    if (!isOpen) return null;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const { url } = await uploadWorkSample(file);
            setFormData(prev => ({ ...prev, work_samples: [API_URL + url] }));
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

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

                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Work Sample Photo</label>
                        <div className="flex gap-4 items-center">
                            <div className="relative w-full">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="work-sample-upload"
                                />
                                <label
                                    htmlFor="work-sample-upload"
                                    className={`w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-3 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all text-gray-500 font-medium ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    {uploading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Upload size={20} />
                                    )}
                                    {uploading ? "Uploading..." : "Upload Photo"}
                                </label>
                            </div>
                            {formData.work_samples.length > 0 && (
                                <div className="h-14 w-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative group">
                                    <img 
                                        src={formData.work_samples[0]} 
                                        alt="Preview" 
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ImageIcon size={16} className="text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-100 hover:shadow-2xl hover:bg-purple-800 transition-all transform hover:-translate-y-1 active:translate-y-0 mt-4 disabled:opacity-50 disabled:transform-none"
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
