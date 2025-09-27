import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here';

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies?.accessToken || 
                  (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
                    ? req.headers.authorization.split(' ')[1] 
                    : null);

    if (!token) {
      return res.status(401).json({ 
        message: 'Access token not provided. Please login to continue.' 
      });
    }

    // Verify token
    const payload = jwt.verify(token, JWT_SECRET) as any;
    
    // Attach user info to request
    (req as any).user = payload;
    
    next();
  } catch (error: any) {
    console.error('Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Access token has expired. Please refresh your session.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid access token. Please login again.' 
      });
    }
    
    return res.status(401).json({ 
      message: 'Token verification failed' 
    });
  }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || 
                  (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
                    ? req.headers.authorization.split(' ')[1] 
                    : null);

    if (token) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        (req as any).user = payload;
      } catch (error) {
        // Token is invalid but we continue without user
        (req as any).user = null;
      }
    } else {
      (req as any).user = null;
    }
    
    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    (req as any).user = null;
    next();
  }
};