/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import type { MetaData } from '~/types/response.type';

export const metadataMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const originalJson = res.json.bind(res);

  res.json = (body: unknown): Response => {
    if (body === null || typeof body !== 'object') {
      console.warn(`[metadataMiddleware] Unexpected non-object body: ${JSON.stringify(body)}`);

      return originalJson(body);
    }

    const metaData: MetaData = {
      requestTime: new Date().toISOString(),
      endpoint: req.originalUrl,
    };

    return originalJson({ ...body, metaData });
  };

  next();
};
