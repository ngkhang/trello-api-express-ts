/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

import type { ObjectId } from 'mongodb';

export interface BoardDocument {
  _id: ObjectId;
  title: string;
  slug: string;
  descriptions: string;
  columnOrderIds: ObjectId[];
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
}
