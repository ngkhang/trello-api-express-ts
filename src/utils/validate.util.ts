/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import * as z from 'zod';

export const ZodObjectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { error: 'Your string fails to match the Object ID pattern' });

export const ZodEmptyObject = z.object({}).optional();
