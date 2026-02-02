import { Link, useLocation } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const { 
    score = 0, 
    totalQuestions = 0, 
    correctAnswers = 0, 
    wrongAnswers = 0, 
    timeTaken = 0,
    categoryId,
    subjectId,
    levelId
  } = location.state || {};

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const getMessage = () => {
    if (score >= 100) return { emoji: '🏆', text: 'Perfect Score! Outstanding!', color: 'text-warning' };
    if (percentage >= 80) return { emoji: '🎉', text: 'Excellent Performance!', color: 'text-success' };
    if (percentage >= 60) return { emoji: '👍', text: 'Good Job! Keep it up!', color: 'text-primary' };
    if (percentage >= 40) return { emoji: '💪', text: 'Nice try! Practice more!', color: 'text-accent' };
    return { emoji: '📚', text: 'Keep learning! You\'ll improve!', color: 'text-muted-foreground' };
  };

  const message = getMessage();

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card-base p-8 text-center">
        {/* Trophy Animation */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl mb-6 animate-bounce-slow">
          {message.emoji}
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Quiz Complete!
        </h1>
        <p className={`text-xl font-semibold ${message.color} mb-8`}>
          {message.text}
        </p>

        {/* Score Display */}
        <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-2 mb-8">
          <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{score}</span>
            <span className="text-sm text-muted-foreground">Points</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-2xl font-bold text-success">{correctAnswers}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-2xl font-bold text-destructive">{wrongAnswers}</p>
            <p className="text-sm text-muted-foreground">Wrong</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{percentage}%</p>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{formatTime(timeTaken)}</p>
            <p className="text-sm text-muted-foreground">Time</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary">
            📊 Go to Dashboard
          </Link>
          <Link 
            to="/start-quiz" 
            state={{ categoryId, subjectId, levelId }}
            className="btn-secondary"
          >
            🔄 Try Again
          </Link>
          <Link to="/leaderboard" className="btn-secondary">
            🏆 Leaderboard
          </Link>
        </div>
      </div>

      {/* Achievement Unlocked (Mock) */}
      {percentage >= 80 && (
        <div className="mt-6 card-base p-4 bg-gradient-to-r from-warning/10 to-accent/10 border-warning/20 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🎖️</div>
            <div>
              <p className="font-semibold text-foreground">Achievement Unlocked!</p>
              <p className="text-sm text-muted-foreground">High Scorer - Score 80% or more in a quiz</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
