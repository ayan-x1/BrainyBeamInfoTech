import { useAuth } from '../auth/AuthContext';
import { Shield, MessageSquare, Flag, CheckCircle, XCircle } from 'lucide-react';

const Moderator = () => {
  const { user } = useAuth();

  const moderationTasks = [
    { id: 1, type: 'Comment', content: 'Inappropriate language detected', status: 'pending', priority: 'high' },
    { id: 2, type: 'Post', content: 'Spam content reported', status: 'pending', priority: 'medium' },
    { id: 3, type: 'User', content: 'Suspicious activity detected', status: 'reviewed', priority: 'high' },
    { id: 4, type: 'Comment', content: 'Harassment report', status: 'pending', priority: 'high' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-3 sm:space-y-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-0 sm:mr-4 flex-shrink-0">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">Moderator Panel</h1>
              <p className="text-sm sm:text-base text-gray-600 truncate">Content moderation dashboard for {user?.name}</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start sm:items-center">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0 flex-1">
                <span className="text-blue-800 font-medium text-sm sm:text-base">Moderator Access Required</span>
                <p className="text-blue-700 text-xs sm:text-sm mt-1">
                  This page is accessible to users with 'admin' or 'moderator' roles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm">Pending Reviews</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">12</p>
              </div>
              <Flag className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 flex-shrink-0 ml-2" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm">Approved Today</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">28</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0 ml-2" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm">Rejected Today</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">5</p>
              </div>
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>

        {/* Moderation Tasks */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Recent Moderation Tasks</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {moderationTasks.map((task) => (
                <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 sm:mt-0 ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-800 text-sm sm:text-base truncate">{task.type}: {task.content}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Priority: {task.priority}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'pending' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.status}
                    </span>
                    {task.status === 'pending' && (
                      <div className="flex space-x-1">
                        <button className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Protection Notice */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-start sm:items-center mb-2">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
            <h3 className="text-base sm:text-lg font-semibold">Multi-Role Protected Route</h3>
          </div>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            This page demonstrates multi-role access control. Users with either 'admin' or 'moderator' roles can access this page.
            The route is protected using the ProtectedRoute component with requiredRole=['admin', 'moderator'].
          </p>
        </div>
      </div>
    </div>
  );
};

export default Moderator;

