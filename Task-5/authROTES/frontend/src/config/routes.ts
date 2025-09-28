// Route configuration with protection levels
export interface RouteConfig {
  path: string;
  component: React.ComponentType<any> | (() => Promise<React.ComponentType<any>>);
  isProtected: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
  title?: string;
  description?: string;
}

// Route protection levels
export const PROTECTION_LEVELS = {
  PUBLIC: 'public',
  PROTECTED: 'protected',
  ADMIN_ONLY: 'admin_only',
  MULTI_ROLE: 'multi_role'
} as const;

// Predefined route configurations
export const ROUTE_CONFIGS: RouteConfig[] = [
  // Public routes
  {
    path: '/',
    component: () => import('../pages/Home').then(m => m.default),
    isProtected: false,
    title: 'Home',
    description: 'Welcome to our application'
  },
  {
    path: '/login',
    component: () => import('../pages/Login').then(m => m.default),
    isProtected: false,
    title: 'Login',
    description: 'Sign in to your account'
  },
  {
    path: '/register',
    component: () => import('../pages/Register').then(m => m.default),
    isProtected: false,
    title: 'Register',
    description: 'Create a new account'
  },
  
  // Protected routes (require authentication)
  {
    path: '/dashboard',
    component: () => import('../pages/Dashboard').then(m => m.default),
    isProtected: true,
    title: 'Dashboard',
    description: 'Your personal dashboard'
  },
  {
    path: '/profile',
    component: () => import('../pages/Profile').then(m => m.default),
    isProtected: true,
    title: 'Profile',
    description: 'Manage your profile'
  },
  
  // Admin-only routes (require admin role)
  {
    path: '/admin',
    component: () => import('../pages/Admin').then(m => m.default),
    isProtected: true,
    requiredRole: 'admin',
    title: 'Admin Panel',
    description: 'Administrative controls'
  },
  
  // Multi-role routes (require specific roles)
  {
    path: '/moderator',
    component: () => import('../pages/Moderator').then(m => m.default),
    isProtected: true,
    requiredRole: ['admin', 'moderator'],
    title: 'Moderator Panel',
    description: 'Content moderation tools'
  }
];

// Helper function to get route config by path
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return ROUTE_CONFIGS.find(route => route.path === path);
};

// Helper function to check if route is protected
export const isRouteProtected = (path: string): boolean => {
  const config = getRouteConfig(path);
  return config?.isProtected || false;
};

// Helper function to get required role for route
export const getRequiredRole = (path: string): string | string[] | undefined => {
  const config = getRouteConfig(path);
  return config?.requiredRole;
};
