/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type { RequestHandler } from 'express';

type CustomRequestHandler<Params, Body, Query> = RequestHandler<Params, unknown, Body, Query>;
export const asyncHandler = <P, B, Q>(
  handler: CustomRequestHandler<P, B, Q>,
): CustomRequestHandler<P, B, Q> => {
  return (req, res, next): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
