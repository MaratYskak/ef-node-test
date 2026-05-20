import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { validationMiddleware } from '../common/middleware/validation.middleware';
import { loginSchema } from '../modules/auth/schemas/login.schema';
import { registerSchema } from '../modules/auth/schemas/register.schema';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    validationMiddleware(registerSchema),
    async (req, res, next) => {
        try {
            await authController.register(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.post(
    '/login',
    validationMiddleware(loginSchema),
    async (req, res, next) => {
        try {
            await authController.login(req, res);
        } catch (error) {
            next(error);
        }
    },
);

export default router;