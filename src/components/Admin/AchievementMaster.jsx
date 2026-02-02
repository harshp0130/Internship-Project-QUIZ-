import { useState } from 'react';
import { achievements as initialAchievements } from '../../data/achievements';

export default function AchievementMaster() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🏆',
    conditionType: 'quizzes_completed',
    requiredValue: 1,
    points: 10,
  });

  const conditionTypes = [
    { value: 'quizzes_completed', label: 'Quizzes Completed' },
    { value: 'score', label: 'Score Achieved' },
    { value: 'streak', label: 'Streak Days' },
    { value: 'time', label: 'Time (seconds)' },
    { value: 'subject_mastery', label: 'Subject Mastery' },
    { value: 'category_complete', label: 'Category Complete' },
    { value: 'daily_quiz', label: 'Daily Quiz Count' },
  ];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({ ...item });
    } else {
      setEditItem(null);
      setFormData({
        name: '',
        description: '',
        icon: '🏆',
        conditionType: 'quizzes_completed',
        requiredValue: 1,
        points: 10,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setAchievements(prev => prev.map(a => 
        a.id === editItem.id ? { ...a, ...formData } : a
      ));
    } else {
      const newAchievement = {
        id: Math.max(...achievements.map(a => a.id)) + 1,
        ...formData,
      };
      setAchievements(prev => [...prev, newAchievement]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(prev => prev.filter(a => a.id !== id));
    }
  };

  const getConditionLabel = (type) => 
    conditionTypes.find(c => c.value === type)?.label || type;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Achievement Master
          </h1>
          <p className="text-muted-foreground">Configure achievements and badges</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          ➕ Add Achievement
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="card-base p-5">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
                {achievement.icon}
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleOpenModal(achievement)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(achievement.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-foreground mt-3">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
            
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium text-foreground">{getConditionLabel(achievement.conditionType)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Required</span>
                <span className="font-medium text-foreground">{achievement.requiredValue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Points</span>
                <span className="badge-success">{achievement.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card-base p-6 w-full max-w-md animate-scale-in my-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editItem ? 'Edit Achievement' : 'Add Achievement'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-base"
                  placeholder="e.g., Quiz Master"
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
                  placeholder="e.g., Complete 20 quizzes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="input-base"
                  placeholder="🏆"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Condition Type
                </label>
                <select
                  value={formData.conditionType}
                  onChange={(e) => setFormData(prev => ({ ...prev, conditionType: e.target.value }))}
                  className="input-base"
                >
                  {conditionTypes.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Required Value
                  </label>
                  <input
                    type="number"
                    value={formData.requiredValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiredValue: parseInt(e.target.value) }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                    className="input-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editItem ? 'Save Changes' : 'Add Achievement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
