import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'hive';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token without 'Bearer'
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded as { userId: string };
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token' });
  }
};
