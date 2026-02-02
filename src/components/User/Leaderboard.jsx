import { useState } from 'react';
import { leaderboardData } from '../../data/leaderboard';
import { categories } from '../../data/categories';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('overall');
  const [selectedCategory, setSelectedCategory] = useState(1);

  const tabs = [
    { id: 'overall', label: 'Overall', icon: '🌍' },
    { id: 'category', label: 'Category', icon: '📚' },
    { id: 'daily', label: 'Daily Quiz', icon: '🎯' },
  ];

  const renderLeaderboardItem = (item, index) => (
    <div 
      key={index}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        item.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
      }`}
    >
      {/* Rank */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
        item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
        item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
        item.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white' :
        'bg-muted text-muted-foreground'
      }`}>
        {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 flex-1">
        <div className="text-2xl">{item.avatar}</div>
        <div>
          <p className="font-semibold text-foreground">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {item.quizzes ? `${item.quizzes} quizzes` : `Streak: ${item.streak} days`}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-right">
        <p className="font-bold text-foreground">{item.score}</p>
        <p className="text-sm text-muted-foreground">{item.avgTime || item.time}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-warning to-accent flex items-center justify-center text-3xl mb-4">
          🏆
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          See how you rank against other learners
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-muted rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Category Filter */}
      {activeTab === 'category' && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Leaderboard List */}
      <div className="card-base p-4 sm:p-6">
        <div className="space-y-3">
          {activeTab === 'overall' && leaderboardData.overall.map(renderLeaderboardItem)}
          {activeTab === 'category' && leaderboardData.byCategory[selectedCategory]?.map(renderLeaderboardItem)}
          {activeTab === 'daily' && leaderboardData.daily.map(renderLeaderboardItem)}
        </div>
      </div>

      {/* Your Rank */}
      <div className="mt-6 card-base p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">
              15
            </div>
            <div>
              <p className="font-semibold text-foreground">Your Rank</p>
              <p className="text-sm text-muted-foreground">1,200 points</p>
            </div>
          </div>
          <span className="badge-primary">Top 15%</span>
        </div>
      </div>
    </div>
  );
}
