import jwt from 'jsonwebtoken';

export class JwtService {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'secret';
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