import { Router } from 'express';
import { register, login, getTodos, addTodo, markAsCompleted } from './controllers';
import { authMiddleware } from './middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/todos', authMiddleware, getTodos);
router.post('/todos/add', authMiddleware, addTodo);
router.post('/todos/complete/:id', authMiddleware, markAsCompleted);

export default router;
