import { useAuth } from '../auth/AuthContext';
import { Shield, Users, Settings, Database, Activity } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();

  const adminStats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
    { label: 'Active Sessions', value: '89', icon: Activity, color: 'green' },
    { label: 'Database Size', value: '2.4 GB', icon: Database, color: 'purple' },
    { label: 'System Status', value: 'Healthy', icon: Settings, color: 'green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-3 sm:space-y-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-0 sm:mr-4 flex-shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">Admin Panel</h1>
              <p className="text-sm sm:text-base text-gray-600 truncate">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start sm:items-center">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0 flex-1">
                <span className="text-red-800 font-medium text-sm sm:text-base">Admin Access Required</span>
                <p className="text-red-700 text-xs sm:text-sm mt-1">
                  This page is only accessible to users with admin privileges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${stat.color}-600`} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-800 truncate ml-2">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm truncate">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">User Management</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-800 text-sm sm:text-base">Manage Users</div>
                <div className="text-xs sm:text-sm text-gray-600">View, edit, and delete user accounts</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-800 text-sm sm:text-base">Role Management</div>
                <div className="text-xs sm:text-sm text-gray-600">Assign and modify user roles</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">System Settings</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-800 text-sm sm:text-base">Database Maintenance</div>
                <div className="text-xs sm:text-sm text-gray-600">Optimize and backup database</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-800 text-sm sm:text-base">Security Settings</div>
                <div className="text-xs sm:text-sm text-gray-600">Configure security policies</div>
              </button>
            </div>
          </div>
        </div>

        {/* Protection Notice */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-start sm:items-center mb-2">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
            <h3 className="text-base sm:text-lg font-semibold">Protected Route Demonstration</h3>
          </div>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            This page demonstrates role-based access control. Only users with 'admin' role can access this page.
            The route is protected using the ProtectedRoute component with requiredRole='admin'.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;

