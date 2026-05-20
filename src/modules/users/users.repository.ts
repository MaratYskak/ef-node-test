import { prisma } from '../../common/prisma/prisma.service';
import { User } from '@prisma/client';

export class UsersRepository {
    async create(data: {
        fullName: string;
        birthDate: Date;
        email: string;
        password: string;
    }) {
        return prisma.user.create({
            data,
        });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async findAll() {
        return prisma.user.findMany();
    }

    async update(id: string, data: Partial<User>) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }
}
