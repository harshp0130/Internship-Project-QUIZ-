import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyQuizQuestions } from '../../data/questions';

export default function DailyQuiz() {
  const navigate = useNavigate();
  
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);

  const currentQuestion = quizQuestions[currentIndex];

  // Initialize quiz questions
  useEffect(() => {
    const qs = getDailyQuizQuestions();
    setQuizQuestions(qs);
  }, []);

  // End quiz
  const endQuiz = useCallback(() => {
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const correctAnswers = answers.filter(a => a.correct).length;
    
    navigate('/result', {
      state: {
        score,
        totalQuestions: quizQuestions.length,
        correctAnswers,
        wrongAnswers: answers.length - correctAnswers,
        timeTaken,
        answers,
        isDaily: true
      }
    });
  }, [navigate, score, quizQuestions.length, answers, quizStartTime]);

  // Question timer
  useEffect(() => {
    if (!started || showFeedback) return;

    if (questionTimer <= 0) {
      handleAnswer(-1);
      return;
    }

    const interval = setInterval(() => {
      setQuestionTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [questionTimer, showFeedback, started]);

  const handleStart = () => {
    setStarted(true);
    setQuizStartTime(Date.now());
    if (quizQuestions.length > 0) {
      setQuestionTimer(quizQuestions[0].timeLimit);
    }
  };

  const handleAnswer = (optionIndex) => {
    if (showFeedback) return;

    const correct = optionIndex === currentQuestion.correctOption;
    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 10);
    }

    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: optionIndex,
      correct
    }]);

    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setQuestionTimer(quizQuestions[currentIndex + 1]?.timeLimit || 30);
      } else {
        endQuiz();
      }
    }, 1500);
  };

  // Not started view
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card-base p-8 text-center">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-accent to-warning flex items-center justify-center text-5xl mb-6 animate-float">
            🎯
          </div>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Daily Challenge
          </h1>
          <p className="text-muted-foreground mb-8">
            Complete today's quiz to maintain your streak and climb the leaderboard!
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-foreground">{quizQuestions.length}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-foreground">Mixed</p>
              <p className="text-xs text-muted-foreground">Difficulty</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-foreground">30s</p>
              <p className="text-xs text-muted-foreground">Per Question</p>
            </div>
          </div>

          <div className="space-y-3 text-left p-4 rounded-xl bg-muted/50 mb-8">
            <h3 className="font-semibold text-foreground">How it works:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Answer questions from various subjects
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Each correct answer gives you 10 points
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Complete daily to maintain your streak
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Compete on the daily leaderboard
              </li>
            </ul>
          </div>

          <button onClick={handleStart} className="btn-accent text-lg px-8 py-4">
            🚀 Start Challenge
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Progress Bar */}
      <div className="card-base p-4 mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="font-semibold text-foreground">Daily Challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Score:</span>
            <span className="font-bold text-accent">{score}</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${
            questionTimer <= 5 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
          }`}>
            {questionTimer}s
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-accent to-warning"
            style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="card-base p-6 sm:p-8">
          <div className="mb-8">
            <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let optionClass = 'quiz-option';
              
              if (showFeedback) {
                if (index === currentQuestion.correctOption) {
                  optionClass = 'quiz-option-correct';
                } else if (index === selectedOption && !isCorrect) {
                  optionClass = 'quiz-option-wrong';
                }
              } else if (selectedOption === index) {
                optionClass = 'quiz-option-selected';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`${optionClass} flex items-center gap-4`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    showFeedback && index === currentQuestion.correctOption
                      ? 'bg-success text-success-foreground'
                      : showFeedback && index === selectedOption && !isCorrect
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 rounded-xl ${
              isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            } animate-scale-in`}>
              <p className="font-semibold">
                {isCorrect ? '🎉 Correct! +10 points' : '❌ Wrong!'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
