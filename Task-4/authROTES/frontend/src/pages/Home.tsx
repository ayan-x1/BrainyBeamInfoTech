import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Shield, Lock, Users, Zap, CheckCircle, ArrowRight, BarChart3, User, Play } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Authentication",
      description: "Industry-standard JWT authentication with httpOnly cookies for maximum security."
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      title: "Protected Routes",
      description: "Route-level protection ensures only authenticated users can access sensitive areas."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "User Management",
      description: "Complete user registration, login, and profile management system."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Fast & Responsive",
      description: "Built with React, TypeScript, and Tailwind CSS for optimal performance."
    }
  ];

  const benefits = [
    "Automatic token refresh for seamless user experience",
    "Secure cookie-based authentication",
    "Protection against common security vulnerabilities",
    "Clean and intuitive user interface",
    "Production-ready codebase"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to <span className="text-yellow-300 animate-pulse-slow">SecureDash</span>
            </h1>
            <p className="max-w-4xl mx-auto mb-8 text-lg leading-relaxed text-blue-100 sm:text-xl md:text-2xl">
              A production-ready full-stack authentication system built with modern technologies
            </p>
            
            {user ? (
              <div className="space-y-6 animate-slide-up">
                <div className="inline-flex items-center px-6 py-3 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                    <span className="text-lg font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-semibold">Welcome back, {user.name}!</p>
                    <p className="text-sm text-blue-100">Ready to explore your dashboard?</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-4 font-bold transition-all duration-300 transform bg-white group text-primary-600 rounded-xl hover:bg-gray-50 hover:scale-105 hover:shadow-strong"
                  >
                    <BarChart3 className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 transform bg-transparent border-2 border-white group rounded-xl hover:bg-white hover:text-primary-600 hover:scale-105"
                  >
                    <User className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                    View Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-4 sm:flex-row animate-slide-up">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 font-bold text-white transition-all duration-300 transform group bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl hover:from-yellow-500 hover:to-orange-600 hover:scale-105 hover:shadow-strong animate-glow"
                >
                  <Zap className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 transform bg-transparent border-2 border-white group rounded-xl hover:bg-white hover:text-primary-600 hover:scale-105"
                >
                  <Lock className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center animate-fade-in">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Built for <span className="gradient-text">Security & Performance</span>
            </h2>
            <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-600 sm:text-xl">
              SecureDash demonstrates best practices for modern web application authentication
              and authorization using the latest technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 group card lg:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-slide-up">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Why Choose <span className="gradient-text">SecureDash</span>?
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                Built with enterprise-grade security practices and modern development patterns
                to ensure your application is both secure and maintainable.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-green-200 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 transition-colors duration-200 group-hover:text-gray-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 card lg:p-8 animate-slide-up">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                <span className="gradient-text">Tech Stack</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="p-6 transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-medium">
                  <h4 className="flex items-center mb-4 font-bold text-gray-900">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-500 rounded-lg">
                      <span className="text-sm font-bold text-white">F</span>
                    </div>
                    Frontend
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                      React 18
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                      TypeScript
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                      React Router v6
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                      Tailwind CSS
                    </li>
                  </ul>
                </div>
                <div className="p-6 transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-medium">
                  <h4 className="flex items-center mb-4 font-bold text-gray-900">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-500 rounded-lg">
                      <span className="text-sm font-bold text-white">B</span>
                    </div>
                    Backend
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      Node.js
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      Express
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      MongoDB
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      JWT Auth
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protected Routes Demo Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Protected Routes <span className="gradient-text">Demonstration</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Experience dynamic authentication and role-based access control in action. 
              See how different user roles affect access to various parts of the application.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Dynamic Route Protection
                </h3>
                <p className="mb-6 text-gray-600">
                  Our protected routes system demonstrates real-time authentication checks, 
                  role-based access control, and seamless user experience with proper 
                  redirects and access denied pages.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    Authentication-based protection
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    Role-based access control
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    Dynamic navigation menus
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    Real-time access validation
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-800">
                    Interactive Demo
                  </h4>
                  <p className="text-sm text-gray-600">
                    Try different user roles and see how access changes dynamically
                  </p>
                </div>
                
                <Link
                  to="/demo"
                  className="inline-flex items-center px-8 py-4 font-bold text-white transition-all duration-300 transform group bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-strong"
                >
                  <Play className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                  View Demo
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-700">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-24">
            <div className="text-center animate-fade-in">
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Get <span className="text-yellow-300">Started</span>?
              </h2>
              <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-blue-100 sm:text-xl">
                Create your account today and explore the secure dashboard with protected routes.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 text-lg font-bold transition-all duration-300 transform bg-white group text-primary-600 rounded-xl hover:bg-gray-50 hover:scale-105 hover:shadow-strong animate-glow"
              >
                <Zap className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                Create Account
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;