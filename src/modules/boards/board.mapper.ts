/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type { BoardDocument } from '~/modules/boards/board.document';
import type { Board } from '~/modules/boards/board.type';
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
  // NOTE: implement toDTO method if needed
  // public toDTO(domain: Board): BoardDTO { }
}
