/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-05
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import { envConfig } from '~/config/env.config';
import type { MetaData } from '~/types/response.type';

type WithToJSON = { toJSON: () => Record<string, unknown> };

export const metadataMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const originalJson = res.json.bind(res);

  res.json = (body: unknown): Response => {
    if (body === null || typeof body !== 'object') {
      if (envConfig.nodeEnv !== 'production') {
        console.warn(`[metadataMiddleware] Unexpected non-object body: ${JSON.stringify(body)}`);
      }

      return originalJson(body);
    }

    const metaData: MetaData = {
      requestTime: new Date().toISOString(),
      endpoint: req.originalUrl,
    };

    const serialized =
      'toJSON' in body && typeof (body as WithToJSON).toJSON === 'function'
        ? (body as WithToJSON).toJSON()
        : (body as Record<string, unknown>);

    return originalJson({ ...serialized, metaData });
  };

  next();
};
