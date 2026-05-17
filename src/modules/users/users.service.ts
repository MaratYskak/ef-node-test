import bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { toUserResponse } from '../../common/mappers/user.mapper';
import { AppError } from '../../common/errors/app-error';

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(data: {
        fullName: string;
        birthDate: string;
        email: string;
        password: string;
    }) {
        const existingUser = await this.usersRepository.findByEmail(data.email);

        if (existingUser) {
            throw new AppError('User with this email already exists', 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.usersRepository.create({
            fullName: data.fullName,
            birthDate: new Date(data.birthDate),
            email: data.email,
            password: hashedPassword,
        });

        return toUserResponse(user);
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return toUserResponse(user);
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll();

        return users.map(toUserResponse);
    }

    async blockUser(id: string) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await this.usersRepository.update(id, {
            isActive: false,
        });

        return toUserResponse(updatedUser);
    }
}