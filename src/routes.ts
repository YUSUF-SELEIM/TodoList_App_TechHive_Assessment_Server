import { Router } from 'express';
import { register, login, getTodos } from './controllers';
import { authMiddleware } from './middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/todos', authMiddleware, getTodos);

export default router;
