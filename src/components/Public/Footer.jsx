import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                QuizMaster
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Learn anything with smart quizzes. Track your progress, compete with friends, 
              and master new subjects every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">📚 Academic</li>
              <li className="text-muted-foreground">🏆 Competitive</li>
              <li className="text-muted-foreground">💻 Programming</li>
              <li className="text-muted-foreground">🌍 General Knowledge</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 QuizMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
