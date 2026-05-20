import { PrismaClient } from '@prisma/client';

class PrismaService {
    private static instance: PrismaClient;

    public static getClient(): PrismaClient {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaClient({
                log: ['error', 'warn'],
            });
        }

        return PrismaService.instance;
    }
}

export const prisma = PrismaService.getClient();
