import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MicOff, StopCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ChatUI = ({ title, messages, onSend, isLoading, prediction }) => {
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const bottomRef = useRef(null);
    const { language, t } = useLanguage();

    useEffect(() => {
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150);
        return () => clearTimeout(timer);
    }, [messages]);

    // Pre-warm voices
    useEffect(() => {
        window.speechSynthesis.getVoices();
    }, []);

    const cleanTextForSpeech = (text) => {
        return text.replace(/[#*✨✅❌⚠️]/g, '').trim();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput('');
    };

    // --- VOICE RECOGNITION (STT) ---
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support voice recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Telugu' ? 'te-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.start();
    };

    // --- VOICE SYNTHESIS (TTS) ---
    const speakText = (text) => {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        // Language mapping
        const langCode = language === 'Hindi' ? 'hi-IN' : language === 'Telugu' ? 'te-IN' : 'en-US';

        // Try to find a high-quality local voice for the selected language
        let voice = voices.find(v => v.lang === langCode && v.localService);
        if (!voice) voice = voices.find(v => v.lang.includes(langCode));
        if (!voice && language === 'Hindi') voice = voices.find(v => v.lang.startsWith('hi'));
        if (!voice && language === 'Telugu') voice = voices.find(v => v.lang.startsWith('te'));

        if (voice) {
            utterance.voice = voice;
        }

        utterance.lang = langCode;
        utterance.rate = 0.85; // Slightly slower for rural users (better understanding)
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col h-[650px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black tracking-wide">{title}</h2>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        AI Sakhi Mode
                    </div>
                </div>
                {prediction && (
                    <div className="mt-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl text-sm border border-white/30 animate-pulse">
                        ✨ <span className="font-bold">{prediction}</span>
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                            <div
                                className={`rounded-2xl px-5 py-3 ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-pink-100'
                                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            </div>
                            {msg.role === 'assistant' && (
                                <button
                                    onClick={() => speakText(cleanTextForSpeech(msg.content))}
                                    className="mt-2 flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100"
                                >
                                    <Volume2 size={14} /> {t.listen}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-gray-400 flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                            <span className="text-sm font-medium">{t.sakhiTyping}</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={startListening}
                        className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        title={t.speak}
                    >
                        {isListening ? <StopCircle size={24} /> : <Mic size={24} />}
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.askSomething}
                        className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700"
                    />

                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-primary text-white p-3.5 rounded-2xl hover:bg-pink-700 transition-all disabled:opacity-30 shadow-lg shadow-pink-100"
                    >
                        <Send size={22} />
                    </button>
                </form>
                {isListening && (
                    <p className="text-xs text-center mt-2 text-red-500 font-bold animate-pulse">
                        Listening... Speak now
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatUI;
