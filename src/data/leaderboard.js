export const leaderboardData = {
  overall: [
    { rank: 1, name: 'Alex Johnson', avatar: '🧑‍💻', score: 2450, quizzes: 48, avgTime: '3:45' },
    { rank: 2, name: 'Sarah Chen', avatar: '👩‍🔬', score: 2380, quizzes: 45, avgTime: '4:02' },
    { rank: 3, name: 'Mike Williams', avatar: '👨‍🎓', score: 2210, quizzes: 42, avgTime: '3:58' },
    { rank: 4, name: 'Emma Davis', avatar: '👩‍💻', score: 2150, quizzes: 40, avgTime: '4:15' },
    { rank: 5, name: 'James Brown', avatar: '🧑‍🏫', score: 2080, quizzes: 38, avgTime: '4:30' },
    { rank: 6, name: 'Lisa Anderson', avatar: '👩‍🎨', score: 1950, quizzes: 36, avgTime: '4:45' },
    { rank: 7, name: 'David Wilson', avatar: '👨‍💼', score: 1820, quizzes: 34, avgTime: '5:00' },
    { rank: 8, name: 'Anna Martinez', avatar: '👩‍⚕️', score: 1750, quizzes: 32, avgTime: '4:55' },
    { rank: 9, name: 'Chris Taylor', avatar: '🧑‍🔧', score: 1680, quizzes: 30, avgTime: '5:10' },
    { rank: 10, name: 'Sophie White', avatar: '👩‍🏭', score: 1590, quizzes: 28, avgTime: '5:25' },
  ],
  
  byCategory: {
    1: [ // Academic
      { rank: 1, name: 'Sarah Chen', avatar: '👩‍🔬', score: 850, quizzes: 18, avgTime: '4:02' },
      { rank: 2, name: 'Mike Williams', avatar: '👨‍🎓', score: 780, quizzes: 16, avgTime: '3:58' },
      { rank: 3, name: 'Alex Johnson', avatar: '🧑‍💻', score: 720, quizzes: 14, avgTime: '3:45' },
    ],
    2: [ // Competitive
      { rank: 1, name: 'James Brown', avatar: '🧑‍🏫', score: 680, quizzes: 15, avgTime: '4:30' },
      { rank: 2, name: 'Emma Davis', avatar: '👩‍💻', score: 650, quizzes: 14, avgTime: '4:15' },
      { rank: 3, name: 'Lisa Anderson', avatar: '👩‍🎨', score: 580, quizzes: 12, avgTime: '4:45' },
    ],
    3: [ // Programming
      { rank: 1, name: 'Alex Johnson', avatar: '🧑‍💻', score: 920, quizzes: 20, avgTime: '3:45' },
      { rank: 2, name: 'David Wilson', avatar: '👨‍💼', score: 860, quizzes: 18, avgTime: '5:00' },
      { rank: 3, name: 'Chris Taylor', avatar: '🧑‍🔧', score: 790, quizzes: 16, avgTime: '5:10' },
    ],
    4: [ // General Knowledge
      { rank: 1, name: 'Sophie White', avatar: '👩‍🏭', score: 750, quizzes: 16, avgTime: '5:25' },
      { rank: 2, name: 'Anna Martinez', avatar: '👩‍⚕️', score: 710, quizzes: 14, avgTime: '4:55' },
      { rank: 3, name: 'Sarah Chen', avatar: '👩‍🔬', score: 680, quizzes: 12, avgTime: '4:02' },
    ],
    5: [ // Fun & Brain Games
      { rank: 1, name: 'Emma Davis', avatar: '👩‍💻', score: 620, quizzes: 12, avgTime: '4:15' },
      { rank: 2, name: 'Mike Williams', avatar: '👨‍🎓', score: 580, quizzes: 10, avgTime: '3:58' },
      { rank: 3, name: 'James Brown', avatar: '🧑‍🏫', score: 540, quizzes: 8, avgTime: '4:30' },
    ],
  },

  daily: [
    { rank: 1, name: 'Alex Johnson', avatar: '🧑‍💻', score: 95, time: '2:45', streak: 12 },
    { rank: 2, name: 'Emma Davis', avatar: '👩‍💻', score: 92, time: '3:10', streak: 8 },
    { rank: 3, name: 'Sarah Chen', avatar: '👩‍🔬', score: 90, time: '2:55', streak: 15 },
    { rank: 4, name: 'Mike Williams', avatar: '👨‍🎓', score: 88, time: '3:20', streak: 5 },
    { rank: 5, name: 'James Brown', avatar: '🧑‍🏫', score: 85, time: '3:45', streak: 7 },
  ],
};

export const getUserRank = (userId, type = 'overall') => {
  // Mock function to get user's rank
  return {
    rank: 15,
    score: 1200,
    quizzes: 22,
    avgTime: '4:30'
  };
};
