/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import type { BoardDocument, Board } from '~/modules/boards/board.schema';
import { objectToString } from '~/utils/converts.util';

export class BoardMapper {
  public toDomain(document: BoardDocument): Board {
    const { _id, columnOrderIds, ...rest } = document;
    return {
      ...rest,
      id: objectToString(_id),
      columnOrderIds: columnOrderIds.map(objectToString),
    };
  }
}
