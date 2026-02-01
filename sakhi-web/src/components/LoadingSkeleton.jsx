import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white/70 p-8 rounded-[3rem] shadow-xl h-[400px] animate-pulse">
                <div className="bg-gray-200 w-16 h-16 rounded-3xl mb-4 mx-auto"></div>
                <div className="bg-gray-200 h-8 w-3/4 rounded-xl mb-2 mx-auto"></div>
                <div className="bg-gray-200 h-4 w-full rounded-lg mb-2"></div>
                <div className="bg-gray-200 h-4 w-5/6 rounded-lg mb-6"></div>
                <div className="bg-gray-200 h-12 w-32 rounded-full mx-auto"></div>
            </div>
        );
    }

    if (type === 'profile') {
        return (
            <div className="animate-pulse space-y-4">
                <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <div className="bg-gray-200 h-8 w-48 rounded-xl mx-auto mb-2"></div>
                <div className="bg-gray-200 h-4 w-32 rounded-lg mx-auto"></div>
            </div>
        );
    }

    if (type === 'list') {
        return (
            <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-200 h-20 rounded-2xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gray-200 h-64 rounded-3xl animate-pulse"></div>
    );
};

export default LoadingSkeleton;
