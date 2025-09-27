import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { authenticatedFetch } from '../utils/api';
import { BarChart3, Users, Shield, Activity, Loader2, AlertCircle, CheckCircle, Clock, User } from 'lucide-react';

interface DashboardData {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  timestamp: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await authenticatedFetch('/protected/dashboard');
      setDashboardData(data);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleSecuritySettings = () => {
    alert('Security Settings feature would be implemented here. This is a demo.');
  };

  const handleExportData = () => {
    alert('Export Data feature would be implemented here. This is a demo.');
  };

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Active Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Revenue",
      value: "$45,678",
      change: "+8%",
      changeType: "positive" as const
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Security Score",
      value: "98%",
      change: "+2%",
      changeType: "positive" as const
    },
    {
      icon: <Activity className="h-8 w-8 text-orange-600" />,
      title: "System Health",
      value: "99.9%",
      change: "-1%",
      changeType: "negative" as const
    }
  ];

  const recentActivity = [
    {
      action: "User login",
      user: user?.name || "Unknown",
      timestamp: "2 minutes ago",
      status: "success" as const
    },
    {
      action: "Dashboard accessed",
      user: user?.name || "Unknown",
      timestamp: "Just now",
      status: "success" as const
    },
    {
      action: "Profile updated",
      user: "John Doe",
      timestamp: "15 minutes ago",
      status: "success" as const
    },
    {
      action: "System backup",
      user: "System",
      timestamp: "1 hour ago",
      status: "success" as const
    },
    {
      action: "Security scan",
      user: "System",
      timestamp: "2 hours ago",
      status: "warning" as const
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome back, <span className="gradient-text">{user?.name || 'User'}</span>!
              </h1>
              <p className="text-gray-600 text-lg">
                Here's what's happening with your secure dashboard today.
              </p>
            </div>
          </div>
        </div>

        {/* API Response Display */}
        {error ? (
          <div className="mb-8 card p-6 border-red-200 bg-red-50 animate-slide-down">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <span className="text-red-800 font-semibold text-lg">Error loading dashboard data</span>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadDashboardData}
              className="btn-secondary bg-red-100 text-red-800 hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        ) : dashboardData ? (
          <div className="mb-8 card p-6 border-green-200 bg-green-50 animate-slide-down">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <span className="text-green-800 font-semibold text-lg">Protected API Response</span>
            </div>
            <p className="text-green-700 mb-3 text-lg">{dashboardData.message}</p>
            <div className="flex items-center text-sm text-green-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>Loaded at: {new Date(dashboardData.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ) : null}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-6 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:from-primary-50 group-hover:to-primary-100 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === 'positive'
                      ? 'text-green-700 bg-green-100'
                      : stat.changeType === 'negative'
                      ? 'text-red-700 bg-red-100'
                      : 'text-gray-700 bg-gray-100'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 lg:p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Protected Dashboard Features</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-500 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Secure Authentication</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    JWT tokens stored in httpOnly cookies for maximum security
                  </p>
                </div>
                <div className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-green-500 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Route Protection</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Automatic redirection to login for unauthenticated users
                  </p>
                </div>
                <div className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-500 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Token Refresh</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Automatic token refresh for seamless user experience
                  </p>
                </div>
                <div className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-orange-500 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">API Integration</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Authenticated API calls with proper error handling
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 lg:p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Security Information</span>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-gray-600 font-medium">Authentication Method</span>
                  <span className="font-semibold text-gray-900">JWT with httpOnly Cookies</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-gray-600 font-medium">Session Security</span>
                  <span className="font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">High</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-gray-600 font-medium">Token Expiry</span>
                  <span className="font-semibold text-gray-900">15 minutes</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-gray-600 font-medium">Auto Refresh</span>
                  <span className="font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 animate-slide-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Recent Activity</span>
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div
                      className={`w-3 h-3 rounded-full mt-1.5 ${
                        activity.status === 'success'
                          ? 'bg-green-500'
                          : activity.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 animate-slide-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Quick Actions</span>
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    View Profile
                  </div>
                </button>
                <button 
                  onClick={handleSecuritySettings}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    Security Settings
                  </div>
                </button>
                <button 
                  onClick={handleExportData}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    Export Data
                  </div>
                </button>
                <button 
                  onClick={loadDashboardData}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                    Refresh Dashboard
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;