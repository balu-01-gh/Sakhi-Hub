import React, { useEffect, useState } from 'react';
import { Award, X } from 'lucide-react';

const BadgeNotification = ({ badge, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!badge) return null;

  return (
    <div className={`fixed top-24 right-6 z-[999] transition-all duration-300 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl shadow-2xl p-6 min-w-[320px] border-4 border-white/30 backdrop-blur-lg">
        <button onClick={() => { setShow(false); setTimeout(onClose, 300); }} className="absolute top-3 right-3 text-white/70 hover:text-white">
          <X size={20} />
        </button>
        
        <div className="flex items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-4xl">
            {badge.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Award size={18} className="animate-pulse" />
              <p className="text-xs font-black uppercase tracking-widest">NEW BADGE!</p>
            </div>
            <h3 className="text-xl font-black mb-1">{badge.name}</h3>
            <p className="text-sm text-white/90 font-medium mb-2">{badge.description}</p>
            <div className="flex items-center gap-2">
              <div className="bg-white/30 px-3 py-1 rounded-full text-xs font-black">
                +{badge.points} Points
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
