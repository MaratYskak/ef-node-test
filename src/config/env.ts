import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),

    DATABASE_URL: z
        .string()
        .min(1, 'DATABASE_URL is required'),

    JWT_SECRET: z
        .string()
        .min(10, 'JWT_SECRET must be at least 10 characters'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        'Invalid environment variables:',
        parsedEnv.error.format(),
    );

    process.exit(1);
}

export const env = parsedEnv.data;