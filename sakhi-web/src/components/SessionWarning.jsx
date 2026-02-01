import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

const SessionWarning = ({ onExtend, onLogout, timeRemaining }) => {
    const minutes = Math.ceil(timeRemaining / 60000);
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-md w-full p-8 relative">
                <div className="text-center mb-6">
                    <div className="inline-flex bg-yellow-100 p-4 rounded-3xl mb-4">
                        <AlertTriangle className="text-yellow-600" size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                        Session Expiring Soon
                    </h2>
                    <p className="text-gray-600 flex items-center justify-center gap-2">
                        <Clock size={18} />
                        Your session will expire in <strong>{minutes} minute{minutes !== 1 ? 's' : ''}</strong>
                    </p>
                </div>
                
                <div className="space-y-3">
                    <button
                        onClick={onExtend}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all"
                    >
                        Continue Session
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Logout Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionWarning;
