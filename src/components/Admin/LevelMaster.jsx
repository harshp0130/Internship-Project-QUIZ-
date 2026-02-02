import { useState } from 'react';
import { levels as initialLevels } from '../../data/levels';

export default function LevelMaster() {
  const [levels, setLevels] = useState(initialLevels);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🌱',
    color: 'from-green-400 to-emerald-500',
    difficultyRange: '1-3',
    unlockScore: 0,
    timeMultiplier: 1.0,
    baseWeightage: 3,
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({ ...item });
    } else {
      setEditItem(null);
      setFormData({
        name: '',
        description: '',
        icon: '🌱',
        color: 'from-green-400 to-emerald-500',
        difficultyRange: '1-3',
        unlockScore: 0,
        timeMultiplier: 1.0,
        baseWeightage: 3,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setLevels(prev => prev.map(l => 
        l.id === editItem.id ? { ...l, ...formData } : l
      ));
    } else {
      const newLevel = {
        id: Math.max(...levels.map(l => l.id)) + 1,
        ...formData,
      };
      setLevels(prev => [...prev, newLevel]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this level?')) {
      setLevels(prev => prev.filter(l => l.id !== id));
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Level Master
          </h1>
          <p className="text-muted-foreground">Configure difficulty levels</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          ➕ Add Level
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <div key={level.id} className="card-base p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl`}>
                  {level.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{level.name}</h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(level)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(level.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium text-foreground">{level.difficultyRange}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Unlock Score</span>
                <span className="font-medium text-foreground">{level.unlockScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time Multiplier</span>
                <span className="font-medium text-foreground">{level.timeMultiplier}x</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base Weightage</span>
                <span className="font-medium text-foreground">{level.baseWeightage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card-base p-6 w-full max-w-md animate-scale-in my-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editItem ? 'Edit Level' : 'Add Level'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Level Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-base"
                  placeholder="e.g., Beginner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-base"
                  placeholder="Brief description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="input-base"
                    placeholder="🌱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Difficulty Range
                  </label>
                  <input
                    type="text"
                    value={formData.difficultyRange}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficultyRange: e.target.value }))}
                    className="input-base"
                    placeholder="1-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Unlock Score
                  </label>
                  <input
                    type="number"
                    value={formData.unlockScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, unlockScore: parseInt(e.target.value) }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Base Weightage
                  </label>
                  <input
                    type="number"
                    value={formData.baseWeightage}
                    onChange={(e) => setFormData(prev => ({ ...prev, baseWeightage: parseInt(e.target.value) }))}
                    className="input-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time Multiplier
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.timeMultiplier}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeMultiplier: parseFloat(e.target.value) }))}
                  className="input-base"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editItem ? 'Save Changes' : 'Add Level'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
