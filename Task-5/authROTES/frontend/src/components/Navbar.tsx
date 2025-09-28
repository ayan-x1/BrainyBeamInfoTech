import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Shield, LogOut, User, Home, BarChart3, Menu, X, Crown, Users } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string, isMobile = false) => {
    const base = isMobile 
      ? "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
      : "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const active = "bg-primary-100 text-primary-700 shadow-sm";
    const inactive = "text-gray-600 hover:text-gray-900 hover:bg-gray-50";
    
    return `${base} ${isActive(path) ? active : inactive}`;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1 rounded-lg bg-gradient-to-r from-primary-500 to-purple-600 group-hover:scale-110 transition-transform duration-200">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl text-gray-900 gradient-text">Dash</span>
            </Link>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden lg:block">
            <div className="ml-8 flex items-center space-x-1">
              <Link to="/" className={linkClass('/')}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className={linkClass('/dashboard')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link to="/profile" className={linkClass('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  
                  {/* Role-based navigation */}
                  {(user as any).role === 'admin' && (
                    <Link to="/admin" className={linkClass('/admin')}>
                      <Crown className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                  )}
                  
                  {((user as any).role === 'admin' || (user as any).role === 'moderator') && (
                    <Link to="/moderator" className={linkClass('/moderator')}>
                      <Users className="h-4 w-4 mr-2" />
                      Moderator
                    </Link>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* User menu - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-sm text-gray-700 font-medium truncate max-w-24">{user.name}</span>
                    <div className="text-xs text-gray-500 capitalize">
                      {(user as any).role || 'user'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-105"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-3 sm:px-4 py-2 text-sm"
                >
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
              <Link
                to="/"
                className={linkClass('/', true)}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                Home
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={linkClass('/dashboard', true)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className={linkClass('/profile', true)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Link>
                  
                  {/* Role-based mobile navigation */}
                  {(user as any).role === 'admin' && (
                    <Link
                      to="/admin"
                      className={linkClass('/admin', true)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Crown className="h-5 w-5 mr-3" />
                      Admin
                    </Link>
                  )}
                  
                  {((user as any).role === 'admin' || (user as any).role === 'moderator') && (
                    <Link
                      to="/moderator"
                      className={linkClass('/moderator', true)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="h-5 w-5 mr-3" />
                      Moderator
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex items-center px-4 py-3 mb-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <p className="text-xs text-primary-600 font-medium capitalize">
                          {(user as any).role || 'user'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;