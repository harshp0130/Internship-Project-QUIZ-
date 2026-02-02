import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin credentials required.');
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          <span className="font-display font-bold text-2xl text-foreground">
            QuizMaster
          </span>
        </Link>

        <div className="card-base p-8 animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-destructive/20 to-warning/20 flex items-center justify-center text-2xl mb-4">
              🔐
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              Access the admin dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-2">Demo Admin:</p>
            <p className="text-xs text-muted-foreground">Email: admin@example.com</p>
            <p className="text-xs text-muted-foreground">Password: admin123</p>
          </div>

          <p className="text-center mt-6 text-muted-foreground">
            <Link to="/login" className="text-primary font-medium hover:underline">
              ← Back to User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
