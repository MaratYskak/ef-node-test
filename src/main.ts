import { usersService } from './modules/users';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
    });
});

app.post('/auth/register', async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});