import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Phone, MapPin, Users, Bell, ShieldCheck, HeartPulse } from 'lucide-react';

const Safety = () => {
    const { t } = useLanguage();
    const [sosActive, setSosActive] = useState(false);

    const emergencyContacts = [
        { name: "Police Helpline", phone: "112", icon: <ShieldAlert className="text-red-500" /> },
        { name: "Women's Helpline", phone: "1091", icon: <Phone className="text-secondary" /> },
        { name: "Local SHG Leader (Rampur)", phone: "+91 98765 00001", icon: <Users className="text-blue-500" /> },
        { name: "ASHA Worker (Sita)", phone: "+91 98765 00002", icon: <HeartPulse className="text-primary" /> },
    ];

    const handleSOS = () => {
        setSosActive(true);
        // In a real app, this would send location to trusted contacts and local authorities
        setTimeout(() => {
            alert("SOS ALERT SENT! Your location has been shared with your Safety Circle and the nearest police station.");
            setSosActive(false);
        }, 3000);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">

            <div className="flex flex-col md:flex-row gap-12 items-start">

                {/* Left: SOS Action */}
                <div className="md:w-1/2 w-full space-y-8">
                    <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[4rem] shadow-2xl border border-red-100 text-center relative overflow-hidden">
                        <div className={`absolute inset-0 bg-red-500/10 transition-opacity duration-500 ${sosActive ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

                        <h2 className="text-4xl font-black text-gray-900 mb-4 relative z-10">{t.sos}</h2>
                        <p className="text-gray-500 font-medium mb-10 relative z-10">
                            Press and hold the button below for 3 seconds to send an emergency alert to your village circle and authorities.
                        </p>

                        <button
                            onMouseDown={handleSOS}
                            className={`w-64 h-64 rounded-full mx-auto flex flex-col items-center justify-center gap-2 transform transition-all active:scale-90 shadow-2xl relative z-10 ${sosActive ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            <Bell size={64} className="text-white animate-bounce" />
                            <span className="text-white font-black text-2xl uppercase tracking-tighter">
                                {sosActive ? 'SENDING...' : t.sos}
                            </span>
                        </button>

                        <div className="mt-10 flex items-center justify-center gap-2 text-red-600 font-bold relative z-10">
                            <ShieldCheck size={20} /> Zero-Knowledge Privacy Enabled
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[3rem] text-white shadow-xl">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <MapPin className="text-secondary" /> Safe Spaces Nearby
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/10">
                                <div>
                                    <p className="font-bold text-lg">Rampur Anganwadi Center</p>
                                    <p className="text-gray-400 text-sm">Open 24/7 for emergency shelter</p>
                                </div>
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-black">2.4 KM</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/10">
                                <div>
                                    <p className="font-bold text-lg">Village Panchayat Hall</p>
                                    <p className="text-gray-400 text-sm">Police-patrolled secure area</p>
                                </div>
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-black">4.1 KM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Contacts & Safety Circle */}
                <div className="md:w-1/2 w-full space-y-8">
                    <div className="bg-white p-10 rounded-[4rem] shadow-xl border border-gray-100">
                        <h3 className="text-3xl font-black text-gray-900 mb-8">{t.emergencyContact}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {emergencyContacts.map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={`tel:${contact.phone}`}
                                    className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4 hover:bg-gray-100 transition-all group"
                                >
                                    <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl group-hover:scale-110 transition-transform">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-800 leading-tight">{contact.name}</p>
                                        <p className="text-primary font-black mt-1">{contact.phone}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="bg-secondary p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Users size={200} />
                        </div>
                        <h3 className="text-3xl font-black mb-4 relative z-10">My Safety Circle</h3>
                        <p className="text-white/80 font-medium mb-8 relative z-10">
                            These 5 sakhis will be instantly notified if you trigger an SOS.
                        </p>
                        <div className="flex -space-x-4 relative z-10 mb-8">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-14 h-14 rounded-full border-4 border-secondary bg-white overflow-hidden flex items-center justify-center text-secondary">
                                    <Users size={24} />
                                </div>
                            ))}
                        </div>
                        <button className="bg-white text-secondary px-8 py-3 rounded-2xl font-black hover:bg-gray-100 transition-all relative z-10 shadow-xl">
                            Manage Circle
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Safety;
