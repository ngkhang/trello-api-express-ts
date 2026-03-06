/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

export interface Card {
  id: string;
  title: string;
  descriptions: string;
  cover: string;
  avatar: string;
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: string; // Reference to: boards
  columnId: string; // Reference to: columns
}
