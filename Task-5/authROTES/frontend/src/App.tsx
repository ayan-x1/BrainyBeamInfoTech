import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Moderator from './pages/Moderator';
import ProtectedRoutesDemo from './pages/ProtectedRoutesDemo';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/demo" element={<ProtectedRoutesDemo />} />
              
              {/* Protected Routes - Basic Authentication Required */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Role-Based Protected Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute 
                    requiredRole="admin"
                    showAccessDenied={true}
                  >
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/moderator" 
                element={
                  <ProtectedRoute 
                    requiredRole={['admin', 'moderator']}
                    showAccessDenied={true}
                  >
                    <Moderator />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-white font-bold text-2xl">404</span>
                      </div>
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                      <p className="text-gray-600 text-lg">The page you're looking for doesn't exist.</p>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;