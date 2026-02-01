import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password }) => {
    const getStrength = (pwd) => {
        if (!pwd) return { score: 0, label: '', color: '' };
        
        let score = 0;
        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        const levels = [
            { score: 0, label: 'Very Weak', color: 'bg-red-500' },
            { score: 1, label: 'Weak', color: 'bg-orange-500' },
            { score: 2, label: 'Fair', color: 'bg-yellow-500' },
            { score: 3, label: 'Good', color: 'bg-lime-500' },
            { score: 4, label: 'Strong', color: 'bg-green-500' },
            { score: 5, label: 'Very Strong', color: 'bg-emerald-600' }
        ];

        return levels[score];
    };

    const strength = getStrength(password);

    const requirements = [
        { met: password.length >= 6, text: 'At least 6 characters' },
        { met: password.length >= 10, text: '10+ characters (stronger)' },
        { met: /[a-z]/.test(password) && /[A-Z]/.test(password), text: 'Uppercase & lowercase' },
        { met: /\d/.test(password), text: 'Contains number' },
        { met: /[^A-Za-z0-9]/.test(password), text: 'Special character' }
    ];

    if (!password) return null;

    return (
        <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                </div>
                <span className="text-xs font-bold text-gray-600">{strength.label}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5 text-xs">
                {requirements.map((req, idx) => (
                    <div key={idx} className={`flex items-center gap-1.5 ${req.met ? 'text-green-600' : 'text-gray-400'}`}>
                        {req.met ? <Check size={12} /> : <X size={12} />}
                        <span>{req.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrength;
