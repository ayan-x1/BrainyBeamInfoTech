import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Shield, Lock, Crown, Users, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const ProtectedRoutesDemo = () => {
  const { user } = useAuth();

  const routeExamples = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      description: 'Basic protected route - requires authentication',
      protection: 'Authentication Required',
      icon: Shield,
      color: 'blue',
      accessible: !!user
    },
    {
      path: '/profile',
      title: 'Profile',
      description: 'User profile management - requires authentication',
      protection: 'Authentication Required',
      icon: Shield,
      color: 'blue',
      accessible: !!user
    },
    {
      path: '/admin',
      title: 'Admin Panel',
      description: 'Administrative controls - requires admin role',
      protection: 'Admin Role Required',
      icon: Crown,
      color: 'red',
      accessible: (user as any)?.role === 'admin'
    },
    {
      path: '/moderator',
      title: 'Moderator Panel',
      description: 'Content moderation - requires admin or moderator role',
      protection: 'Admin/Moderator Role Required',
      icon: Users,
      color: 'purple',
      accessible: (user as any)?.role === 'admin' || (user as any)?.role === 'moderator'
    }
  ];

  const currentUserRole = (user as any)?.role || 'user';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Protected Routes Demonstration
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Dynamic authentication and role-based access control
          </p>
          
          {/* Current User Status */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {user ? user.name : 'Not Authenticated'}
                </h3>
                <p className="text-sm text-gray-600">
                  Role: <span className="font-medium text-primary-600 capitalize">{currentUserRole}</span>
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {user ? 'You are currently logged in' : 'Please log in to access protected routes'}
            </div>
          </div>
        </div>

        {/* Route Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {routeExamples.map((route, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-${route.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                    <route.icon className={`h-5 w-5 text-${route.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{route.title}</h3>
                    <p className="text-sm text-gray-600">{route.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {route.accessible ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Protection Level:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    route.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    route.color === 'red' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {route.protection}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Access Status:</span>
                <span className={`text-sm font-medium ${
                  route.accessible ? 'text-green-600' : 'text-red-600'
                }`}>
                  {route.accessible ? 'Accessible' : 'Restricted'}
                </span>
              </div>

              <div className="mt-4">
                <Link
                  to={route.path}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    route.accessible
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!route.accessible) {
                      e.preventDefault();
                    }
                  }}
                >
                  {route.accessible ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Visit {route.title}
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Access Denied
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Details */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Implementation Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🔐 Authentication Protection</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Automatic redirect to login for unauthenticated users
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Preserves intended destination after login
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Loading states during authentication checks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Session persistence across page refreshes
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Role-Based Access Control</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Single role requirement (admin only)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Multiple role support (admin OR moderator)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Custom access denied pages
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Dynamic navigation based on user roles
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Dynamic Implementation</h3>
            <p className="text-gray-600 mb-4">
              This implementation is completely dynamic and not static. The protected routes system:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Automatically checks authentication status in real-time</li>
              <li>• Validates user roles against route requirements</li>
              <li>• Provides different UI experiences based on access levels</li>
              <li>• Handles edge cases like expired sessions and role changes</li>
              <li>• Supports both single and multi-role access patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutesDemo;
