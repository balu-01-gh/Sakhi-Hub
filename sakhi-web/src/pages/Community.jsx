import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, MessageSquare, Vote, Bell, ArrowRight, User } from 'lucide-react';

const Community = () => {
    const { t } = useLanguage();
    const [polls, setPolls] = useState(() => {
        const saved = localStorage.getItem('village_polls');
        return saved ? JSON.parse(saved) : [
            { id: 1, question: "Should we build the new water tank near the Primary School?", votes: 124, voted: false },
            { id: 2, question: "Decision on Village Fair dates (Mela)", votes: 89, voted: false }
        ];
    });

    const handleVote = (id) => {
        const updated = polls.map(p => {
            if (p.id === id && !p.voted) {
                return { ...p, votes: p.votes + 1, voted: true };
            }
            return p;
        });
        setPolls(updated);
        localStorage.setItem('village_polls', JSON.stringify(updated));
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl animate-fadeIn">

            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 text-yellow-600 font-black text-sm uppercase tracking-widest mb-4 justify-center md:justify-start">
                        <Users size={18} /> {t.community} Portal
                    </div>
                    <h2 className="text-6xl font-black text-gray-900 tracking-tight lg:leading-tight">Village Council</h2>
                    <p className="text-gray-500 text-xl max-w-2xl font-medium leading-relaxed">
                        Participate in local governance. Vote on village decisions, join SHG discussions, and stay updated with council announcements.
                    </p>
                </div>
                <div className="bg-yellow-500 text-white px-8 py-6 rounded-[2.5rem] shadow-xl flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-black">5.2K</p>
                        <p className="text-xs font-black uppercase">Active Sakhis</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Voting/Polls Section */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-10 rounded-[4rem] shadow-xl border border-gray-100">
                        <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                            <Vote className="text-yellow-600" /> Active Decisions
                        </h3>
                        <div className="space-y-6">
                            {polls.map(poll => (
                                <div key={poll.id} className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 group hover:border-yellow-200 transition-all">
                                    <h4 className="text-2xl font-black text-gray-800 mb-4">{poll.question}</h4>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-gray-400 font-bold">
                                            <Users size={18} /> {poll.votes} Sakhis voted
                                        </div>
                                        <button
                                            onClick={() => handleVote(poll.id)}
                                            disabled={poll.voted}
                                            className={`px-8 py-3 rounded-2xl font-black shadow-lg transition-all ${poll.voted ? 'bg-green-500 text-white cursor-default' : 'bg-yellow-500 text-white hover:shadow-yellow-100 hover:scale-105'}`}
                                        >
                                            {poll.voted ? 'Voted!' : 'Cast Your Vote'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <MessageSquare size={200} />
                        </div>
                        <h3 className="text-3xl font-black mb-6 flex items-center gap-3 relative z-10">
                            <MessageSquare className="text-yellow-500" /> Discussion Rooms
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/20 cursor-pointer transition-all">
                                <p className="font-black text-xl mb-1">SHG Leaders Group</p>
                                <p className="text-white/60 text-sm">Update on monthly savings and loans</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/20 cursor-pointer transition-all">
                                <p className="font-black text-xl mb-1">Organic Farmers Circle</p>
                                <p className="text-white/60 text-sm">Discussion on new seed distribution</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar: Announcements */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[4rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                            <Bell className="text-yellow-600" /> Notifications
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full flex-shrink-0 animate-pulse"></div>
                                <div>
                                    <p className="font-black text-gray-800">New Scheme Announced</p>
                                    <p className="text-sm text-gray-400 font-bold">Today • 10:30 AM</p>
                                </div>
                            </div>
                            <div className="flex gap-4 opacity-70">
                                <div className="w-2 h-2 mt-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="font-black text-gray-800">Rampur Fair dates fixed</p>
                                    <p className="text-sm text-gray-400 font-bold">Yesterday • 04:15 PM</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-10 text-gray-400 font-black flex items-center justify-center gap-1 hover:text-gray-600 transition-colors">
                            View All History <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-10 rounded-[4rem] text-white shadow-xl relative overflow-hidden">
                        <h3 className="text-2xl font-black mb-4 relative z-10">Your Impact</h3>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center">
                                <User size={32} />
                            </div>
                            <div>
                                <p className="text-3xl font-black">12</p>
                                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Votes Cast</p>
                            </div>
                        </div>
                        <p className="text-white/80 font-medium relative z-10">
                            You are in the top 5% of active decision-makers in Rampur village!
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Community;
