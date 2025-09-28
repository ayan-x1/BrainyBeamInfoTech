import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string | string[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/login',
  showAccessDenied = true 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-gray-600 font-medium">Authenticating...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole) {
    const userRole = (user as any).role || 'user'; // Default role if not specified
    const hasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(userRole)
      : userRole === requiredRole;

    if (!hasRequiredRole) {
      if (showAccessDenied) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-pink-100">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
              <p className="text-gray-600 mb-6">
                You don't have permission to access this page. 
                {Array.isArray(requiredRole) 
                  ? ` Required roles: ${requiredRole.join(', ')}`
                  : ` Required role: ${requiredRole}`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.history.back()}
                  className="btn-secondary px-6 py-2 text-sm font-medium"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="btn-primary px-6 py-2 text-sm font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  return children;
};

// Higher-order component for easier route protection
export const withAuth = (Component: React.ComponentType<any>, options?: Omit<ProtectedRouteProps, 'children'>) => {
  return (props: any) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Hook for checking authentication status
export const useAuthGuard = () => {
  const { user, loading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
    canAccess: (requiredRole?: string | string[]) => {
      if (!user) return false;
      if (!requiredRole) return true;
      
      const userRole = (user as any).role || 'user';
      return Array.isArray(requiredRole) 
        ? requiredRole.includes(userRole)
        : userRole === requiredRole;
    }
  };
};