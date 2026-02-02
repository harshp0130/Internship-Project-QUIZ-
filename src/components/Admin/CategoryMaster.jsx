import { useState } from 'react';
import { categories as initialCategories } from '../../data/categories';
import { levels } from '../../data/levels';

export default function CategoryMaster() {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    level: levels[0].id,
  });

  const colorOptions = [
    { value: 'from-blue-500 to-indigo-600', label: 'Blue' },
    { value: 'from-purple-500 to-pink-600', label: 'Purple' },
    { value: 'from-emerald-500 to-teal-600', label: 'Green' },
    { value: 'from-amber-500 to-orange-600', label: 'Orange' },
    { value: 'from-rose-500 to-red-600', label: 'Red' },
  ];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        icon: item.icon,
        color: item.color,
        level: item.level || levels[0].id,
      });
    } else {
      setEditItem(null);
      setFormData({
        name: '',
        description: '',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600',
        level: levels[0].id,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setCategories(prev => prev.map(c => 
        c.id === editItem.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...formData,
        quizCount: 0,
        subjects: [],
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Category Master
          </h1>
          <p className="text-muted-foreground">Manage quiz categories</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          ➕ Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="card-base p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quizzes</span>
                <span className="badge-primary">{category.quizCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="badge-success">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card-base p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editItem ? 'Edit Category' : 'Add Category'}
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
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-base"
                  placeholder="e.g., Academic"
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="input-base"
                  placeholder="📚"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`w-full aspect-square rounded-xl bg-gradient-to-br ${color.value} ${
                        formData.color === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editItem ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
