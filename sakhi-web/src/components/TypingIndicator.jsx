import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 p-4 bg-white/80 rounded-2xl shadow-md w-20">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
};

export default TypingIndicator;
