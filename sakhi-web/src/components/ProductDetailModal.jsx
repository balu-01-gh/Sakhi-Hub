import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import UserChatModal from './UserChatModal';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
    const { t } = useLanguage();
    const [orderDone, setOrderDone] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    if (!isOpen || !product) return null;

    const handleBuy = () => {
        setOrderDone(true);

        // Save to localStorage
        const newOrder = {
            id: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            name: product.name,
            date: new Date().toISOString().split('T')[0],
            price: product.price,
            status: 'completed'
        };

        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...savedOrders]));

        // Save to payments too
        const newPayment = {
            id: `PAY${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            amount: product.price,
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };
        const savedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
        localStorage.setItem('payments', JSON.stringify([newPayment, ...savedPayments]));

        setTimeout(() => {
            setOrderDone(false);
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row border border-white/20">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-all border border-white/30"
                >
                    <X size={24} />
                </button>

                {/* Left: Product Image */}
                <div className="md:w-1/2 h-80 md:h-auto bg-gray-100 relative">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-2 rounded-xl font-black text-sm shadow-xl">
                        {t.villageMarket} Item
                    </div>
                </div>

                {/* Right: Info & Buy */}
                <div className="md:w-1/2 p-10 flex flex-col">
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4">
                            <ShieldCheck size={18} /> Verified Village Artist
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-2">{product.name}</h2>
                        <p className="text-gray-500 font-medium mb-6 flex items-center gap-2">
                            Made in {product.location} village
                        </p>

                        <div className="bg-gray-50 p-6 rounded-3xl mb-8">
                            <span className="text-gray-400 font-bold uppercase text-xs tracking-widest block mb-1">{t.price}</span>
                            <div className="text-5xl font-black text-secondary">
                                ₹{product.price}<span className="text-lg text-gray-400 ml-1">ONLY</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                100% Hand-crafted quality
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Direct income to local sakhi
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Sustainable & eco-friendly materials
                            </div>
                        </div>
                    </div>

                    {orderDone ? (
                        <div className="bg-green-100 text-green-700 p-6 rounded-3xl text-center font-black animate-bounce border border-green-200">
                            ✅ SUCCESS! YOUR ORDER IS PLACED!
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="w-full bg-white border-2 border-secondary text-secondary py-4 rounded-[2rem] font-black text-lg hover:bg-secondary/5 transition-all flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={24} /> {t.chatWithCreator}
                            </button>
                            <button
                                onClick={handleBuy}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-pink-100 hover:shadow-pink-200 hover:-translate-y-1 transition-all active:translate-y-0 flex items-center justify-center gap-3"
                            >
                                <ShoppingCart size={24} /> {t.buy} Now
                            </button>
                        </div>
                    )}

                    <p className="text-center text-gray-400 text-sm mt-4 font-medium">
                        Payments handled securely by Sakhi Banking Service
                    </p>
                </div>
            </div>

            <UserChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                creatorName="Artisan Sakhi"
                productName={product.name}
            />
        </div>
    );
};

export default ProductDetailModal;
