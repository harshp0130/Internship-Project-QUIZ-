export const questions = [
  // JavaScript Questions
  {
    id: 1,
    subjectId: 9,
    levelId: 1,
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
    correctOption: 0,
    timeLimit: 30,
    baseWeightage: 3,
  },
  {
    id: 2,
    subjectId: 9,
    levelId: 1,
    question: 'Which method is used to add an element at the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctOption: 0,
    timeLimit: 25,
    baseWeightage: 3,
  },
  {
    id: 3,
    subjectId: 9,
    levelId: 2,
    question: 'What does the "===" operator check?',
    options: ['Value only', 'Type only', 'Value and type', 'Reference only'],
    correctOption: 2,
    timeLimit: 20,
    baseWeightage: 3,
  },
  {
    id: 4,
    subjectId: 9,
    levelId: 2,
    question: 'What is a closure in JavaScript?',
    options: [
      'A function with no parameters',
      'A function that has access to outer scope variables',
      'A method to close browser window',
      'A type of loop'
    ],
    correctOption: 1,
    timeLimit: 35,
    baseWeightage: 4,
  },
  {
    id: 5,
    subjectId: 9,
    levelId: 3,
    question: 'What is the output of: typeof null?',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctOption: 2,
    timeLimit: 20,
    baseWeightage: 4,
  },

  // Mathematics Questions
  {
    id: 6,
    subjectId: 1,
    levelId: 1,
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctOption: 1,
    timeLimit: 30,
    baseWeightage: 3,
  },
  {
    id: 7,
    subjectId: 1,
    levelId: 1,
    question: 'Solve: 2x + 5 = 15',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctOption: 1,
    timeLimit: 35,
    baseWeightage: 3,
  },
  {
    id: 8,
    subjectId: 1,
    levelId: 2,
    question: 'What is the derivative of x²?',
    options: ['x', '2x', '2', 'x²'],
    correctOption: 1,
    timeLimit: 25,
    baseWeightage: 3,
  },
  {
    id: 9,
    subjectId: 1,
    levelId: 2,
    question: 'If log₁₀(x) = 2, what is x?',
    options: ['20', '100', '1000', '200'],
    correctOption: 1,
    timeLimit: 30,
    baseWeightage: 4,
  },
  {
    id: 10,
    subjectId: 1,
    levelId: 3,
    question: 'What is the integral of 1/x?',
    options: ['x', 'ln|x| + C', '1/x² + C', 'e^x + C'],
    correctOption: 1,
    timeLimit: 25,
    baseWeightage: 5,
  },

  // Python Questions
  {
    id: 11,
    subjectId: 10,
    levelId: 1,
    question: 'How do you create a list in Python?',
    options: ['list = []', 'list = {}', 'list = ()', 'list = <>'],
    correctOption: 0,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 12,
    subjectId: 10,
    levelId: 1,
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctOption: 1,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 13,
    subjectId: 10,
    levelId: 2,
    question: 'What is a decorator in Python?',
    options: [
      'A design pattern for UI',
      'A function that modifies another function',
      'A type of comment',
      'A variable type'
    ],
    correctOption: 1,
    timeLimit: 30,
    baseWeightage: 4,
  },

  // Geography Questions
  {
    id: 14,
    subjectId: 13,
    levelId: 1,
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctOption: 2,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 15,
    subjectId: 13,
    levelId: 1,
    question: 'Which is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctOption: 3,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 16,
    subjectId: 13,
    levelId: 2,
    question: 'The Sahara Desert is located in which continent?',
    options: ['Asia', 'Africa', 'Australia', 'South America'],
    correctOption: 1,
    timeLimit: 20,
    baseWeightage: 3,
  },

  // Aptitude Questions
  {
    id: 17,
    subjectId: 6,
    levelId: 1,
    question: 'If A can do a work in 10 days and B in 15 days, how many days will they take together?',
    options: ['5 days', '6 days', '7 days', '8 days'],
    correctOption: 1,
    timeLimit: 45,
    baseWeightage: 3,
  },
  {
    id: 18,
    subjectId: 6,
    levelId: 2,
    question: 'A train 100m long passes a platform 200m long in 15 seconds. What is its speed?',
    options: ['72 km/hr', '60 km/hr', '54 km/hr', '48 km/hr'],
    correctOption: 0,
    timeLimit: 60,
    baseWeightage: 4,
  },

  // Physics Questions
  {
    id: 19,
    subjectId: 2,
    levelId: 1,
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctOption: 1,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 20,
    subjectId: 2,
    levelId: 2,
    question: 'What is the speed of light in vacuum?',
    options: ['3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁸ m/s', '3 × 10⁹ m/s'],
    correctOption: 2,
    timeLimit: 25,
    baseWeightage: 3,
  },

  // Data Structures Questions
  {
    id: 21,
    subjectId: 11,
    levelId: 1,
    question: 'Which data structure uses LIFO principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctOption: 1,
    timeLimit: 20,
    baseWeightage: 2,
  },
  {
    id: 22,
    subjectId: 11,
    levelId: 2,
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctOption: 1,
    timeLimit: 25,
    baseWeightage: 3,
  },

  // Riddles
  {
    id: 23,
    subjectId: 16,
    levelId: 1,
    question: 'I have keys but no locks. I have space but no room. What am I?',
    options: ['Piano', 'Keyboard', 'Map', 'House'],
    correctOption: 1,
    timeLimit: 45,
    baseWeightage: 3,
  },
  {
    id: 24,
    subjectId: 16,
    levelId: 2,
    question: 'What has hands but cannot clap?',
    options: ['Robot', 'Clock', 'Gloves', 'Tree'],
    correctOption: 1,
    timeLimit: 40,
    baseWeightage: 3,
  },

  // Logic Puzzles
  {
    id: 25,
    subjectId: 18,
    levelId: 2,
    question: 'If all roses are flowers and some flowers fade quickly, which statement is true?',
    options: [
      'All roses fade quickly',
      'Some roses may fade quickly',
      'No roses fade quickly',
      'Roses never fade'
    ],
    correctOption: 1,
    timeLimit: 50,
    baseWeightage: 4,
  },
];

export const getQuestionsBySubjectAndLevel = (subjectId, levelId) =>
  questions.filter(q => q.subjectId === parseInt(subjectId) && q.levelId === parseInt(levelId));

export const getQuestionById = (id) => questions.find(q => q.id === parseInt(id));

export const getDailyQuizQuestions = () => {
  // Return a mix of questions for daily quiz
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};
