import React from 'react';
import { ShoppingCart, MapPin } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div
            onClick={() => onClick(product)}
            className="group bg-white rounded-[2.5rem] shadow-xl overflow-hidden card-hover border border-orange-100/50 cursor-pointer relative"
        >
            <div className="h-56 bg-gray-100 overflow-hidden relative">
                <img
                    src={product.image_url || 'https://placehold.co/300x200'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-black text-orange-600 shadow-sm">
                    {product.location}
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-black text-xl text-gray-800 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-3xl font-black text-secondary">₹{product.price}</p>
                    <div className="bg-orange-50 text-orange-600 p-2 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                        <ShoppingCart size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
