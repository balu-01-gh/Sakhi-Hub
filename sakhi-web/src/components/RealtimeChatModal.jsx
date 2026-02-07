import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Circle, Loader2 } from 'lucide-react';
import { sendMessage, getChatHistory, onMessage, setTyping, getOnlineStatus } from '../utils/chat';

const RealtimeChatModal = ({ isOpen, onClose, chatId, participantName, participantImage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isOnline] = useState(getOnlineStatus());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatId) {
      // Load chat history
      const history = getChatHistory(chatId);
      setMessages(history);

      // Listen for new messages
      onMessage((msg) => {
        if (msg.chatId === chatId) {
          setMessages(prev => [...prev, msg]);
        }
      });
    }
  }, [isOpen, chatId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const userName = localStorage.getItem('user_name') || 'You';

    const messageData = {
      content: newMessage,
      sender: userName,
      type: 'text'
    };

    sendMessage(chatId, messageData);
    setMessages(prev => [...prev, { ...messageData, timestamp: new Date().toISOString() }]);
    setNewMessage('');
    setSending(false);
    setTyping(chatId, false);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.length > 0) {
      setTyping(chatId, true);
    } else {
      setTyping(chatId, false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  const userName = localStorage.getItem('user_name') || 'You';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full h-[700px] flex flex-col overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-[3rem] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {participantImage ? (
                  <img src={participantImage} alt={participantName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User size={24} />
                )}
              </div>
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <div>
              <h3 className="text-xl font-black">{participantName}</h3>
              <p className="text-sm text-white/80 font-medium flex items-center gap-1">
                <Circle size={8} fill={isOnline ? '#10b981' : '#6b7280'} className={isOnline ? 'text-green-500' : 'text-gray-400'} />
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <User size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isOwn = msg.sender === userName;
              return (
                <div key={idx} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-3xl p-4 ${isOwn ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-100'}`}>
                      <p className="font-medium">{msg.message || msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-400 font-medium">{formatTime(msg.timestamp)}</span>
                      {msg.status && <span className="text-xs text-gray-400">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-3xl rounded-bl-none px-6 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-100 rounded-b-[3rem]">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleTyping}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 px-6 py-4 rounded-3xl outline-none focus:ring-2 focus:ring-primary/20 font-medium"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-3xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealtimeChatModal;
