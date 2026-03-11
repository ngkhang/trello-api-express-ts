/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type * as z from 'zod';

import type { boardSchema } from '~/modules/boards/board.schema';

export type BoardDocument = z.infer<typeof boardSchema>;
export type UpdateBoardDocument = Partial<
  Omit<BoardDocument, '_id' | 'title' | 'slug' | 'createdAt'>
>;
