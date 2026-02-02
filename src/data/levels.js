export const levels = [
  {
    id: 1,
    name: 'Beginner',
    description: 'Start your journey here',
    icon: '🌱',
    color: 'from-green-400 to-emerald-500',
    difficultyRange: '1-3',
    unlockScore: 0,
    timeMultiplier: 1.5,
    baseWeightage: 2,
  },
  {
    id: 2,
    name: 'Intermediate',
    description: 'Challenge yourself more',
    icon: '⚡',
    color: 'from-blue-400 to-indigo-500',
    difficultyRange: '4-6',
    unlockScore: 50,
    timeMultiplier: 1.0,
    baseWeightage: 3,
  },
  {
    id: 3,
    name: 'Advanced',
    description: 'For the experts',
    icon: '🔥',
    color: 'from-orange-400 to-red-500',
    difficultyRange: '7-10',
    unlockScore: 100,
    timeMultiplier: 0.8,
    baseWeightage: 4,
  },
];

export const getLevelById = (id) => levels.find(l => l.id === parseInt(id));
