import React, { useState, useEffect } from 'react';
import { X, Plus, Phone, Trash2, Users, ShieldAlert, Check } from 'lucide-react';

const SafetyCircleModal = ({ isOpen, onClose }) => {
    const [safetyCircle, setSafetyCircle] = useState(() => {
        const saved = localStorage.getItem('safety_circle');
        return saved ? JSON.parse(saved) : [];
    });

    const [newContact, setNewContact] = useState({
        name: '',
        phone: '',
        relation: ''
    });

    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        localStorage.setItem('safety_circle', JSON.stringify(safetyCircle));
    }, [safetyCircle]);

    const handleAddContact = (e) => {
        e.preventDefault();
        if (newContact.name && newContact.phone) {
            setSafetyCircle([...safetyCircle, {
                ...newContact,
                id: Date.now(),
                addedDate: new Date().toISOString()
            }]);
            setNewContact({ name: '', phone: '', relation: '' });
            setShowAddForm(false);
        }
    };

    const handleRemoveContact = (id) => {
        if (window.confirm('Remove this person from your safety circle?')) {
            setSafetyCircle(safetyCircle.filter(c => c.id !== id));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-secondary to-primary p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-4 rounded-3xl">
                            <Users size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black">My Safety Circle</h2>
                            <p className="text-white/80 font-medium">
                                {safetyCircle.length} trusted contact{safetyCircle.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[60vh]">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="text-blue-600 flex-shrink-0" size={24} />
                            <div>
                                <p className="font-bold text-blue-900 mb-1">How it works</p>
                                <p className="text-sm text-blue-700">
                                    When you press the SOS button, all contacts in your safety circle will receive an emergency SMS with your location and a distress alert.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contacts List */}
                    {safetyCircle.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users size={40} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-bold mb-2">No contacts in your safety circle</p>
                            <p className="text-sm text-gray-400">Add trusted contacts who will be notified in emergencies</p>
                        </div>
                    ) : (
                        <div className="space-y-3 mb-6">
                            {safetyCircle.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-100 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-secondary/10 p-3 rounded-xl">
                                            <Users className="text-secondary" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900">{contact.name}</p>
                                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                                <Phone size={14} />
                                                {contact.phone}
                                            </p>
                                            {contact.relation && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {contact.relation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveContact(contact.id)}
                                        className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Contact Form */}
                    {showAddForm ? (
                        <form onSubmit={handleAddContact} className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                            <h3 className="font-black text-gray-900 mb-4">Add New Contact</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newContact.name}
                                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={newContact.phone}
                                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Relation (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={newContact.relation}
                                        onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="e.g., Sister, Friend, SHG Leader"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check size={20} />
                                        Add Contact
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setNewContact({ name: '', phone: '', relation: '' });
                                        }}
                                        className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Plus size={20} />
                            Add New Contact
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SafetyCircleModal;
