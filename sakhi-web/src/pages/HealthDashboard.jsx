import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, Droplet } from 'lucide-react';

const HealthDashboard = () => {
    const [healthData, setHealthData] = useState(() => {
        const saved = localStorage.getItem('health_tracking');
        return saved ? JSON.parse(saved) : {
            periodCycle: [],
            symptoms: [],
            mood: [],
            waterIntake: []
        };
    });

    const calculateAverageCycle = () => {
        if (healthData.periodCycle.length < 2) return null;
        
        const cycles = [];
        for (let i = 1; i < healthData.periodCycle.length; i++) {
            const prev = new Date(healthData.periodCycle[i - 1].date);
            const curr = new Date(healthData.periodCycle[i].date);
            const days = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
            cycles.push(days);
        }
        
        const avg = cycles.reduce((a, b) => a + b, 0) / cycles.length;
        return Math.round(avg);
    };

    const getLastPeriodDate = () => {
        if (healthData.periodCycle.length === 0) return null;
        return healthData.periodCycle[healthData.periodCycle.length - 1].date;
    };

    const predictNextPeriod = () => {
        const avgCycle = calculateAverageCycle();
        const lastDate = getLastPeriodDate();
        
        if (!avgCycle || !lastDate) return null;
        
        const next = new Date(lastDate);
        next.setDate(next.getDate() + avgCycle);
        return next.toLocaleDateString('en-IN');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-soft-pink via-white to-soft-purple py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 mb-8">Health Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Average Cycle */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-pink-100 p-3 rounded-2xl">
                                <Calendar className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700">Avg Cycle</h3>
                        </div>
                        <p className="text-3xl font-black text-gray-900">
                            {calculateAverageCycle() || '-'}
                            {calculateAverageCycle() && <span className="text-sm text-gray-500 ml-1">days</span>}
                        </p>
                    </div>

                    {/* Next Period */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-purple-100 p-3 rounded-2xl">
                                <TrendingUp className="text-purple-600" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700">Next Period</h3>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {predictNextPeriod() || 'Track to predict'}
                        </p>
                    </div>

                    {/* Period Tracked */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-red-100 p-3 rounded-2xl">
                                <Droplet className="text-red-600" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700">Tracked</h3>
                        </div>
                        <p className="text-3xl font-black text-gray-900">
                            {healthData.periodCycle.length}
                            <span className="text-sm text-gray-500 ml-1">cycles</span>
                        </p>
                    </div>

                    {/* Overall Health */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-green-100 p-3 rounded-2xl">
                                <Heart className="text-green-600" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700">Health Score</h3>
                        </div>
                        <p className="text-3xl font-black text-green-600">Good</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-black text-gray-900 mb-6">Recent Activity</h2>
                    
                    {healthData.periodCycle.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">No health data tracked yet</p>
                            <p className="text-sm text-gray-400">
                                Use Period Bot or Pregnancy Bot to start tracking your health
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {healthData.periodCycle.slice(-5).reverse().map((entry, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl">
                                    <div className="bg-primary p-3 rounded-xl">
                                        <Calendar className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Period Started</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(entry.date).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips */}
                <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white shadow-xl">
                    <h3 className="text-2xl font-black mb-4">Health Tip</h3>
                    <p className="text-lg">
                        Regular tracking helps predict your cycle more accurately. 
                        Chat with our health bots for personalized guidance!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HealthDashboard;
