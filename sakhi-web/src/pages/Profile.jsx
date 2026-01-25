import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Package, CreditCard, MessageCircle, ArrowRight, CheckCircle2, Clock, ShoppingBag, Plus, Trash2 } from 'lucide-react';

const Profile = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('orders');
    const userName = localStorage.getItem('user_name') || 'Lakshmi';
    const [isCreator, setIsCreator] = useState(localStorage.getItem('is_creator') === 'true');

    const [orders] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('orders') || '[]');
        return saved.length > 0 ? saved : [
            { id: 'ORD001', name: 'Woven Bamboo Basket', date: '2026-01-20', price: 350, status: 'completed' },
            { id: 'ORD002', name: 'Hand-Embroidered Scarf', date: '2026-01-22', price: 850, status: 'pending' },
        ];
    });

    const [payments] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('payments') || '[]');
        return saved.length > 0 ? saved : [
            { id: 'PAY001', amount: 350, date: '2026-01-20', status: 'completed' },
            { id: 'PAY002', amount: 850, date: '2026-01-22', status: 'completed' },
        ];
    });

    const [myProducts, setMyProducts] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('my_products') || '[]');
        return saved;
    });

    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Handicrafts' });

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            id: Date.now(),
            image_url: 'https://images.unsplash.com/photo-1590422476484-2a144e6ba1e3?auto=format&fit=crop&q=80&w=400',
            location: 'My Village'
        };
        const updated = [product, ...myProducts];
        setMyProducts(updated);
        localStorage.setItem('my_products', JSON.stringify(updated));
        setShowAddForm(false);
        setNewProduct({ name: '', price: '', category: 'Handicrafts' });

        // Dynamic marketplace update
        const allProducts = JSON.parse(localStorage.getItem('all_products') || '[]');
        localStorage.setItem('all_products', JSON.stringify([product, ...allProducts]));
    };

    const deleteProduct = (id) => {
        const updated = myProducts.filter(p => p.id !== id);
        setMyProducts(updated);
        localStorage.setItem('my_products', JSON.stringify(updated));

        const allProducts = JSON.parse(localStorage.getItem('all_products') || '[]');
        localStorage.setItem('all_products', JSON.stringify(allProducts.filter(p => p.id !== id)));
    };

    const getSavedChats = () => {
        const chats = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('chat_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    const parts = key.split('_');
                    chats.push({
                        key,
                        creator: parts[1].replace(/_/g, ' '),
                        product: parts[2].replace(/_/g, ' '),
                        lastMessage: data[data.length - 1].content,
                        messageCount: data.length
                    });
                } catch (e) { }
            }
        }
        return chats;
    };

    const savedChats = getSavedChats();

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-12">

                {/* Sidebar */}
                <div className="md:w-1/3">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-xl border border-white sticky top-24">
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg relative">
                                <User size={48} />
                                {isCreator && <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-black p-1.5 rounded-full border-2 border-white text-gray-900">PRO</div>}
                            </div>
                            <h2 className="text-2xl font-black text-gray-900">{userName}</h2>
                            <p className="text-gray-500 font-medium">98765 43210</p>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-pink-100' : 'text-gray-600 hover:bg-pink-50'}`}
                            >
                                <Package size={20} /> {t.myOrders}
                            </button>
                            <button
                                onClick={() => setActiveTab('payments')}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'payments' ? 'bg-primary text-white shadow-lg shadow-pink-100' : 'text-gray-600 hover:bg-pink-50'}`}
                            >
                                <CreditCard size={20} /> {t.paymentHistory}
                            </button>
                            <button
                                onClick={() => setActiveTab('chats')}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'chats' ? 'bg-primary text-white shadow-lg shadow-pink-100' : 'text-gray-600 hover:bg-pink-50'}`}
                            >
                                <MessageCircle size={20} /> {t.chatWithCreator}
                            </button>

                            {isCreator ? (
                                <button
                                    onClick={() => setActiveTab('my-shop')}
                                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'my-shop' ? 'bg-secondary text-white shadow-lg shadow-purple-100' : 'text-purple-600 hover:bg-purple-50'}`}
                                >
                                    <ShoppingBag size={20} /> {t.myShop}
                                </button>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-2xl mt-6 border border-dashed border-gray-200">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Artisan Status</p>
                                    <button
                                        onClick={() => { localStorage.setItem('is_creator', 'true'); setIsCreator(true); }}
                                        className="w-full text-xs font-black text-secondary hover:underline text-left flex items-center gap-2"
                                    >
                                        <Plus size={14} /> Register Store
                                    </button>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:w-2/3">
                    <div className="bg-white/50 backdrop-blur-xl p-10 rounded-[4rem] shadow-xl border border-white/50 min-h-[600px]">

                        {activeTab === 'orders' && (
                            <div className="animate-fadeIn">
                                <h2 className="text-4xl font-black text-gray-900 mb-8">{t.myOrders}</h2>
                                <div className="space-y-6">
                                    {orders.map(order => (
                                        <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-pink-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                    <Package className="text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg text-gray-800">{order.name}</h3>
                                                    <p className="text-sm text-gray-400 font-bold">{order.date} • {order.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-secondary">₹{order.price}</p>
                                                <div className={`text-xs font-black uppercase tracking-widest flex items-center gap-1 justify-end mt-1 ${order.status === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                                                    {order.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                                    {order.status === 'completed' ? t.completed : t.pending}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && (
                            <div className="animate-fadeIn">
                                <h2 className="text-4xl font-black text-gray-900 mb-8">{t.paymentHistory}</h2>
                                <div className="space-y-6">
                                    {payments.map(payment => (
                                        <div key={payment.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-green-50 p-3 rounded-2xl">
                                                    <CreditCard className="text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg text-gray-800">Payment {payment.id}</h3>
                                                    <p className="text-sm text-gray-400 font-bold">{payment.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-green-600">₹{payment.amount}</p>
                                                <div className="text-xs font-black text-green-500 uppercase tracking-widest mt-1">
                                                    {t.completed}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'chats' && (
                            <div className="animate-fadeIn flex flex-col h-full">
                                <h2 className="text-4xl font-black text-gray-900 mb-8">{t.chatWithCreator}</h2>
                                {savedChats.length > 0 ? (
                                    <div className="space-y-4">
                                        {savedChats.map((chat, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-primary/30 transition-all cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-secondary/10 p-3 rounded-2xl">
                                                        <MessageCircle className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-lg text-gray-800">{chat.creator} ({chat.product})</h3>
                                                        <p className="text-sm text-gray-400 font-bold truncate max-w-xs">{chat.lastMessage}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-secondary text-white text-xs font-black px-2 py-1 rounded-full">
                                                    {chat.messageCount} msg
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col justify-center items-center text-center p-12 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                        <div className="bg-white p-6 rounded-full shadow-lg mb-6 text-primary">
                                            <MessageCircle size={48} />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800 mb-2">No active chats</h3>
                                        <p className="text-gray-500 font-medium mb-8">Start a conversation from any product page to ask questions about the heritage and art.</p>
                                        <button
                                            onClick={() => window.location.href = '/skill-hub'}
                                            className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:shadow-pink-100 flex items-center gap-2"
                                        >
                                            Visit Marketplace <ArrowRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'my-shop' && (
                            <div className="animate-fadeIn">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-4xl font-black text-gray-900">{t.myShop}</h2>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="bg-secondary text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <Plus size={24} /> {t.addProduct}
                                    </button>
                                </div>

                                {showAddForm && (
                                    <div className="bg-purple-50 p-8 rounded-[3rem] mb-12 border border-purple-100 shadow-inner animate-fadeIn">
                                        <h3 className="text-xl font-black text-secondary mb-6">{t.addProduct}</h3>
                                        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t.productName}</label>
                                                <input required className="w-full bg-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 font-medium" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="e.g. Hand-carved Clay Pot" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t.price}</label>
                                                <input required type="number" className="w-full bg-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 font-medium" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="500" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <button type="submit" className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-purple-800 transition-all uppercase tracking-widest">
                                                    {t.saveChanges}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {myProducts.length > 0 ? myProducts.map(product => (
                                        <div key={product.id} className="bg-white p-5 rounded-[3rem] shadow-sm border border-gray-100 group relative overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                                            <div className="h-48 bg-gray-50 rounded-[2.5rem] overflow-hidden mb-5">
                                                <img src={product.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="flex-grow px-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-black text-2xl text-gray-900">{product.name}</h4>
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-xs font-black">ACTIVE</span>
                                                </div>
                                                <p className="text-3xl font-black text-secondary">₹{product.price}</p>
                                            </div>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="absolute top-8 right-8 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-500 shadow-xl hover:bg-red-500 hover:text-white transition-all scale-0 group-hover:scale-100"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="col-span-full py-24 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                            <ShoppingBag size={80} className="mx-auto mb-6 text-gray-200" />
                                            <p className="font-black text-2xl text-gray-300">Your store is currently empty</p>
                                            <p className="text-gray-400 font-medium mt-2">Add your first product to start selling!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
