import { User } from '@prisma/client';

/**
 * Public user response model
 * (never exposes sensitive fields like password)
 */
export function toUserResponse(user: User) {
    const { password, ...rest } = user;
    return rest;
}