import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { initChat, joinChatRoom, sendMessage, onMessage } from '../utils/chat';
import { getUserData } from '../utils/auth';

const UserChatModal = ({ isOpen, onClose, creatorName, productName }) => {
    const { t } = useLanguage();
    
    // 1. All Hooks must be declared at the top level
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const [roomId, setRoomId] = useState('');

    // 2. Initialize Chat Room when opening
    useEffect(() => {
        if (isOpen) {
            const user = getUserData();
            const generatedRoomId = `room_${creatorName}_${productName}`.replace(/\s+/g, '_');
            setRoomId(generatedRoomId);
            
            // Connect to socket
            initChat();
            joinChatRoom(generatedRoomId);

            // Load local history or empty
            const saved = localStorage.getItem(generatedRoomId);
            if (saved) {
                setMessages(JSON.parse(saved));
            } else {
                setMessages([
                    { role: 'assistant', content: `Namaste! I am ${creatorName}. Thank you for your interest in my ${productName}. How can I help you today?` }
                ]);
            }
        }
    }, [isOpen, creatorName, productName]);

    // 3. Listen for incoming messages
    useEffect(() => {
        // Subscribe to socket messages
        const handleMessage = (data) => {
            // Using a simple check, in real app check roomId match
            if (data.roomId === roomId || !data.roomId) {
                 setMessages(prev => {
                    const newMsgs = [...prev, { role: 'assistant', content: data.text || data.message }];
                    localStorage.setItem(roomId, JSON.stringify(newMsgs));
                    return newMsgs;
                 });
            }
        };

        if (isOpen) {
            onMessage(handleMessage);
        }
        // Cleanup not strictly feasible with current simplified utils, but okay for this session
    }, [isOpen, roomId]);

    // 4. Scroll effect
    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        const newMessages = [...messages, { role: 'user', content: userText }];
        setMessages(newMessages);
        localStorage.setItem(roomId, JSON.stringify(newMessages));
        setInput('');

        // Send to socket
        const user = getUserData();
        sendMessage(roomId, userText, user?.id || 'guest');
    };

    // 5. Conditional Rendering at the END
    if (!isOpen) return null;

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
                            <p className="text-xs text-white/70 font-bold uppercase tracking-widest">{productName}</p>
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
                        placeholder={t.messagePlaceholder || "Type a message..."}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="bg-secondary text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
                        disabled={!input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserChatModal;
