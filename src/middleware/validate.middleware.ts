/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';
import type { ZodObject, ZodError } from 'zod';

import { UnprocessableEntityError } from '~/core/responses/api-error.response';

const formatErrorsDetail = (errors: ZodError): Record<string, string[]> => {
  const details: Record<string, string[]> = {};

  for (const issue of errors.issues) {
    const path = issue.path.join('.');

    if (!details[path]) details[path] = [];
    details[path].push(issue.message);
  }
  return details;
};

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const details = formatErrorsDetail(result.error);

      console.error(details);
      // TODO: Add error details and update error detail types
      throw new UnprocessableEntityError('Validation failed', { code: 'ERR_INVALID' });
    }

    next();
  };
};
