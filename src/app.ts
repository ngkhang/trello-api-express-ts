/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import type { Application } from 'express';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

export const createApp = (): Application => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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
