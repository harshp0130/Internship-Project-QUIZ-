import { useState } from 'react';

export default function DailyQuizMaster() {
  const [config, setConfig] = useState({
    active: true,
    totalQuestions: 10,
    difficulty: 'mixed',
    subjectMix: 'all',
    timePerQuestion: 30,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Daily Quiz Master
        </h1>
        <p className="text-muted-foreground">Configure the daily quiz settings</p>
      </div>

      <div className="card-base p-6 space-y-6">
        {/* Active Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
          <div>
            <p className="font-medium text-foreground">Daily Quiz Active</p>
            <p className="text-sm text-muted-foreground">Enable or disable the daily quiz</p>
          </div>
          <button
            onClick={() => setConfig(prev => ({ ...prev, active: !prev.active }))}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              config.active ? 'bg-success' : 'bg-muted'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
              config.active ? 'translate-x-6' : ''
            }`} />
          </button>
        </div>

        {/* Settings */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Total Questions
          </label>
          <input
            type="number"
            value={config.totalQuestions}
            onChange={(e) => setConfig(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) }))}
            className="input-base"
            min="5"
            max="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Difficulty Level
          </label>
          <select
            value={config.difficulty}
            onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value }))}
            className="input-base"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed (Recommended)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Subject Mix
          </label>
          <select
            value={config.subjectMix}
            onChange={(e) => setConfig(prev => ({ ...prev, subjectMix: e.target.value }))}
            className="input-base"
          >
            <option value="all">All Subjects</option>
            <option value="academic">Academic Only</option>
            <option value="programming">Programming Only</option>
            <option value="general">General Knowledge Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time Per Question (seconds)
          </label>
          <input
            type="number"
            value={config.timePerQuestion}
            onChange={(e) => setConfig(prev => ({ ...prev, timePerQuestion: parseInt(e.target.value) }))}
            className="input-base"
            min="10"
            max="60"
          />
        </div>

        <button 
          onClick={handleSave} 
          className={`btn-primary w-full ${saved ? 'bg-success' : ''}`}
        >
          {saved ? '✓ Saved!' : 'Save Configuration'}
        </button>
      </div>

      {/* Stats Preview */}
      <div className="card-base p-6 mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Stats</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Completions</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">72%</p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">4:32</p>
            <p className="text-sm text-muted-foreground">Avg Time</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">Active Streaks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
