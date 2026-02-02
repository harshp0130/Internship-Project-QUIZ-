import { useState } from 'react';
import { questions as initialQuestions } from '../../data/questions';
import { subjects } from '../../data/subjects';
import { levels } from '../../data/levels';
import { categories } from '../../data/categories';

export default function QuestionMaster() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [formData, setFormData] = useState({
    categoryId: 1,
    subjectId: 1,
    levelId: 1,
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    timeLimit: 30,
    baseWeightage: 3,
  });

  const filteredQuestions = questions.filter(q => {
    const subject = subjects.find(s => s.id === q.subjectId);
    if (filterCategory !== 'all' && subject?.categoryId !== parseInt(filterCategory)) return false;
    if (filterSubject !== 'all' && q.subjectId !== parseInt(filterSubject)) return false;
    return true;
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditItem(item);
      const subject = subjects.find(s => s.id === item.subjectId);
      setFormData({
        ...item,
        categoryId: subject?.categoryId || 1,
      });
    } else {
      setEditItem(null);
      setFormData({
        categoryId: 1,
        subjectId: 1,
        levelId: 1,
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        timeLimit: 30,
        baseWeightage: 3,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setQuestions(prev => prev.map(q => 
        q.id === editItem.id ? { ...q, ...formData } : q
      ));
    } else {
      const newQuestion = {
        id: Math.max(...questions.map(q => q.id)) + 1,
        ...formData,
      };
      setQuestions(prev => [...prev, newQuestion]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || 'Unknown';
  const getLevelName = (id) => levels.find(l => l.id === id)?.name || 'Unknown';

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Question Master
          </h1>
          <p className="text-muted-foreground">Manage quiz questions</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          ➕ Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="card-base p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Category</label>
            <input
              type="text"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              placeholder="Search categories..."
              className="input-base py-2 mb-2"
            />
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterSubject('all');
              }}
              className="input-base py-2"
            >
              <option value="all">All Categories</option>
              {filteredCategories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Subject</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="input-base py-2"
            >
              <option value="all">All Subjects</option>
              {subjects
                .filter(s => filterCategory === 'all' || s.categoryId === parseInt(filterCategory))
                .map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
          </div>
          <div className="ml-auto">
            <p className="text-sm text-muted-foreground">
              Showing {filteredQuestions.length} of {questions.length} questions
            </p>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((q, index) => (
          <div key={q.id} className="card-base p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                <span className="badge-primary text-xs">{getSubjectName(q.subjectId)}</span>
                <span className="badge-base bg-muted text-muted-foreground text-xs">
                  {getLevelName(q.levelId)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(q)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  🗑️
                </button>
              </div>
            </div>

            <p className="text-foreground font-medium text-sm mb-3 line-clamp-2">{q.question}</p>

            <div className="grid grid-cols-2 gap-1 mb-3">
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-1 rounded text-xs ${
                    i === q.correctOption
                      ? 'bg-success/10 text-success border border-success/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt.length > 10 ? opt.substring(0, 10) + '...' : opt}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
              <span>⏱️ {q.timeLimit}s</span>
              <span>⚖️ {q.baseWeightage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card-base p-6 w-full max-w-2xl animate-scale-in my-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editItem ? 'Edit Question' : 'Add Question'}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Level
                  </label>
                  <select
                    value={formData.levelId}
                    onChange={(e) => setFormData(prev => ({ ...prev, levelId: parseInt(e.target.value) }))}
                    className="input-base"
                  >
                    {levels.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      const catId = parseInt(e.target.value);
                      setFormData(prev => ({ ...prev, categoryId: catId, subjectId: 1 }));
                    }}
                    className="input-base"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subjectId}
                    onChange={(e) => setFormData(prev => ({ ...prev, subjectId: parseInt(e.target.value) }))}
                    className="input-base"
                  >
                    {subjects
                      .filter(s => s.categoryId === formData.categoryId)
                      .map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Question
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  className="input-base min-h-[100px]"
                  placeholder="Enter your question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {formData.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, correctOption: i }))}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                          formData.correctOption === i 
                            ? 'bg-success text-success-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[i] = e.target.value;
                          setFormData(prev => ({ ...prev, options: newOptions }));
                        }}
                        className="input-base flex-1"
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Click the letter to mark as correct answer
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Time Limit (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
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
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editItem ? 'Save Changes' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
