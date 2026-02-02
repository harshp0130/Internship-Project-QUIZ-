import { achievements } from '../../data/achievements';
import { userProgress } from '../../data/userProgress';

export default function Achievements() {
  const progress = userProgress;
  const earnedIds = progress.earnedAchievements;

  // Group achievements
  const earned = achievements.filter(a => earnedIds.includes(a.id));
  const locked = achievements.filter(a => !earnedIds.includes(a.id));

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-warning to-accent flex items-center justify-center text-3xl mb-4">
          🎖️
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Achievements
        </h1>
        <p className="text-muted-foreground">
          Unlock badges by completing challenges and reaching milestones
        </p>
      </div>

      {/* Stats Bar */}
      <div className="card-base p-4 mb-8">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{earned.length}</p>
            <p className="text-sm text-muted-foreground">Unlocked</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{locked.length}</p>
            <p className="text-sm text-muted-foreground">Locked</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {earned.reduce((sum, a) => sum + a.points, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="card-base p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>🔥</span> Streak Calendar
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => {
            const hasStreak = i < progress.streak || (i >= 7 && i < 7 + progress.longestStreak);
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                  hasStreak
                    ? 'bg-gradient-to-br from-accent to-warning text-accent-foreground font-bold'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Current streak: <span className="font-bold text-foreground">{progress.streak} days</span>
          </span>
          <span className="text-muted-foreground">
            Longest: <span className="font-bold text-foreground">{progress.longestStreak} days</span>
          </span>
        </div>
      </div>

      {/* Earned Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <span>✨</span> Unlocked ({earned.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earned.map((achievement) => (
            <div
              key={achievement.id}
              className="card-base p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  <div className="mt-2">
                    <span className="badge-success text-xs">+{achievement.points} pts</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <span>🔒</span> Locked ({locked.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locked.map((achievement) => (
            <div
              key={achievement.id}
              className="card-base p-5 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-3xl grayscale">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  <div className="mt-2">
                    <span className="badge-base bg-muted text-muted-foreground text-xs">
                      {achievement.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
