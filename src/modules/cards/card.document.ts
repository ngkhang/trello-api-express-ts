/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

import type { ObjectId } from 'mongodb';

export interface CardDocument {
  _id: ObjectId;
  title: string;
  descriptions: string;
  cover: string;
  avatar: string;
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: ObjectId;
  columnId: ObjectId;
}
