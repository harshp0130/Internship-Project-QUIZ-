import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    achievements: true,
    leaderboard: false,
  });

  const handleSave = () => {
    // Mock save
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>👤</span> Profile
        </h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <button className="btn-secondary text-sm">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base"
            />
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>🎨</span> Appearance
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Theme</p>
            <p className="text-sm text-muted-foreground">
              Choose between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-16 h-9 rounded-full p-1 transition-colors ${
              theme === 'dark' ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div className={`w-7 h-7 rounded-full bg-white flex items-center justify-center transition-transform ${
              theme === 'dark' ? 'translate-x-7' : ''
            }`}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>🔔</span> Notifications
        </h2>
        
        <div className="space-y-4">
          {[
            { key: 'dailyReminder', label: 'Daily Quiz Reminder', desc: 'Get reminded to complete your daily quiz' },
            { key: 'achievements', label: 'Achievement Alerts', desc: 'Notified when you unlock new achievements' },
            { key: 'leaderboard', label: 'Leaderboard Updates', desc: 'Updates when your rank changes' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`w-12 h-7 rounded-full p-1 transition-colors ${
                  notifications[item.key] ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications[item.key] ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-base p-6 border-destructive/30">
        <h2 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
          <span>⚠️</span> Danger Zone
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex items-center justify-end gap-4">
        <button onClick={logout} className="btn-ghost text-destructive">
          Logout
        </button>
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}
