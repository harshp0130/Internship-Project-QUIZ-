export const subjects = [
  // Academic
  { id: 1, name: 'Mathematics', categoryId: 1, icon: '🔢', questionCount: 45 },
  { id: 2, name: 'Physics', categoryId: 1, icon: '⚛️', questionCount: 38 },
  { id: 3, name: 'Chemistry', categoryId: 1, icon: '🧪', questionCount: 42 },
  { id: 4, name: 'Biology', categoryId: 1, icon: '🧬', questionCount: 36 },
  { id: 5, name: 'History', categoryId: 1, icon: '📜', questionCount: 50 },
  
  // Competitive
  { id: 6, name: 'Aptitude', categoryId: 2, icon: '🧮', questionCount: 60 },
  { id: 7, name: 'Reasoning', categoryId: 2, icon: '🧠', questionCount: 55 },
  { id: 8, name: 'Verbal Ability', categoryId: 2, icon: '📝', questionCount: 48 },
  
  // Programming
  { id: 9, name: 'JavaScript', categoryId: 3, icon: '🟨', questionCount: 52 },
  { id: 10, name: 'Python', categoryId: 3, icon: '🐍', questionCount: 48 },
  { id: 11, name: 'Data Structures', categoryId: 3, icon: '🌳', questionCount: 40 },
  { id: 12, name: 'Algorithms', categoryId: 3, icon: '⚡', questionCount: 35 },
  
  // General Knowledge
  { id: 13, name: 'Geography', categoryId: 4, icon: '🗺️', questionCount: 65 },
  { id: 14, name: 'Current Affairs', categoryId: 4, icon: '📰', questionCount: 80 },
  { id: 15, name: 'Science & Tech', categoryId: 4, icon: '🔬', questionCount: 55 },
  
  // Fun & Brain Games
  { id: 16, name: 'Riddles', categoryId: 5, icon: '❓', questionCount: 30 },
  { id: 17, name: 'Word Games', categoryId: 5, icon: '📖', questionCount: 25 },
  { id: 18, name: 'Logic Puzzles', categoryId: 5, icon: '🔮', questionCount: 28 },
];

export const getSubjectsByCategory = (categoryId) => 
  subjects.filter(s => s.categoryId === parseInt(categoryId));

export const getSubjectById = (id) => 
  subjects.find(s => s.id === parseInt(id));
