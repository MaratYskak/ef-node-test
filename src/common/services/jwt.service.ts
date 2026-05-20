import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export class JwtService {
    private readonly secret: string;

    constructor() {
        this.secret = env.JWT_SECRET;
    }

    generateToken(payload: {
        userId: string;
        role: string;
    }) {
        return jwt.sign(payload, this.secret, {
            expiresIn: '7d',
        });
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.secret);
    }
}