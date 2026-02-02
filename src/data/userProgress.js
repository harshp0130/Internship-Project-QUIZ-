// Mock user progress data
export const userProgress = {
  userId: 1,
  totalScore: 1250,
  quizzesCompleted: 24,
  streak: 5,
  longestStreak: 12,
  totalTimeSpent: '4h 35m',
  averageScore: 78,
  
  subjectProgress: [
    { subjectId: 1, subjectName: 'Mathematics', progress: 75, quizzes: 8, avgScore: 82 },
    { subjectId: 9, subjectName: 'JavaScript', progress: 60, quizzes: 6, avgScore: 88 },
    { subjectId: 10, subjectName: 'Python', progress: 45, quizzes: 4, avgScore: 75 },
    { subjectId: 13, subjectName: 'Geography', progress: 30, quizzes: 3, avgScore: 70 },
    { subjectId: 6, subjectName: 'Aptitude', progress: 20, quizzes: 2, avgScore: 65 },
    { subjectId: 2, subjectName: 'Physics', progress: 10, quizzes: 1, avgScore: 80 },
  ],

  recentActivity: [
    { date: '2024-01-15', type: 'quiz', subject: 'JavaScript', score: 92 },
    { date: '2024-01-14', type: 'daily', score: 85 },
    { date: '2024-01-13', type: 'quiz', subject: 'Mathematics', score: 78 },
    { date: '2024-01-12', type: 'quiz', subject: 'Python', score: 88 },
    { date: '2024-01-11', type: 'daily', score: 90 },
  ],

  earnedAchievements: [1, 2, 4, 5, 8],
  
  weeklyActivity: [
    { day: 'Mon', quizzes: 3 },
    { day: 'Tue', quizzes: 2 },
    { day: 'Wed', quizzes: 4 },
    { day: 'Thu', quizzes: 1 },
    { day: 'Fri', quizzes: 3 },
    { day: 'Sat', quizzes: 5 },
    { day: 'Sun', quizzes: 2 },
  ],
};

export const getUserProgress = () => userProgress;
