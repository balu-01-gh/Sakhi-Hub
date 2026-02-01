import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { downloadChatHistory, clearChatHistory } from '../utils/chatHistory';

const ChatHistoryControls = ({ botType, onClear }) => {
    const handleDownload = () => {
        downloadChatHistory(botType);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
            clearChatHistory(botType);
            if (onClear) onClear();
        }
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-bold"
                title="Download chat history"
            >
                <Download size={16} />
                Export
            </button>
            <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all text-sm font-bold"
                title="Clear chat history"
            >
                <Trash2 size={16} />
                Clear
            </button>
        </div>
    );
};

export default ChatHistoryControls;
