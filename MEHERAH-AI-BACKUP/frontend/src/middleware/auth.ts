import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Express Typings Override for Context Security
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'Founder' | 'Analyst' | 'Developer' | 'Admin';
    email: string;
  };
}

// Structural Authentication Middleware
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required. Please sign in via the Beta Entrance.' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || 'meherah_production_jwt_secret_key_2026';

  jwt.verify(token, jwtSecret, (err, decoded: any) => {
    if (err) {
      res.status(403).json({ error: 'Session expired or invalid token structure.' });
      return;
    }
    req.user = decoded;
    next();
  });
};

// Secret Masking Utility for Logs and Telemetry
export function maskSecret(secret?: string): string {
  if (!secret) return '[NOT_SET]';
  if (secret.length <= 8) return '****';
  return `${secret.substring(0, 4)}...${secret.substring(secret.length - 4)}`;
}

// Sanitizes objects to prevent leaking API keys in logs or responses
export function sanitizeLogData<T extends Record<string, any>>(data: T): T {
  if (!data || typeof data !== 'object') return data;
  const sanitized = { ...data };
  
  const sensitiveKeys = ['key', 'apiKey', 'api_key', 'token', 'secret', 'authorization', 'password'];
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      sanitized[key as keyof T] = maskSecret(String(sanitized[key])) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key as keyof T] = sanitizeLogData(sanitized[key]);
    }
  }
  return sanitized;
}

// Security Middleware: Ensures API request authentication
export function gatewayAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // Allow internal app requests or check Authorization header / API key
  const authHeader = req.headers.authorization;
  const internalKey = req.headers['x-meherah-gateway-key'] || req.headers['x-api-key'];

  // Basic check for secure HTTPS header protocol in production
  if (process.env.NODE_ENV === 'production') {
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
    if (!isHttps) {
      console.warn('[SECURITY WARNING] Insecure HTTP connection detected for AI Gateway');
    }
  }

  // If gateway is protected with a secret key in env, validate it
  const requiredGatewayKey = process.env.MEHERAH_GATEWAY_SECRET;
  if (requiredGatewayKey) {
    if (!internalKey || internalKey !== requiredGatewayKey) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED: Invalid or missing X-MEHERAH-GATEWAY-KEY header.'
      });
    }
  }

  next();
}
