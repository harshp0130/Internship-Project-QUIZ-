import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,248', icon: '👥', change: '+12%', color: 'from-blue-500 to-indigo-600' },
    { label: 'Categories', value: '5', icon: '📚', change: '0', color: 'from-emerald-500 to-teal-600' },
    { label: 'Subjects', value: '18', icon: '📖', change: '+2', color: 'from-purple-500 to-pink-600' },
    { label: 'Questions', value: '847', icon: '❓', change: '+45', color: 'from-amber-500 to-orange-600' },
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago', icon: '👤' },
    { action: 'Quiz completed', user: 'Sarah Chen', time: '5 minutes ago', icon: '✅' },
    { action: 'Achievement unlocked', user: 'Mike Williams', time: '10 minutes ago', icon: '🏆' },
    { action: 'Daily quiz completed', user: 'Emma Davis', time: '15 minutes ago', icon: '🎯' },
    { action: 'New user registered', user: 'James Brown', time: '20 minutes ago', icon: '👤' },
  ];

  const dailyQuizStatus = {
    active: true,
    totalQuestions: 10,
    completedToday: 156,
    avgScore: 72,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your quiz platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card-base p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Quiz Status */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span>🎯</span> Daily Quiz Status
            </h2>
            <Link to="/admin/daily-quiz-master" className="text-primary text-sm hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                dailyQuizStatus.active 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {dailyQuizStatus.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-muted-foreground">Questions</span>
              <span className="font-semibold text-foreground">{dailyQuizStatus.totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-muted-foreground">Completed Today</span>
              <span className="font-semibold text-foreground">{dailyQuizStatus.completedToday}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <span className="text-muted-foreground">Avg Score</span>
              <span className="font-semibold text-foreground">{dailyQuizStatus.avgScore}%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span>📋</span> Recent Activity
            </h2>
            <Link to="/admin/reports" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-base p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link 
            to="/admin/question-master"
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-2xl block mb-2">➕</span>
            <span className="text-sm font-medium text-foreground">Add Question</span>
          </Link>
          <Link 
            to="/admin/category-master"
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-2xl block mb-2">📚</span>
            <span className="text-sm font-medium text-foreground">Add Category</span>
          </Link>
          <Link 
            to="/admin/daily-quiz-master"
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-2xl block mb-2">🎯</span>
            <span className="text-sm font-medium text-foreground">Edit Daily Quiz</span>
          </Link>
          <Link 
            to="/admin/reports"
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-2xl block mb-2">📊</span>
            <span className="text-sm font-medium text-foreground">View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
