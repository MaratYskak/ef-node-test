import { Request, Response } from 'express';
import { usersService } from './index';
import { RegisterUserDto } from './dto/register-user.dto';

export class UsersController {
    async register(req: Request, res: Response) {
        const dto: RegisterUserDto = req.body;

        const user = await usersService.createUser(dto);

        res.status(201).json({
            data: user,
        });
    }
}