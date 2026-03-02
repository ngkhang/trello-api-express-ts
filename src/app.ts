/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import type { Application } from 'express';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsConfig } from '~/config/cors.config';
import { envConfig } from '~/config/env.config';

export const createApp = (): Application => {
    const app = express();

    app.use(helmet());
    app.use(corsConfig());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(envConfig.nodeEnv === 'development' ? 'dev' : 'combined'));

    app.get('/health', (_req, res) => {
        res.status(StatusCodes.OK).json({
            status: 'success',
            statusCode: StatusCodes.OK,
            message: 'ok',
            timestamp: new Date().toISOString(),
        });
    });

    return app;
}
