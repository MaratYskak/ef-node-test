import { Request, Response } from 'express';
import { usersService } from './index';
import { RegisterUserDto } from './dto/register-user.dto';
import { AppError } from '../../common/errors/app-error';

export class UsersController {
    async register(req: Request, res: Response) {
        const dto: RegisterUserDto = req.body;

        const user = await usersService.createUser(dto);

        res.status(201).json({
            data: user,
        });
    }

    async getById(req: Request, res: Response) {
        const userId = req.params.id as string;

        const currentUser = req.user!;

        const isAdmin = currentUser.role === 'ADMIN';
        const isSelf = currentUser.userId === userId;

        if (!isAdmin && !isSelf) {
            throw new AppError('Forbidden', 403);
        }

        const user = await usersService.getUserById(userId);

        res.status(200).json({
            data: user,
        });
    }

    async getAll(req: Request, res: Response) {
        const users = await usersService.getAllUsers();

        res.status(200).json({
            data: users,
        });
    }

    async block(req: Request, res: Response) {
        const userId = req.params.id as string;

        const currentUser = req.user!;

        const isAdmin = currentUser.role === 'ADMIN';
        const isSelf = currentUser.userId === userId;

        if (!isAdmin && !isSelf) {
            throw new AppError('Forbidden', 403);
        }

        const user = await usersService.blockUser(userId);

        res.status(200).json({
            data: user,
        });
    }
}