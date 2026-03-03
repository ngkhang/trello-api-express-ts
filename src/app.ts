/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-03
 ------------------------------------------------- */

import cookieParser from 'cookie-parser';
import type { Application } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsConfig } from '~/config/cors.config';
import { envConfig } from '~/config/env.config';
import { OkResponse } from '~/core/responses/api-success.response';
import { errorEndpoint, errorHandler } from '~/middleware/error-handler.middleware';
import { metadataMiddleware } from '~/middleware/metadata.middleware';

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(corsConfig());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(envConfig.nodeEnv === 'development' ? 'dev' : 'combined'));
  app.use(metadataMiddleware);

  app.get('/health', (_req, res) => {
    const resBody = new OkResponse({ message: 'New res', data: null });
    res.status(resBody.statusCode).json(resBody);
  });

  // Catch not found endpoint handler
  app.use('/{*splat}', errorEndpoint);
  // Global error handler
  app.use(errorHandler);

  return app;
};
