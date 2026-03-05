/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-05
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import {
  ApiErrorResponse,
  InternalServerError,
  NotFoundError,
} from '~/core/responses/api-error.response';
import { ERROR_CODE } from '~/utils/constants';

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'message' in error) return String(error.message);

  if (typeof error === 'string') return error;

  return 'An error occurred';
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ApiErrorResponse) {
    res.status(error.statusCode).json(error);
    return;
  }

  const errorMessage = getErrorMessage(error);
  const fallback = new InternalServerError(errorMessage, { code: ERROR_CODE.OTHER_CODE });

  res.status(fallback.statusCode).json(fallback);
};

export const errorEndpoint = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    new NotFoundError(`Not found URL`, {
      code: ERROR_CODE.NOT_FOUND,
      details: [
        {
          key: 'endpoint',
          message: `'${req.originalUrl}' is not exist`,
        },
      ],
    }),
  );
};
