import React, { useState } from 'react';
import ChatUI from '../components/ChatUI';
import { sendPeriodChat } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Activity } from 'lucide-react';

const PeriodBot = () => {
    const { language, t } = useLanguage();
    const [formData, setFormData] = useState({ age: '', lastDate: '' });
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Namaste! I am Sakhi. Please tell me your age and last period date to start." }
    ]);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const handleStart = (e) => {
        e.preventDefault();
        if (formData.age && formData.lastDate) {
            setStarted(true);
            // Determine initial context
            handleSend(`My age is ${formData.age} and my last period was on ${formData.lastDate}. When is my next date?`);
        }
    };

    const handleSend = async (text) => {
        const newHistory = [...messages, { role: 'user', content: text }];
        setMessages(newHistory);
        setLoading(true);

        try {
            const data = await sendPeriodChat({
                age: parseInt(formData.age),
                last_period_date: formData.lastDate,
                user_message: text,
                language: language,
                history: messages
            });

            setMessages([...newHistory, { role: 'assistant', content: data.response }]);
            if (data.prediction) setPrediction(data.prediction);
        } catch (error) {
            setMessages([...newHistory, { role: 'assistant', content: `Sorry, I am having trouble connecting. Details: ${error.message}` }]);
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!started) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center animate-[fadeIn_0.5s_ease-out]">
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border-t-8 border-primary relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Activity size={100} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-center mb-8 text-gray-800">{t.periodTrackerSetup}</h2>
                    <form onSubmit={handleStart} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-widest">{t.yourAge}</label>
                            <input
                                type="number"
                                required
                                placeholder="E.g. 25"
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-widest">{t.lastPeriodDate}</label>
                            <input
                                type="date"
                                required
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                value={formData.lastDate}
                                onChange={e => setFormData({ ...formData, lastDate: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-pink-100 hover:shadow-xl hover:bg-pink-700 transform hover:-translate-y-1 transition-all active:translate-y-0">
                            {t.startChat}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ChatUI
                title={t.periodBot}
                messages={messages}
                onSend={handleSend}
                isLoading={loading}
                prediction={prediction ? `Next Period: ${prediction}` : null}
            />
        </div>
    );
};

export default PeriodBot;
