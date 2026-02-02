import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public
import LandingPage from './components/Public/LandingPage';

// Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// User
import UserLayout from './components/User/UserLayout';
import Home from './components/User/Home';
import Dashboard from './components/User/Dashboard';
import StartQuiz from './components/User/StartQuiz';
import Quiz from './components/User/Quiz';
import Result from './components/User/Result';
import DailyQuiz from './components/User/DailyQuiz';
import Leaderboard from './components/User/Leaderboard';
import Achievements from './components/User/Achievements';
import Settings from './components/User/Settings';

// Admin
import AdminLogin from './components/Admin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import CategoryMaster from './components/Admin/CategoryMaster';
import SubjectMaster from './components/Admin/SubjectMaster';
import LevelMaster from './components/Admin/LevelMaster';
import QuestionMaster from './components/Admin/QuestionMaster';
import DailyQuizMaster from './components/Admin/DailyQuizMaster';
import AchievementMaster from './components/Admin/AchievementMaster';
import AdminReports from './components/Admin/AdminReports';
import BulkMaster from './components/Admin/BulkMaster';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-quiz" element={<StartQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/daily-quiz" element={<DailyQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/category-master" element={<CategoryMaster />} />
        <Route path="/admin/subject-master" element={<SubjectMaster />} />
        <Route path="/admin/level-master" element={<LevelMaster />} />
        <Route path="/admin/question-master" element={<QuestionMaster />} />
        <Route path="/admin/bulk-master" element={<BulkMaster />} />
        <Route path="/admin/daily-quiz-master" element={<DailyQuizMaster />} />
        <Route path="/admin/achievement-master" element={<AchievementMaster />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
