export const categories = [
  {
    id: 1,
    name: 'Academic',
    icon: '📚',
    description: 'School & University subjects',
    color: 'from-blue-500 to-indigo-600',
    quizCount: 156,
    subjects: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'Competitive',
    icon: '🏆',
    description: 'Exam preparation & contests',
    color: 'from-purple-500 to-pink-600',
    quizCount: 89,
    subjects: [6, 7, 8]
  },
  {
    id: 3,
    name: 'Programming',
    icon: '💻',
    description: 'Coding & development skills',
    color: 'from-emerald-500 to-teal-600',
    quizCount: 124,
    subjects: [9, 10, 11, 12]
  },
  {
    id: 4,
    name: 'General Knowledge',
    icon: '🌍',
    description: 'World facts & trivia',
    color: 'from-amber-500 to-orange-600',
    quizCount: 203,
    subjects: [13, 14, 15]
  },
  {
    id: 5,
    name: 'Fun & Brain Games',
    icon: '🧩',
    description: 'Puzzles & entertainment',
    color: 'from-rose-500 to-red-600',
    quizCount: 78,
    subjects: [16, 17, 18]
  }
];

export const getCategoryById = (id) => categories.find(c => c.id === parseInt(id));
