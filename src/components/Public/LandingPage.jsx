import { Link } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import { categories } from '../../data/categories';

export default function LandingPage() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Adaptive Learning',
      description: 'Questions adjust to your skill level for optimal learning'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Detailed analytics and insights on your performance'
    },
    {
      icon: '🏆',
      title: 'Compete & Win',
      description: 'Climb leaderboards and earn achievements'
    },
    {
      icon: '🔥',
      title: 'Daily Challenges',
      description: 'New quizzes every day to keep you engaged'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span>🚀</span>
              <span>Start learning today for free</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Learn anything with{' '}
              <span className="text-gradient-hero">smart quizzes</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Master new subjects, track your progress, and compete with learners worldwide. 
              Our adaptive quiz system makes learning fun and effective.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Quiz Topics</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Explore Quiz Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From academic subjects to fun brain games, we have quizzes for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="card-interactive p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="badge-primary">{category.quizCount} Quizzes</span>
                  <span className="text-primary font-medium text-sm">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose QuizMaster?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to make learning engaging, effective, and fun
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="card-base p-6 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-glow p-8 sm:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of learners who are already improving their knowledge with QuizMaster. 
              It's free to get started!
            </p>
            <Link to="/register" className="btn-accent text-lg px-8 py-4">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
