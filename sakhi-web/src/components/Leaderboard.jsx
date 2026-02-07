import React from 'react';
import { Trophy, Award, TrendingUp, MapPin } from 'lucide-react';
import { getLeaderboard } from '../utils/gamification';

const Leaderboard = () => {
  const leaderboard = getLeaderboard();

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-white rounded-[4rem] shadow-2xl p-10 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <Trophy className="text-yellow-500" size={36} /> Top Sakhis
          </h3>
          <p className="text-gray-500 font-medium mt-2">Community leaderboard based on points & engagement</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-3xl">
          <TrendingUp size={24} />
        </div>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-4 p-5 rounded-3xl transition-all hover:scale-[1.02] ${
              entry.isCurrentUser
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg'
                : entry.rank <= 3
                ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200'
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            {/* Rank */}
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl font-black text-xl ${
              entry.rank === 1 ? 'bg-yellow-400 text-white' :
              entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
              entry.rank === 3 ? 'bg-orange-400 text-white' :
              'bg-white text-gray-600 border-2 border-gray-200'
            }`}>
              {getMedalIcon(entry.rank)}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-black text-lg ${entry.isCurrentUser ? 'text-orange-600' : 'text-gray-900'}`}>
                  {entry.name}
                  {entry.isCurrentUser && <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">YOU</span>}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={14} />
                  <span className="font-medium">{entry.village}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Award size={14} />
                  <span className="font-bold">{entry.badges} badges</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="text-3xl font-black text-gray-900">{entry.points.toLocaleString()}</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Points</div>
              <div className={`mt-2 px-4 py-1 rounded-full text-xs font-black ${
                entry.level >= 8 ? 'bg-purple-500 text-white' :
                entry.level >= 5 ? 'bg-blue-500 text-white' :
                'bg-gray-300 text-gray-700'
              }`}>
                Level {entry.level}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border-2 border-pink-200">
        <p className="text-center text-sm text-gray-700 font-medium">
          <span className="font-black">💡 Tip:</span> Earn more points by voting, listing products, asking health questions, and watching educational videos!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
