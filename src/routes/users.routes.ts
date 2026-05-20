import { Router } from 'express';
import { UsersController } from '../modules/users/users.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';
import { roleMiddleware } from '../common/middleware/role.middleware';
import { asyncHandler } from '../common/utils/async-handler';

const router = Router();

const usersController = new UsersController();

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    asyncHandler((req, res) => usersController.getAll(req, res)),
);

router.get(
    '/:id',
    authMiddleware,
    asyncHandler((req, res) => usersController.getById(req, res)),
);

router.patch(
    '/:id/block',
    authMiddleware,
    asyncHandler((req, res) => usersController.block(req, res)),
);

export default router;
