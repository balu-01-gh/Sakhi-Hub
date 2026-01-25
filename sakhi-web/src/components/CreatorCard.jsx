import React from 'react';
import { User, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CreatorCard = ({ creator }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover border border-pink-100">
            <div className="h-48 bg-gray-200">
                <img
                    src={creator.work_samples[0] || 'https://placehold.co/300x200'}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-xl text-gray-800">{creator.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            <User size={14} /> {creator.village}
                        </p>
                    </div>
                    <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full font-medium">
                        {creator.skill_category}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{creator.experience}</p>
                <a
                    href={`tel:${creator.contact || '1234567890'}`}
                    className="w-full bg-secondary text-white py-3 rounded-2xl hover:bg-purple-800 transition-all flex items-center justify-center gap-2 font-black shadow-lg shadow-purple-100"
                >
                    <Phone size={18} /> {t.contact}
                </a>
            </div>
        </div>
    );
};

export default CreatorCard;
