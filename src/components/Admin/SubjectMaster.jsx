import { useState } from 'react';
import { subjects as initialSubjects } from '../../data/subjects';
import { categories } from '../../data/categories';
import { levels } from '../../data/levels';

export default function SubjectMaster() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: levels[0].id,
    categoryId: 1,
    icon: '📖',
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({
        name: item.name,
        level: item.level || levels[0].id,
        categoryId: item.categoryId,
        icon: item.icon,
      });
    } else {
      setEditItem(null);
      setFormData({ name: '', level: levels[0].id, categoryId: 1, icon: '📖' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setSubjects(prev => prev.map(s => 
        s.id === editItem.id ? { ...s, ...formData } : s
      ));
    } else {
      const newSubject = {
        id: Math.max(...subjects.map(s => s.id)) + 1,
        ...formData,
        questionCount: 0,
      };
      setSubjects(prev => [...prev, newSubject]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(prev => prev.filter(s => s.id !== id));
    }
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Subject Master
          </h1>
          <p className="text-muted-foreground">Manage subjects within categories</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          ➕ Add Subject
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="card-base p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl">
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">Category: {getCategoryName(subject.categoryId)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(subject)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Questions</span>
                <span className="badge-primary">{subject.questionCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card-base p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editItem ? 'Edit Subject' : 'Add Subject'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  className="input-base"
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                  className="input-base"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-base"
                  placeholder="e.g., Mathematics"
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
                  placeholder="📖"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editItem ? 'Save Changes' : 'Add Subject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
