/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

export interface Board {
  id: string;
  title: string;
  slug: string;
  descriptions: string;
  columnOrderIds: string[];
  _destroy: boolean;
  createdAt: string;
  updatedAt: string;
}
