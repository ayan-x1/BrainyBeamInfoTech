import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { apiFetch } from '../utils/api';

type User = { 
  id: string; 
  email: string; 
  name: string; 
  role: 'user' | 'moderator' | 'admin';
} | null;

interface AuthContextValue {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check if we have any cookies first
      const hasCookies = document.cookie.includes('refreshToken=') || document.cookie.includes('accessToken=');
      
      if (!hasCookies) {
        console.log('No authentication cookies found - user needs to login');
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await apiFetch('/auth/refresh', { method: 'POST' });
      setUser(data.user || null);
    } catch (error: any) {
      // Only log as error if it's not a missing token (which is expected for new users)
      if (error.status === 401 && error.message?.includes('Refresh token not provided')) {
        console.log('No valid session found - user needs to login');
      } else {
        console.error('Auth initialization error:', error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await apiFetch('/auth/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password })
      });
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await apiFetch('/auth/register', { 
        method: 'POST', 
        body: JSON.stringify({ name, email, password })
      });
      
      // Auto-login after successful registration
      await login(email, password);
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if server request fails
    } finally {
      setUser(null);
    }
  };

  const refreshAuth = async () => {
    try {
      const data = await apiFetch('/auth/refresh', { method: 'POST' });
      setUser(data.user || null);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      refreshAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};