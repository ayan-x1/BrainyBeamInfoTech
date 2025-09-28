import { Router } from 'express';
import { register, login, refresh, logout, getMe, createAdmin, createModerator } from '../controllers/auth.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

// Development routes for creating admin/moderator users
router.post('/create-admin', createAdmin);
router.post('/create-moderator', createModerator);

// Protected routes
router.get('/me', verifyAccessToken, getMe);

export default router;