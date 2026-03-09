/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';

import { BoardMapper } from '~/modules/boards/board.mapper';
import type { BoardDocument, Board } from '~/modules/boards/board.schema';

// In-memory store
const boards: Map<string, BoardDocument> = new Map([
  [
    '69aa9d31386e1d9687f7b4cb',
    {
      _id: new ObjectId('69aa9d31386e1d9687f7b4cb'),
      title: 'Board 1',
      slug: 'board-1',
      type: '001',
      description: '',
      _destroy: false,
      createdAt: new Date(),
      updatedAt: null,
      columnOrderIds: [],
    },
  ],
]);

export class BoardRepository {
  private readonly boardMapper = new BoardMapper();

  public async findById(id: Board['id']): Promise<Board | null> {
    const boardDoc = boards.get(id);
    return boardDoc ? this.boardMapper.toDomain(boardDoc) : null;
  }
}
