import { Request, Response } from 'express';
import { authService } from './index';
import { LoginDto } from './dto/login.dto';

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
}