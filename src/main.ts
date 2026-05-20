import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';

import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';

import { errorMiddleware } from './common/middleware/error.middleware';

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

app.use('/auth', authRoutes);

app.use('/users', usersRoutes);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
});