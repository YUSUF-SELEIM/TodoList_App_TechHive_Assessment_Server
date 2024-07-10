import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'mysecret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded as { userId: number };
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token' });
  }
};
