/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

export interface Column {
  id: string;
  title: string;
  cardOrderIds: string[];
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: string; // Reference to boards
}
