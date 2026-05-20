import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Authorization header missing', 401));
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
        return next(new AppError('Invalid authorization format', 401));
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch {
        return next(new AppError('Invalid or expired token', 401));
    }
}
