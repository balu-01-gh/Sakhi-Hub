import React, { useState } from 'react';
import ChatUI from '../components/ChatUI';
import { sendPregnancyChat } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

const PregnancyBot = () => {
    const { language, t } = useLanguage();
    const [formData, setFormData] = useState({ startDate: '' });
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Namaste! I am Maa Sakhi. I am here to support your pregnancy journey. When did your pregnancy start?" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleStart = (e) => {
        e.preventDefault();
        if (formData.startDate) {
            setStarted(true);
            handleSend(`My pregnancy started on ${formData.startDate}. How many weeks along am I and what should I eat?`);
        }
    };

    const handleSend = async (text) => {
        const newHistory = [...messages, { role: 'user', content: text }];
        setMessages(newHistory);
        setLoading(true);

        try {
            const data = await sendPregnancyChat({
                pregnancy_start_date: formData.startDate,
                user_message: text,
                language: language,
                history: messages
            });

            setMessages([...newHistory, { role: 'assistant', content: data.response }]);
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
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border-t-8 border-secondary relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Heart size={100} className="text-secondary" />
                    </div>
                    <h2 className="text-3xl font-black text-center mb-8 text-gray-800">{t.pregnancyJourney}</h2>
                    <form onSubmit={handleStart} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-widest">{t.pregnancyStartDate}</label>
                            <input
                                type="date"
                                required
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-purple-100 hover:shadow-xl hover:bg-purple-800 transform hover:-translate-y-1 transition-all active:translate-y-0">
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
                title={t.pregnancyBot}
                messages={messages}
                onSend={handleSend}
                isLoading={loading}
            />
        </div>
    );
};

export default PregnancyBot;
