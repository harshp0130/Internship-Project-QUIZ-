import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userProgress } from '../../data/userProgress';
import { achievements } from '../../data/achievements';

export default function Dashboard() {
  const { user } = useAuth();
  const progress = userProgress;
  const earnedAchievements = achievements.filter(a => progress.earnedAchievements.includes(a.id));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
          Your Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and see how you're improving
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl">
              📊
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.totalScore}</p>
          <p className="text-sm text-muted-foreground">Total Score</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.quizzesCompleted}</p>
          <p className="text-sm text-muted-foreground">Quizzes Completed</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-xl">
              🔥
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.streak}</p>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center text-xl">
              ⏱️
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.totalTimeSpent}</p>
          <p className="text-sm text-muted-foreground">Time Spent</p>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-foreground">
            Subject Progress
          </h2>
        </div>

        <div className="space-y-4">
          {progress.subjectProgress.map((subject) => (
            <div key={subject.subjectId} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{subject.subjectName}</span>
                <span className="text-sm text-muted-foreground">{subject.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{subject.quizzes} quizzes completed</span>
                <span>Avg: {subject.avgScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="card-base p-6">
        <h2 className="text-xl font-display font-bold text-foreground mb-6">
          Weekly Activity
        </h2>
        
        <div className="flex items-end justify-between h-40 gap-2">
          {progress.weeklyActivity.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full rounded-lg bg-gradient-to-t from-primary to-primary/60 transition-all duration-500"
                style={{ 
                  height: `${(day.quizzes / 5) * 100}%`,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-foreground">
            Recent Achievements
          </h2>
          <Link to="/achievements" className="text-primary text-sm font-medium hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {earnedAchievements.slice(0, 5).map((achievement) => (
            <div 
              key={achievement.id}
              className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="font-medium text-sm text-foreground">{achievement.name}</p>
              <p className="text-xs text-muted-foreground mt-1">+{achievement.points} pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link 
          to="/start-quiz"
          className="card-interactive p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
            🎮
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Start Quiz</h3>
            <p className="text-sm text-muted-foreground">Begin a new challenge</p>
          </div>
        </Link>

        <Link 
          to="/daily-quiz"
          className="card-interactive p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center text-xl">
            🎯
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Daily Quiz</h3>
            <p className="text-sm text-muted-foreground">Maintain your streak</p>
          </div>
        </Link>

        <Link 
          to="/leaderboard"
          className="card-interactive p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-destructive flex items-center justify-center text-xl">
            🏆
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">See your ranking</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
