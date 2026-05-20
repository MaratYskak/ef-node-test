import { Router } from 'express';
import { UsersController } from '../modules/users/users.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';
import { roleMiddleware } from '../common/middleware/role.middleware';

const router = Router();

const usersController = new UsersController();

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    async (req, res, next) => {
        try {
            await usersController.getAll(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/:id',
    authMiddleware,
    async (req, res, next) => {
        try {
            await usersController.getById(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    '/:id/block',
    authMiddleware,
    async (req, res, next) => {
        try {
            await usersController.block(req, res);
        } catch (error) {
            next(error);
        }
    },
);

export default router;