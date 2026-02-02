import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const mockUsers = [
  { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe', avatar: null, role: 'user' },
  { id: 2, email: 'admin@example.com', password: 'admin123', name: 'Admin User', avatar: null, role: 'admin' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser, password: undefined };
      setUser(userData);
      localStorage.setItem('quizUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (name, email, password) => {
    const exists = mockUsers.find(u => u.email === email);
    if (exists) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: mockUsers.length + 1,
      email,
      name,
      role: 'user',
      avatar: null,
    };
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('quizUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
