import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';

export function errorMiddleware(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
            },
        });
    }

    console.error(error);

    return res.status(500).json({
        error: {
            message: 'Internal server error',
        },
    });
}
