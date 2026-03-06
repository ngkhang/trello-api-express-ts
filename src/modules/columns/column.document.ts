/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

import type { ObjectId } from 'mongodb';

export interface ColumnDocument {
  _id: ObjectId;
  title: string;
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
  cardOrderIds: ObjectId[];
  boardId: ObjectId;
}
