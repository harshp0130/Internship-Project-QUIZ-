import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl">🧠</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              QuizMaster
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            
            <Link to="/login" className="btn-ghost">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
