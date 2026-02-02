import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions, getQuestionsBySubjectAndLevel } from '../../data/questions';

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { levelId, categoryId, subjectId } = location.state || {};

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [currentWeightage, setCurrentWeightage] = useState(3);
  const [questionTimer, setQuestionTimer] = useState(30);
  const [quizTimer, setQuizTimer] = useState(3600); // 60 minutes
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizStartTime] = useState(Date.now());

  // Initialize quiz questions
  useEffect(() => {
    let qs = [];
    if (subjectId && levelId) {
      qs = getQuestionsBySubjectAndLevel(subjectId, levelId);
    }
    // If no specific questions, use random ones
    if (qs.length === 0) {
      qs = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);
    }
    setQuizQuestions(qs);
    if (qs.length > 0) {
      setQuestionTimer(qs[0].timeLimit);
    }
  }, [subjectId, levelId]);

  const currentQuestion = quizQuestions[currentIndex];

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
        categoryId,
        subjectId,
        levelId
      }
    });
  }, [navigate, score, quizQuestions.length, answers, quizStartTime, categoryId, subjectId, levelId]);

  // Quiz timer
  useEffect(() => {
    if (quizTimer <= 0 || score >= 100) {
      endQuiz();
      return;
    }

    const interval = setInterval(() => {
      setQuizTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizTimer, score, endQuiz]);

  // Question timer
  useEffect(() => {
    if (questionTimer <= 0 && !showFeedback) {
      handleAnswer(-1); // Time's up, auto-submit wrong
      return;
    }

    if (!showFeedback) {
      const interval = setInterval(() => {
        setQuestionTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [questionTimer, showFeedback]);

  const handleAnswer = (optionIndex) => {
    if (showFeedback) return;

    const correct = optionIndex === currentQuestion.correctOption;
    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update score and weightage
    if (correct) {
      setScore(prev => Math.min(100, prev + currentWeightage));
      setCurrentWeightage(prev => Math.min(7, prev + 1));
    } else {
      setCurrentWeightage(prev => Math.max(1, prev - 1));
    }

    // Save answer
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: optionIndex,
      correct,
      weightage: currentWeightage
    }]);

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1 && score < 100) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setQuestionTimer(quizQuestions[currentIndex + 1]?.timeLimit || 30);
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Timer Bar */}
      <div className="card-base p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Quiz Timer */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">⏱️</span>
            <span className={`font-mono font-bold ${quizTimer < 300 ? 'text-destructive' : 'text-foreground'}`}>
              {formatTime(quizTimer)}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Score:</span>
            <span className="font-bold text-primary">{score}/100</span>
          </div>

          {/* Question Timer */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            questionTimer <= 5 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
          }`}>
            <span>{questionTimer}s</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
            <span>Weightage: ×{currentWeightage}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card-base p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* Options */}
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

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-xl ${
            isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          } animate-scale-in`}>
            <p className="font-semibold">
              {isCorrect ? '🎉 Correct!' : '❌ Wrong!'}
              {isCorrect && ` +${currentWeightage} points`}
            </p>
          </div>
        )}
      </div>

      {/* Quit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
              navigate('/home');
            }
          }}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          Quit Quiz
        </button>
      </div>
    </div>
  );
}
