import { Router } from 'express';
import { register, login, getTodos, addTodo, updateATodo, handleToggleCompleteTodo, deleteTodo } from './controllers';
import { authMiddleware } from './middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/todos', authMiddleware, getTodos);
router.post('/todos/add', authMiddleware, addTodo);
router.post('/todos/toggle-complete/:id', authMiddleware, handleToggleCompleteTodo);
router.post('/todos/update/:id', authMiddleware, updateATodo);
router.delete('/todos/delete/:id', authMiddleware, deleteTodo);

export default router;
