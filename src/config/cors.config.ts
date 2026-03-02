/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import cors, { type CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';

import { envConfig } from '~/config/env.config';
import { ForbiddenError } from '~/core/responses/api-error.response';

export const corsConfig = () => {
  const corsOptions: CorsOptions = {
    // Access-Control-Allow-Headers
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    // Access-Control-Allow-Credentials
    credentials: true,
    // Access-Control-Allow-Methods
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // Provides a status code to use for successful OPTIONS requests
    optionsSuccessStatus: StatusCodes.NO_CONTENT,
    // Access-Control-Allow-Origin
    origin(requestOrigin, callback) {
      if (!requestOrigin) {
        if (envConfig.nodeEnv !== 'production') return callback(null, true);

        return callback(new ForbiddenError('Origin is required'));
      }

      const allowedOrigins = envConfig.app.corsOrigin.includes(requestOrigin);
      if (allowedOrigins) return callback(null, true);

      return callback(
        new ForbiddenError(`Origin "${requestOrigin}" is not allowed by CORS policy`),
      );
    },
  };

  return cors(corsOptions);
};
