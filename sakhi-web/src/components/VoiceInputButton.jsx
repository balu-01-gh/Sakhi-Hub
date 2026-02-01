import React from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceInputButton = ({ isListening, onStart, onStop, isSupported }) => {
    if (!isSupported) {
        return null; // Don't show button if not supported
    }

    const handleClick = () => {
        if (isListening) {
            onStop();
        } else {
            onStart();
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`p-3 rounded-xl transition-all ${
                isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Voice input'}
        >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
    );
};

export default VoiceInputButton;
