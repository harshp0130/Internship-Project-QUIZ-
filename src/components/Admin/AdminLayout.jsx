import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/level-master', label: 'Levels', icon: '📈' },
    { path: '/admin/category-master', label: 'Categories', icon: '📚' },
    { path: '/admin/subject-master', label: 'Subjects', icon: '📖' },
    { path: '/admin/question-master', label: 'Questions', icon: '❓' },
    { path: '/admin/bulk-master', label: 'Bulk Import', icon: '📤' },
    { path: '/admin/daily-quiz-master', label: 'Daily Quiz', icon: '🎯' },
    { path: '/admin/achievement-master', label: 'Achievements', icon: '🏆' },
    { path: '/admin/reports', label: 'Reports', icon: '📋' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:block sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl">🧠</span>
            </div>
            <div>
              <span className="font-display font-bold text-lg text-foreground block">
                QuizMaster
              </span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path 
                  ? 'admin-sidebar-link-active' 
                  : 'admin-sidebar-link'
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-6">
          <div className="lg:hidden">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm">🧠</span>
              </div>
              <span className="font-display font-bold text-foreground">Admin</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-foreground">
              {menuItems.find(m => m.path === location.pathname)?.label || 'Admin'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <Link to="/home" className="btn-ghost text-sm">
              View Site
            </Link>
          </div>
        </header>

        {/* Mobile Nav */}
        <div className="lg:hidden border-b border-border overflow-x-auto">
          <div className="flex items-center gap-1 p-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
