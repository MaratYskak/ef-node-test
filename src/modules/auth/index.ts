import { JwtService } from '../../common/services/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { AuthService } from './auth.service';

const usersRepository = new UsersRepository();

const jwtService = new JwtService();

export const authService = new AuthService(
    usersRepository,
    jwtService,
);