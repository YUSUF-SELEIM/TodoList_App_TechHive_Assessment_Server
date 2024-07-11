import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const SECRET = 'hive';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: 'User already exists' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase(),
        },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        // Assuming req.user is added by an authentication middleware and contains userId
        const userId = (req.user as { userId: string }).userId;

        const todos = await prisma.todo.findMany({
            where: {
                userId: userId,
            },
        });

        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching todos' });
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const userId = (req.user as { userId: string }).userId;

        const todo = await prisma.todo.create({
            data: {
                id: randomUUID(), 
                content,
                userId,
            },
        });

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding todo' });
    }
}

export const markAsCompleted = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);

        const todo = await prisma.todo.update({
            where: {
                id,
            },
            data: {
                completed: true,
            },
        });

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while marking todo as completed' });
    }
}
