export default function AdminReports() {
  const participationData = [
    { month: 'Jan', quizzes: 1200, users: 450 },
    { month: 'Feb', quizzes: 1450, users: 520 },
    { month: 'Mar', quizzes: 1680, users: 610 },
    { month: 'Apr', quizzes: 1890, users: 680 },
    { month: 'May', quizzes: 2100, users: 750 },
    { month: 'Jun', quizzes: 2350, users: 820 },
  ];

  const subjectPerformance = [
    { name: 'JavaScript', avgScore: 78, completions: 2450 },
    { name: 'Mathematics', avgScore: 72, completions: 2100 },
    { name: 'Python', avgScore: 81, completions: 1890 },
    { name: 'Geography', avgScore: 85, completions: 1650 },
    { name: 'Physics', avgScore: 68, completions: 1420 },
    { name: 'Aptitude', avgScore: 74, completions: 1380 },
  ];

  const dailyQuizStats = {
    totalCompletions: 4520,
    avgScore: 72,
    avgTime: '4:15',
    topStreak: 45,
    activeUsers: 892,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground">Platform performance insights</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base p-5">
          <p className="text-sm text-muted-foreground">Total Quizzes</p>
          <p className="text-3xl font-bold text-foreground mt-2">12,450</p>
          <p className="text-sm text-success mt-1">↑ 12% from last month</p>
        </div>
        <div className="card-base p-5">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-3xl font-bold text-foreground mt-2">1,248</p>
          <p className="text-sm text-success mt-1">↑ 8% from last month</p>
        </div>
        <div className="card-base p-5">
          <p className="text-sm text-muted-foreground">Avg Score</p>
          <p className="text-3xl font-bold text-foreground mt-2">74%</p>
          <p className="text-sm text-muted-foreground mt-1">Across all quizzes</p>
        </div>
        <div className="card-base p-5">
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-3xl font-bold text-foreground mt-2">89%</p>
          <p className="text-sm text-success mt-1">↑ 3% from last month</p>
        </div>
      </div>

      {/* Participation Chart (Simplified) */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Participation Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2 px-4">
          {participationData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500"
                style={{ height: `${(data.quizzes / 2500) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Performance */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {subjectPerformance.map((subject) => (
            <div key={subject.name} className="flex items-center gap-4">
              <div className="w-32 font-medium text-foreground truncate">{subject.name}</div>
              <div className="flex-1">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${subject.avgScore}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right font-semibold text-foreground">{subject.avgScore}%</div>
              <div className="w-24 text-right text-sm text-muted-foreground">
                {subject.completions.toLocaleString()} quiz
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Quiz Stats */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Quiz Analytics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">{dailyQuizStats.totalCompletions.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Completions</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">{dailyQuizStats.avgScore}%</p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">{dailyQuizStats.avgTime}</p>
            <p className="text-sm text-muted-foreground">Avg Time</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">{dailyQuizStats.topStreak}</p>
            <p className="text-sm text-muted-foreground">Top Streak</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-2xl font-bold text-foreground">{dailyQuizStats.activeUsers}</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Data</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary">
            📊 Export as CSV
          </button>
          <button className="btn-secondary">
            📄 Export as PDF
          </button>
          <button className="btn-secondary">
            📈 Export Charts
          </button>
        </div>
      </div>
    </div>
  );
}
