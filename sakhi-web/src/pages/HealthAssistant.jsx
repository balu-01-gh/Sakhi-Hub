import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HealthAssistant = () => {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.chooseAssistant}</h1>
            <p className="text-gray-500 mb-12 text-center max-w-lg">
                {t.assistantDesc}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
                <Link to="/health/period-bot" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 hover:border-pink-300 transition-all cursor-pointer h-full">
                        <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-primary">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.periodBot}</h3>
                        <p className="text-gray-600 mb-4">Track your cycle, get hygiene tips, and relief from cramps.</p>
                        <span className="text-primary font-bold underline">{t.startChat}</span>
                    </div>
                </Link>

                <Link to="/health/pregnancy-bot" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-purple-100 hover:border-purple-300 transition-all cursor-pointer h-full">
                        <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-purple-600">
                            <Sparkles size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.pregnancyBot}</h3>
                        <p className="text-gray-600 mb-4">Trimester-wise guidance on nutrition, safety, and baby growth.</p>
                        <span className="text-purple-600 font-bold underline">{t.startChat}</span>
                    </div>
                </Link>

                <Link to="/health/krishi-bot" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100 hover:border-green-300 transition-all cursor-pointer h-full">
                        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600">
                            <ShoppingBag size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">🌾 Krishi Sakhi</h3>
                        <p className="text-gray-600 mb-4">Agricultural guidance for women farmers - organic farming, weather, and soil health.</p>
                        <span className="text-green-600 font-bold underline">{t.startChat}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HealthAssistant;
