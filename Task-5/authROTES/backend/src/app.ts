import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import { verifyAccessToken } from './middleware/auth.middleware.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// CORS configuration
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);

// Protected routes
app.get('/api/protected/dashboard', verifyAccessToken, (req, res) => {
  const user = (req as any).user;
  res.json({ 
    message: `Welcome back, ${user.name}! You have successfully accessed the protected dashboard.`,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/protected/profile', verifyAccessToken, (req, res) => {
  const user = (req as any).user;
  res.json({
    message: 'Profile data retrieved successfully',
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;