# SecureDash - Full-Stack Authentication App

A production-ready full-stack web application demonstrating secure authentication and protected routes using the MERN stack with TypeScript.

## 🚀 Features

- **Secure Authentication**: JWT-based auth with httpOnly cookies
- **Protected Routes**: Client-side route protection with automatic redirects
- **Token Refresh**: Seamless token refresh for uninterrupted user experience
- **Modern UI**: Responsive design built with Tailwind CSS
- **TypeScript**: Full type safety across frontend and backend
- **Production Ready**: Security best practices and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router v6** for routing
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for fast development

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** configured for cross-origin requests

## 🔒 Security Features

- **httpOnly Cookies**: Tokens stored securely to prevent XSS attacks
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **CORS Protection**: Configured for specific origins
- **Token Expiration**: Short-lived access tokens (15 minutes) with refresh tokens (7 days)
- **Route Protection**: Server-side middleware and client-side guards
- **Input Validation**: Request validation and sanitization

## 📁 Project Structure

```
secure-dash/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── auth/
│   │   ├── AuthContext.tsx
│   │   └── ProtectedRoute.tsx
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.tsx
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secure-dash
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create `backend/.env` based on `backend/.env.example`:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/secure-dash
   JWT_ACCESS_SECRET=your_super_secret_access_token_key_here
   JWT_REFRESH_SECRET=your_different_super_secret_refresh_token_key
   ACCESS_TOKEN_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=7d
   COOKIE_DOMAIN=localhost
   NODE_ENV=development
   FRONTEND_ORIGIN=http://localhost:5173
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   # Backend (from backend/ directory)
   npm run dev
   
   # Frontend (from root directory)
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 🔐 Authentication Flow

1. **Registration**: User creates account with name, email, and password
2. **Login**: Credentials verified, JWT tokens generated and stored in httpOnly cookies
3. **Protected Access**: Client-side guards check auth state, server validates tokens
4. **Token Refresh**: Automatic refresh of expired access tokens using refresh tokens
5. **Logout**: Tokens cleared from cookies and database

## 🛡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (protected)

### Protected Routes
- `GET /api/protected/dashboard` - Dashboard data (protected)
- `GET /api/protected/profile` - User profile (protected)

### Health Check
- `GET /api/health` - API health status

## 🎨 UI Components

- **Home Page**: Landing page with features overview
- **Login/Register**: Authentication forms with validation
- **Dashboard**: Protected dashboard with stats and activity
- **Profile**: User profile management
- **Navbar**: Responsive navigation with auth state
- **Protected Routes**: Automatic redirect handling

## ⚡ Key Features

### Automatic Token Refresh
The app automatically refreshes expired access tokens in the background, providing a seamless user experience.

### Route Protection
Protected routes automatically redirect unauthenticated users to login and return them to their intended destination after authentication.

### Error Handling
Comprehensive error handling for network issues, authentication failures, and API errors.

### Responsive Design
Mobile-first design that works perfectly on all device sizes.

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Registration**: Create new account with valid details
- [ ] **Login**: Sign in with correct credentials
- [ ] **Protected Routes**: Access dashboard/profile while authenticated
- [ ] **Route Redirect**: Try accessing protected routes while logged out
- [ ] **Token Refresh**: Wait for token expiry and verify auto-refresh
- [ ] **Logout**: Sign out and verify session cleanup
- [ ] **Error Handling**: Test with invalid credentials/network issues

### API Testing

Use the included API endpoints for testing:

```bash
# Health check
curl http://localhost:4000/api/health

# Register user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login (save cookies)
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Access protected route (with cookies)
curl http://localhost:4000/api/protected/dashboard -b cookies.txt
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `4000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/secure-dash` |
| `JWT_ACCESS_SECRET` | JWT access token secret | Required |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | Required |
| `ACCESS_TOKEN_EXPIRES_IN` | Access token expiry | `15m` |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiry | `7d` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_ORIGIN` | Frontend URL for CORS | `http://localhost:5173` |

### Security Recommendations

1. **Use strong, unique secrets** for JWT tokens in production
2. **Enable HTTPS** in production environments
3. **Set secure cookie options** for production
4. **Implement rate limiting** on authentication endpoints
5. **Use environment variables** for all sensitive configuration
6. **Regular security audits** and dependency updates

## 📝 Development Notes

- **TypeScript**: Strict type checking enabled for both frontend and backend
- **ESLint**: Code quality and consistency enforcement
- **Hot Reload**: Development servers support hot module replacement
- **Error Boundaries**: React error boundaries for graceful error handling
- **Loading States**: Proper loading indicators throughout the app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web development best practices
- Security guidelines from OWASP
- UI/UX inspiration from modern web applications
- Community feedback and contributions

---

**SecureDash** - Demonstrating production-ready authentication patterns for modern web applications.