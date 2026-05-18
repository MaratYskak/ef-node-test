import { validationMiddleware } from './common/middleware/validation.middleware';
import { registerSchema } from './modules/auth/schemas/register.schema';
import { loginSchema } from './modules/auth/schemas/login.schema';
import { authMiddleware } from './common/middleware/auth.middleware';
import { roleMiddleware } from './common/middleware/role.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { errorMiddleware } from './common/middleware/error.middleware';
import { UsersController } from './modules/users/users.controller';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const usersController = new UsersController();
const authController = new AuthController();

const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) =>
            Promise.resolve(fn(req, res, next)).catch(next);

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
    });
});

app.post('/auth/register', validationMiddleware(registerSchema), asyncHandler((req, res) => {
    return usersController.register(req, res);
}));

app.post('/auth/login', validationMiddleware(loginSchema), asyncHandler((req, res) => {
    return authController.login(req, res);
}));

app.get(
    '/users',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    asyncHandler((req, res) => {
        return usersController.getAll(req, res);
    }),
);

app.get(
    '/users/:id',
    authMiddleware,
    asyncHandler((req, res) => {
        return usersController.getById(req, res);
    }),
);

app.patch(
    '/users/:id/block',
    authMiddleware,
    asyncHandler((req, res) => {
        return usersController.block(req, res);
    }),
);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});