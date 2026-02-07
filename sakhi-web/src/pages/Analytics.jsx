import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, MessageSquare, ShoppingBag, GraduationCap, Activity, Award } from 'lucide-react';
import { getGamificationData } from '../utils/gamification';
import Leaderboard from '../components/Leaderboard';

const Analytics = () => {
  const [gamificationData, setGamificationData] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    const data = getGamificationData();
    setGamificationData(data);
  }, []);

  // Mock analytics data (in real app, would come from backend)
  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 980 },
    { month: 'Feb', users: 1450, active: 1180 },
    { month: 'Mar', users: 1680, active: 1320 },
    { month: 'Apr', users: 1920, active: 1580 },
    { month: 'May', users: 2150, active: 1750 },
    { month: 'Jun', users: 2380, active: 1920 },
  ];

  const healthBotUsageData = [
    { name: 'Period Bot', queries: 850, color: '#ec4899' },
    { name: 'Pregnancy Bot', queries: 620, color: '#8b5cf6' },
    { name: 'Krishi Bot', queries: 540, color: '#10b981' },
  ];

  const communityEngagementData = [
    { day: 'Mon', votes: 45, discussions: 23 },
    { day: 'Tue', votes: 52, discussions: 31 },
    { day: 'Wed', votes: 38, discussions: 19 },
    { day: 'Thu', votes: 61, discussions: 42 },
    { day: 'Fri', votes: 48, discussions: 27 },
    { day: 'Sat', votes: 73, discussions: 56 },
    { day: 'Sun', votes: 65, discussions: 48 },
  ];

  const skillHubActivityData = [
    { category: 'Pottery', products: 42, views: 1250 },
    { category: 'Tailoring', products: 38, views: 980 },
    { category: 'Art', products: 31, views: 720 },
    { category: 'Handicrafts', products: 28, views: 650 },
  ];

  const educationProgressData = [
    { name: 'Completed', value: 68, color: '#10b981' },
    { name: 'In Progress', value: 24, color: '#f59e0b' },
    { name: 'Not Started', value: 8, color: '#6b7280' },
  ];

  const stats = [
    { label: 'Total Users', value: '2,380', change: '+12%', icon: <Users />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Sessions', value: '1,920', change: '+8%', icon: <Activity />, color: 'from-green-500 to-emerald-500' },
    { label: 'Health Queries', value: '2,010', change: '+15%', icon: <MessageSquare />, color: 'from-pink-500 to-rose-500' },
    { label: 'Products Listed', value: '139', change: '+23%', icon: <ShoppingBag />, color: 'from-purple-500 to-violet-500' },
    { label: 'Videos Watched', value: '4,560', change: '+31%', icon: <GraduationCap />, color: 'from-orange-500 to-amber-500' },
    { label: 'Badges Earned', value: gamificationData ? gamificationData.badges.length.toString() : '0', change: 'Personal', icon: <Award />, color: 'from-yellow-400 to-orange-500' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#6b7280', '#ec4899', '#8b5cf6'];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-fadeIn">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest mb-4">
          <TrendingUp size={18} /> Analytics Dashboard
        </div>
        <h2 className="text-6xl font-black text-gray-900 tracking-tight mb-4">Platform Insights</h2>
        <p className="text-gray-500 text-xl font-medium">
          Real-time analytics and engagement metrics for SAKHI HUB community
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-3 mb-8">
        {['week', 'month', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-2xl font-bold transition-all ${
              timeRange === range
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                {React.cloneElement(stat.icon, { size: 28 })}
              </div>
              <span className="text-sm font-black bg-white/20 px-3 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-5xl font-black mb-2">{stat.value}</h3>
            <p className="text-white/90 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* User Growth Chart */}
        <div className="bg-white rounded-[4rem] shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 'bold'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} name="Total Users" />
              <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={3} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Health Bot Usage Chart */}
        <div className="bg-white rounded-[4rem] shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Health Bot Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={healthBotUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="queries"
              >
                {healthBotUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 'bold'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Community Engagement Chart */}
        <div className="bg-white rounded-[4rem] shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Community Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={communityEngagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 'bold'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }} />
              <Bar dataKey="votes" fill="#ec4899" radius={[10, 10, 0, 0]} name="Votes Cast" />
              <Bar dataKey="discussions" fill="#8b5cf6" radius={[10, 10, 0, 0]} name="Discussions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Hub Activity Chart */}
        <div className="bg-white rounded-[4rem] shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Skill Hub Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillHubActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 'bold'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }} />
              <Bar dataKey="products" fill="#f59e0b" radius={[10, 10, 0, 0]} name="Products Listed" />
              <Bar dataKey="views" fill="#3b82f6" radius={[10, 10, 0, 0]} name="Product Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Education Progress & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-[4rem] shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Education Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={educationProgressData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {educationProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  padding: '16px',
                  fontWeight: 'bold'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {educationProgressData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-bold text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-black text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Leaderboard />
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-[4rem] p-10 border-2 border-blue-200">
        <h3 className="text-3xl font-black text-gray-900 mb-6">📊 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h4 className="font-black text-lg text-gray-900 mb-2">🚀 Fastest Growing Category</h4>
            <p className="text-gray-600 font-medium">Educational videos saw a <strong className="text-green-600">31% increase</strong> in viewership this month!</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h4 className="font-black text-lg text-gray-900 mb-2">💬 Most Engaged Day</h4>
            <p className="text-gray-600 font-medium">Saturday has the <strong className="text-purple-600">highest community engagement</strong> with 73 votes and 56 discussions.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h4 className="font-black text-lg text-gray-900 mb-2">🏥 Top Health Bot</h4>
            <p className="text-gray-600 font-medium">Period Bot leads with <strong className="text-pink-600">850 queries</strong>, serving the most users this month.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h4 className="font-black text-lg text-gray-900 mb-2">🛍️ Popular Skill Category</h4>
            <p className="text-gray-600 font-medium">Pottery products receive the <strong className="text-orange-600">most views (1,250)</strong> in the marketplace.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
