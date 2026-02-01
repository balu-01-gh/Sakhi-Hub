import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-soft-pink via-white to-soft-purple p-4">
            <div className="text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="relative mb-8">
                    <SearchX size={120} className="mx-auto text-primary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-black text-primary">404</span>
                    </div>
                </div>
                
                <h1 className="text-4xl font-black text-gray-900 mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                
                <div className="flex gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
