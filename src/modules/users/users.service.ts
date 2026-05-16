import bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UserRole } from '@prisma/client';

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(data: {
        fullName: string;
        birthDate: Date;
        email: string;
        password: string;
    }) {
        // Проверка: существует ли пользователь
        const existingUser = await this.usersRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Создаём пользователя
        const user = await this.usersRepository.create({
            fullName: data.fullName,
            birthDate: data.birthDate,
            email: data.email,
            password: hashedPassword,
        });

        return user;
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getAllUsers() {
        return this.usersRepository.findAll();
    }

    async blockUser(id: string) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return this.usersRepository.update(id, {
            isActive: false,
        });
    }
}