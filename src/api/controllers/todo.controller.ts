import RequestWithUser from 'reqWithUser.type';
import TodoService from '../../services/todo.service';
import { NextFunction, Request, Response } from 'express';

class TodoController {
    static async add(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            const todoResult = await TodoService.add({
                ...req.body,
                user: user.id,
            });
            res.status(201).json({
                success: true,
                result: todoResult,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { user } = req;
            const updatedTodo = await TodoService.update(
                { _id: req.params.id, user: user.id },
                req.body,
                { new: true }
            );

            if (!updatedTodo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            res.json({
                result: updatedTodo,
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { user } = req;
            const deletedTodo = await TodoService.delete({
                _id: req.params.id,
                user: user.id,
            });

            if (!deletedTodo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.json({
                result: 'done',
            });
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { user } = req;
            const result = await TodoService.getInfo({
                _id: req.params.id,
                user: user.id,
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    static async getAll(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { user } = req;
            const result = await TodoService.getAll({ user: user.id });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default TodoController;
