import { Request, Response } from 'express';
import { authService } from './index';
import { LoginDto } from './dto/login.dto';
import { usersService } from '../users';
import { RegisterUserDto } from '../users/dto/register-user.dto';

export class AuthController {
    async login(req: Request, res: Response) {
        const dto: LoginDto = req.body;

        const result = await authService.login(
            dto.email,
            dto.password,
        );

        res.status(200).json({
            data: result,
        });
    }

    async register(req: Request, res: Response) {
        const dto: RegisterUserDto = req.body;

        const user = await usersService.createUser(dto);

        res.status(201).json({
            data: user,
        });
    }
}