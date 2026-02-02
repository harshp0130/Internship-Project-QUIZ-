import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/achievements', label: 'Achievements' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl">🧠</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              QuizMaster
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'nav-link-active' : 'nav-link'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Daily Quiz Button */}
            <Link
              to="/daily-quiz"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-warning text-accent-foreground font-semibold text-sm hover:scale-105 transition-transform"
            >
              <span>🔥</span>
              <span>Daily Quiz</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <div className="avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-72 card-base p-4 animate-scale-in">
                  {/* User Info */}
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2 space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <span>📊</span>
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/achievements"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <span>🏆</span>
                      <span>Achievements</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <span>⚙️</span>
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Theme Toggle */}
                  <div className="py-2 border-t border-border">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                      </span>
                      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-4' : ''}`} />
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="pt-2 border-t border-border">
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              <span className="text-lg">
                {link.label === 'Home' && '🏠'}
                {link.label === 'Dashboard' && '📊'}
                {link.label === 'Leaderboard' && '🏆'}
                {link.label === 'Achievements' && '🎖️'}
              </span>
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
