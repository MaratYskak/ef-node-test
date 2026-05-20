import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { validationMiddleware } from '../common/middleware/validation.middleware';
import { loginSchema } from '../modules/auth/schemas/login.schema';
import { registerSchema } from '../modules/auth/schemas/register.schema';
import { asyncHandler } from '../common/utils/async-handler';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    validationMiddleware(registerSchema),
    asyncHandler((req, res) => authController.register(req, res)),
);

router.post(
    '/login',
    validationMiddleware(loginSchema),
    asyncHandler((req, res) => authController.login(req, res)),
);

export default router;
