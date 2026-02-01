import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
    const icons = {
        success: <CheckCircle2 size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    const colors = {
        success: 'bg-green-50 border-green-500 text-green-800',
        error: 'bg-red-50 border-red-500 text-red-800',
        warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
        info: 'bg-blue-50 border-blue-500 text-blue-800'
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-24 right-4 z-50 ${colors[type]} border-l-4 p-4 rounded-xl shadow-2xl max-w-md animate-fadeIn flex items-start gap-3`}>
            <span className="flex-shrink-0 mt-0.5">{icons[type]}</span>
            <p className="font-medium text-sm flex-1">{message}</p>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-2">✕</button>
        </div>
    );
};

export default Toast;
