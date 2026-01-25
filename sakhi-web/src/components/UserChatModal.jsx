import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const UserChatModal = ({ isOpen, onClose, creatorName, productName }) => {
    const { t } = useLanguage();
    const chatKey = `chat_${creatorName}_${productName}`.replace(/\s+/g, '_');

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(chatKey);
        return saved ? JSON.parse(saved) : [
            { role: 'assistant', content: `Namaste! I am ${creatorName}. Thank you for your interest in my ${productName}. How can I help you today?` }
        ];
    });
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(chatKey, JSON.stringify(messages));
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatKey]);

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        const newMessages = [...messages, { role: 'user', content: userText }];
        setMessages(newMessages);
        setInput('');

        // Intelligence: Mock response variations
        setTimeout(() => {
            let reply = "Dhanyawad (Thank you)! I put a lot of heart into this. Would you like to know more about how it's made?";

            const lowerText = userText.toLowerCase();
            if (lowerText.includes('price') || lowerText.includes('rupees') || lowerText.includes('cost')) {
                reply = "The price is mentioned on the product page, but I can offer a small discount if you buy more items! Are you looking for multiple pieces?";
            } else if (lowerText.includes('how') || lowerText.includes('make') || lowerText.includes('material')) {
                reply = `I use traditional ${productName.toLowerCase().includes('bamboo') ? 'bamboo' : 'village'} techniques passed down from my mother. It takes about 3-5 days to finish one piece.`;
            } else if (lowerText.includes('time') || lowerText.includes('deliver') || lowerText.includes('when')) {
                reply = "I can ship it tomorrow via the village co-operative. It usually reaches within 4-5 days depending on your location.";
            } else if (lowerText.includes('size') || lowerText.includes('big') || lowerText.includes('small')) {
                reply = "Yes, I can customize the size for you! Just let me know what dimensions you need.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        }, 1000);
    };

    // Robust Scroll to bottom
    useEffect(() => {
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-md w-full overflow-hidden flex flex-col h-[600px] border border-white/20">

                {/* Header */}
                <div className="bg-gradient-to-r from-secondary to-purple-800 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <h3 className="font-black leading-tight">{creatorName}</h3>
                            <p className="text-xs text-white/70 font-bold uppercase tracking-widest">{productName} Sakhi</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hover:text-white/70 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl font-medium ${msg.role === 'user' ? 'bg-secondary text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                    <input
                        type="text"
                        className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                        placeholder={t.messagePlaceholder}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-secondary text-white p-3 rounded-2xl shadow-lg shadow-purple-100 hover:bg-purple-800 transition-all"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserChatModal;
