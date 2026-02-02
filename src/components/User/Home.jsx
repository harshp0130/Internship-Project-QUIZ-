import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/categories';
import { userProgress } from '../../data/userProgress';

export default function Home() {
  const { user } = useAuth();
  const progress = userProgress;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Card */}
      <div className="card-glow p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your learning journey? You're doing great!
            </p>
          </div>
          <div className="streak-badge">
            <span className="text-xl">🔥</span>
            <span>{progress.streak} Day Streak</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-background/80">
            <p className="text-2xl font-bold text-foreground">{progress.quizzesCompleted}</p>
            <p className="text-sm text-muted-foreground">Quizzes Done</p>
          </div>
          <div className="p-4 rounded-xl bg-background/80">
            <p className="text-2xl font-bold text-foreground">{progress.totalScore}</p>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </div>
          <div className="p-4 rounded-xl bg-background/80">
            <p className="text-2xl font-bold text-foreground">{progress.averageScore}%</p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="p-4 rounded-xl bg-background/80">
            <p className="text-2xl font-bold text-foreground">{progress.totalTimeSpent}</p>
            <p className="text-sm text-muted-foreground">Time Spent</p>
          </div>
        </div>
      </div>

      {/* Daily Quiz Banner */}
      <Link 
        to="/daily-quiz"
        className="block card-interactive p-6 bg-gradient-to-r from-accent/10 to-warning/10 border-accent/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-warning flex items-center justify-center text-2xl animate-bounce-slow">
              🎯
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Daily Challenge</h3>
              <p className="text-sm text-muted-foreground">Complete today's quiz to maintain your streak!</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="btn-accent text-sm">Play Now →</span>
          </div>
        </div>
      </Link>

      {/* Start Quiz Banner */}
      <Link
        to="/start-quiz"
        className="block card-interactive p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl animate-bounce-slow">
              📚
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Start Quiz</h3>
              <p className="text-sm text-muted-foreground">Choose your own quiz and test your knowledge!</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="btn-primary text-sm">Start Now →</span>
          </div>
        </div>
      </Link>

      {/* Quiz Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Quiz Categories
          </h2>
          <Link to="/start-quiz" className="text-primary font-medium text-sm hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="card-interactive p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <span className="badge-primary">{category.quizCount} Quizzes</span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              
              <Link 
                to={`/start-quiz?category=${category.id}`}
                className="btn-primary w-full text-sm py-2"
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-base p-6">
        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {progress.recentActivity.slice(0, 5).map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  activity.type === 'daily' 
                    ? 'bg-gradient-to-br from-accent/20 to-warning/20' 
                    : 'bg-gradient-to-br from-primary/20 to-accent/20'
                }`}>
                  {activity.type === 'daily' ? '🎯' : '📝'}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {activity.type === 'daily' ? 'Daily Quiz' : activity.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
              <div className={`badge-base ${activity.score >= 80 ? 'badge-success' : activity.score >= 60 ? 'badge-warning' : 'badge-primary'}`}>
                {activity.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
