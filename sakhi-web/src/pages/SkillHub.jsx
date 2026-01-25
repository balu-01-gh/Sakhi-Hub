import React, { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import ProductCard from '../components/ProductCard';
import RegisterModal from '../components/RegisterModal';
import ProductDetailModal from '../components/ProductDetailModal';
import { getCreators, getProducts } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingBag, Users, Sparkles, Filter } from 'lucide-react';

const MOCK_CREATORS = [
    { id: 1, name: "Lakshmi Devi", village: "Rampur", skill_category: "Pottery & Clay", experience: "15 Years", contact: "9876543210", work_samples: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400"] },
    { id: 2, name: "Rani Kumari", village: "Sitapur", skill_category: "Tailoring", experience: "5 Years", contact: "9123456780", work_samples: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=400"] },
    { id: 3, name: "Sita Verma", village: "Kishanpur", skill_category: "Art", experience: "10 Years", contact: "8877665544", work_samples: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400"] },
    { id: 4, name: "Maya Singh", village: "Bilaspur", skill_category: "Handicrafts", experience: "8 Years", contact: "7766554433", work_samples: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400"] },
    { id: 5, name: "Geeta Bai", village: "Durgpur", skill_category: "Pottery & Clay", experience: "20 Years", contact: "6655443322", work_samples: ["https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&q=80&w=400"] },
    { id: 6, name: "Anita Rao", village: "Sonapur", skill_category: "Tailoring", experience: "12 Years", contact: "5544332211", work_samples: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400"] },
];

const MOCK_PRODUCTS = [
    { id: 101, name: "Hand-Painted Clay Pot", price: 450, location: "Rampur", image_url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400" },
    { id: 102, name: "Silk Embroidered Dupatta", price: 1250, location: "Sitapur", image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400" },
    { id: 103, name: "Madhubani Canvas", price: 2100, location: "Kishanpur", image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400" },
    { id: 104, name: "Bamboo Serving Tray", price: 680, location: "Bilaspur", image_url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400" },
    { id: 105, name: "Terracotta Wall Plate", price: 890, location: "Durgpur", image_url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&q=80&w=400" },
    { id: 106, name: "Cotton Chikankari Kurta", price: 1550, location: "Sonapur", image_url: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400" },
];

const SkillHub = () => {
    const { t } = useLanguage();
    const [creators, setCreators] = useState(MOCK_CREATORS);
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Pottery & Clay', 'Tailoring', 'Art', 'Handicrafts'];

    useEffect(() => {
        // Load dynamic data from localStorage
        const dynamicProducts = JSON.parse(localStorage.getItem('all_products') || '[]');
        const dynamicCreators = JSON.parse(localStorage.getItem('all_creators') || '[]');

        // Merge and unique
        const combinedProducts = [...dynamicProducts, ...MOCK_PRODUCTS];
        const uniqueProducts = combinedProducts.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

        const combinedCreators = [...dynamicCreators, ...MOCK_CREATORS];
        const uniqueCreators = combinedCreators.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

        setProducts(uniqueProducts);
        setCreators(uniqueCreators);
    }, []);

    const handleRegister = (newCreator) => {
        setCreators([newCreator, ...creators]);
        const dynamicCreators = JSON.parse(localStorage.getItem('all_creators') || '[]');
        localStorage.setItem('all_creators', JSON.stringify([newCreator, ...dynamicCreators]));
        localStorage.setItem('is_creator', 'true');
        alert("Registration Successful! You can now manage your shop in your Profile.");
    };

    const filteredCreators = filter === 'All'
        ? creators
        : creators.filter(c => c.skill_category.toLowerCase().includes(filter.toLowerCase()));

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => {
            const name = p.name.toLowerCase();
            if (filter === 'Pottery & Clay') return name.includes('pot') || name.includes('clay') || name.includes('terracotta');
            if (filter === 'Tailoring') return name.includes('dupatta') || name.includes('kurta') || name.includes('scarf') || name.includes('dress');
            if (filter === 'Art') return name.includes('art') || name.includes('painting') || name.includes('canvas');
            if (filter === 'Handicrafts') return name.includes('basket') || name.includes('tray') || name.includes('bamboo');
            return true;
        });

    return (
        <div className="container mx-auto px-4 py-12 space-y-24 max-w-7xl animate-fadeIn">

            {/* CREATORS SECTION */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-4 justify-center md:justify-start">
                            <Users size={18} className="animate-pulse" /> {t.skills} Community
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tight mb-4">Local Sakhis</h2>
                        <p className="text-gray-500 text-xl max-w-2xl leading-relaxed">Meet the incredible women powering our rural economy through their heritage and talent.</p>
                    </div>
                    <button
                        onClick={() => setIsRegisterOpen(true)}
                        className="bg-gradient-to-br from-secondary to-purple-800 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-1.5 transition-all active:translate-y-0 flex items-center gap-3"
                    >
                        < Sparkles size={20} /> {t.registerAsCreator}
                    </button>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${filter === cat ? 'bg-secondary border-secondary text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-secondary/30 hover:text-secondary'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredCreators.map(creator => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            </section>

            {/* PRODUCTS SECTION */}
            <section className="bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50 p-12 md:p-20 rounded-[4rem] border border-orange-100/50 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-20 opacity-[0.03] rotate-12">
                    <ShoppingBag size={500} className="text-orange-600" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 relative z-10 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 justify-center md:justify-start">
                            <Sparkles size={18} /> {t.villageMarket}
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tight mb-4">Direct from Village</h2>
                        <p className="text-orange-950/60 text-xl max-w-2xl leading-relaxed">Every purchase directly supports a village household and preserves traditional art forms.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 text-orange-600 hover:bg-orange-50 transition-colors">
                            <Filter size={24} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={(p) => setSelectedProduct(p)}
                        />
                    ))}
                </div>
            </section>

            {/* Modals */}
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onRegister={handleRegister}
            />

            <ProductDetailModal
                isOpen={!!selectedProduct}
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

        </div>
    );
};

export default SkillHub;
