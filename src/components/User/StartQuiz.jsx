import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../../data/categories';
import { getSubjectsByCategory } from '../../data/subjects';
import { levels } from '../../data/levels';
import { Input } from '../../components/ui/input';

export default function StartQuiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchLevel, setSearchLevel] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  
  const subjects = selectedCategory ? getSubjectsByCategory(selectedCategory) : [];

  // Filtered arrays based on search terms
  const filteredLevels = levels.filter(level =>
    level.name.toLowerCase().includes(searchLevel.toLowerCase()) ||
    level.description.toLowerCase().includes(searchLevel.toLowerCase())
  );
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchSubject.toLowerCase())
  );

  // Pre-select category from URL params
  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      setSelectedCategory(parseInt(categoryId));
      setStep(1);
    }
  }, [searchParams]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const startQuiz = () => {
    navigate('/quiz', { 
      state: { 
        levelId: selectedLevel, 
        categoryId: selectedCategory, 
        subjectId: selectedSubject 
      } 
    });
  };

  const getSelectedLevelName = () => levels.find(l => l.id === selectedLevel)?.name || '';
  const getSelectedCategoryName = () => categories.find(c => c.id === selectedCategory)?.name || '';
  const getSelectedSubjectName = () => subjects.find(s => s.id === selectedSubject)?.name || '';

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              step >= s 
                ? 'bg-gradient-to-br from-primary to-accent text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {s}
            </div>
            {s < 4 && (
              <div className={`w-8 sm:w-16 h-1 rounded-full transition-all ${
                step > s ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="card-base p-6 sm:p-8">
        {/* Step 1: Select Level */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">
              Select Difficulty Level
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Choose a level that matches your expertise
            </p>

            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search levels..."
                value={searchLevel}
                onChange={(e) => setSearchLevel(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-4">
              {filteredLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    selectedLevel === level.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl`}>
                      {level.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{level.name}</h3>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                    {selectedLevel === level.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Category */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">
              Select Category
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              What would you like to learn today?
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubject(null);
                  }}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.quizCount} quizzes</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Subject */}
        {step === 3 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">
              Select Subject
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Choose a specific subject to practice
            </p>

            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search subjects..."
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    selectedSubject === subject.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.questionCount} questions</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Quiz Instructions */}
        {step === 4 && (
          <div className="animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl mb-4">
                🎯
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground">
                Review your selection and read the instructions
              </p>
            </div>

            {/* Selection Summary */}
            <div className="p-4 rounded-xl bg-muted/50 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-semibold text-foreground">{getSelectedLevelName()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground">{getSelectedCategoryName()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-semibold text-foreground">{getSelectedSubjectName()}</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-foreground">Quiz Instructions:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Total quiz time: 60 minutes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Each question has its own time limit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Quiz ends when you reach 100 points or time runs out
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Correct answers increase the next question's weightage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Wrong answers decrease the next question's weightage
                </li>
              </ul>
            </div>

            <button onClick={startQuiz} className="btn-accent w-full py-4 text-lg">
              🚀 Start Quiz
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="btn-secondary disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedLevel) ||
                (step === 2 && !selectedCategory) ||
                (step === 3 && !selectedSubject)
              }
              className="btn-primary disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
