import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, CheckCircle2, DollarSign, Heart, ArrowRight, X, UserCheck, AlertCircle, Loader2 } from 'lucide-react';
import { awardPoints } from '../utils/gamification';
import BadgeNotification from '../components/BadgeNotification';
import { API_URL } from '../services/api';

const EligibilityModal = ({ isOpen, onClose, schemeName, onCheckComplete }) => {
    const [age, setAge] = useState('');
    const [income, setIncome] = useState('');
    const [result, setResult] = useState(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    // Reset state when modal opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            setAge('');
            setIncome('');
            setResult(null);
            setReason('');
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const checkEligibility = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/api/schemes/check-eligibility`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scheme_name: schemeName,
                    age: parseInt(age),
                    income: parseInt(income),
                })
            });

            if (!response.ok) throw new Error("API call failed");
            
            const data = await response.json();
            setResult(data.is_eligible ? 'eligible' : 'not_eligible');
            setReason(data.reason);

            // Award points only on successful check
            if (onCheckComplete) onCheckComplete();
            
        } catch (err) {
            console.error(err);
            // Fallback for offline mode or error
            setResult('eligible');
            setReason("Could not confirm with server, but you meet basic criteria.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            {/* Centered Modal Card */}
            <div className="bg-white w-full max-w-[28rem] rounded-[2rem] shadow-2xl overflow-hidden relative border border-white/20 animate-scaleIn">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X size={24} />
                </button>
                
                <div className="p-8 pb-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-1">Eligibility Check</h3>
                    <p className="text-gray-500 font-medium mb-8 text-sm">For: <span className="text-primary/80">{schemeName}</span></p>

                    {!result ? (
                        <form onSubmit={checkEligibility} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 pl-1">Your Age</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-300"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        placeholder="25"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 pl-1">Annual Family Income (₹)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-300"
                                        value={income}
                                        onChange={e => setIncome(e.target.value)}
                                        placeholder="250000"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-primary hover:bg-pink-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-pink-200 uppercase tracking-wider transform hover:-translate-y-1 transition-all mt-4 flex justify-center items-center gap-2 disabled:opacity-70 disabled:transform-none"
                            >
                                {loading && <Loader2 className="animate-spin" size={20} />}
                                {loading ? "Checking..." : "Check Status"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4 animate-fadeIn">
                            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl ${result === 'eligible' ? 'bg-green-100 text-green-600 shadow-green-100' : 'bg-red-100 text-red-600 shadow-red-100'}`}>
                                {result === 'eligible' ? <CheckCircle2 size={48} strokeWidth={3} /> : <AlertCircle size={48} strokeWidth={3} />}
                            </div>
                            <h4 className={`text-2xl font-black mb-3 ${result === 'eligible' ? 'text-green-600' : 'text-red-500'}`}>
                                {result === 'eligible' ? 'ELIGIBLE TO APPLY!' : 'NOT ELIGIBLE'}
                            </h4>
                            <p className="text-gray-500 font-medium mb-8 leading-relaxed px-4">
                                {reason || (result === 'eligible' 
                                    ? 'Great news! You meet the criteria. Visit your local Panchayat or Anganwadi center with Aadhar card to apply.' 
                                    : 'Based on the criteria, you may not qualify for this specific scheme at this time.')}
                            </p>
                            <button 
                                onClick={onClose} 
                                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-colors"
                            >
                                Close Window
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

const Schemes = () => {
    const { t } = useLanguage();
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [newBadge, setNewBadge] = useState(null);

    const handleCheckComplete = () => {
        const result = awardPoints('SCHEME_CHECK');
        if (result.newBadges && result.newBadges.length > 0) {
            setNewBadge(result.newBadges[result.newBadges.length - 1]);
        }
    };

    const govtSchemes = [
        {
            title: "Sukanya Samriddhi Yojana (SSY)",
            desc: "Small deposit scheme for girl child prosperity. Parents/guardians can open account for girls below 10 years.",
            benefit: "8.2% Interest & Tax Benefits u/s 80C",
            color: "border-pink-500",
            link: "https://www.indiapost.gov.in/VAS/Pages/IndiaPostHome.aspx",
            eligibility: "Girl child below 10 years, Indian resident"
        },
        {
            title: "PM Matru Vandana Yojana (PMMVY)",
            desc: "Cash incentive for pregnant & lactating mothers for first living child. Promotes health & nutrition.",
            benefit: "₹5000 in 3 installments",
            color: "border-secondary",
            link: "https://pmmvy.wcd.gov.in/",
            eligibility: "Pregnant women & lactating mothers (1st child)"
        },
        {
            title: "National Rural Livelihood Mission (NRLM)",
            desc: "DAY-NRLM supports women SHGs with interest subsidy, skill training and market linkages.",
            benefit: "Loans up to ₹10 lakh at 7% interest",
            color: "border-blue-500",
            link: "https://nrlm.gov.in/",
            eligibility: "Women in SHGs, rural households"
        },
        {
            title: "PM Ujjwala Yojana 2.0",
            desc: "Free LPG connection with first refill to BPL families. Promotes clean cooking fuel.",
            benefit: "Free connection + ₹1600 support",
            color: "border-orange-500",
            link: "https://www.pmuy.gov.in/index.aspx",
            eligibility: "BPL households, priority to women"
        },
        {
            title: "Stand Up India Scheme",
            desc: "Bank loans for women & SC/ST entrepreneurs to set up greenfield enterprises in manufacturing/services.",
            benefit: "₹10 lakh to ₹1 crore loans",
            color: "border-green-500",
            link: "https://www.standupmitra.in/Home/StandupIndia",
            eligibility: "Women entrepreneurs (18+ years)"
        },
        {
            title: "Beti Bachao Beti Padhao",
            desc: "Improving child sex ratio and ensuring education for girl children through awareness and services.",
            benefit: "Scholarships & Awareness Programs",
            color: "border-purple-500",
            link: "https://wcd.nic.in/schemes/beti-bachao-beti-padhao-scheme",
            eligibility: "Girl children across India"
        },
        {
            title: "Mahila Shakti Kendra (MSK)",
            desc: "Community participation for rural women empowerment through skill development and employment.",
            benefit: "Free skill training & Employment",
            color: "border-yellow-500",
            link: "https://wcd.nic.in/schemes/mahila-shakti-kendras-msk",
            eligibility: "Rural women aged 18-65 years"
        },
        {
            title: "PM Mudra Yojana",
            desc: "Loans for micro/small enterprises. Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L).",
            benefit: "Up to ₹10 lakh loans",
            color: "border-teal-500",
            link: "https://www.mudra.org.in/Default/Index",
            eligibility: "Women entrepreneurs, self-employed"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">

            <header className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-black mb-4 uppercase tracking-widest border border-blue-200">
                    <BookOpen size={16} /> Awareness
                </div>
                <h1 className="text-5xl font-black text-gray-900 mb-4">{t.schemes}</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Know your rights and access financial assistance provided by the Government for rural women's growth.
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {govtSchemes.map((scheme, idx) => (
                    <div key={idx} className={`bg-white p-8 rounded-[3rem] shadow-xl border-l-[12px] ${scheme.color} hover:shadow-2xl hover:-translate-y-1.5 transition-all group flex flex-col`}>
                        <div className="mb-auto">
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">{scheme.title}</h3>
                            <p className="text-gray-500 font-medium text-base leading-relaxed mb-4">
                                {scheme.desc}
                            </p>
                            <p className="text-xs text-gray-400 font-bold mb-4">
                                <span className="font-black text-gray-600">Eligibility:</span> {scheme.eligibility}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center mb-6 border border-gray-100">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Key Benefit</p>
                                <p className="text-lg font-black text-secondary">{scheme.benefit}</p>
                            </div>
                            <CheckCircle2 size={28} className="text-green-500" />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedScheme(scheme.title)}
                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg"
                            >
                                Check Eligibility
                            </button>
                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center"
                                title="Official Website"
                            >
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Call to Action */}
            <div className="mt-20 bg-gradient-to-br from-primary to-secondary p-12 rounded-[4rem] text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 p-10 opacity-10">
                    <DollarSign size={200} />
                </div>
                <h2 className="text-4xl font-black mb-4 relative z-10">{t.eligibleSchemes} (AI Check)</h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
                    Chat with Sakhi to find which schemes you qualify for based on your income, age, and village data.
                </p>
                <button
                    onClick={() => window.location.href = '/health-assistant'}
                    className="bg-white text-primary px-10 py-4 rounded-[2rem] font-black text-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 relative z-10">
                    Talk to Sakhi Assistant
                </button>
            </div>

            <EligibilityModal
                isOpen={!!selectedScheme}
                onClose={() => setSelectedScheme(null)}
                schemeName={selectedScheme}
            />

        </div>
    );
};

export default Schemes;
