import bcrypt from 'bcrypt';
import { AppError } from '../../common/errors/app-error';
import { JwtService } from '../../common/services/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { toUserResponse } from '../../common/mappers/user.mapper';

export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        if (!user.isActive) {
            throw new AppError('User is blocked', 403);
        }

        const accessToken = this.jwtService.generateToken({
            userId: user.id,
            role: user.role,
        });

        return {
            accessToken,
            user: toUserResponse(user),
        };
    }
}